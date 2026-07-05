Standard Operating Protocol (SOP) - Finmaxx

Git Workflow & Local Development
Conventional Commits
All commits must use a prefix indicating the change type. Use the imperative mood (e.g., fix: add validation instead of fixed validation or adds validation).
* feat: A new feature.
* fix: A bug fix.
* docs: Documentation changes.
* style: Formatting, missing semi-colons, etc. (no production code changes).
* refactor: Refactoring production code (e.g., renaming variables).
* test: Adding missing tests, refactoring tests.
* chore: Updating build tasks, package manager configs, etc.


Atomic Commits
* Each commit should represent exactly one logical change.
* Verify the application is in a working state before committing. (Ideally)
* Use git commit --amend --no-edit to incorporate small adjustments into the current commit before starting on a new logical task.


Branching Strategy
* Every change, including minor typos, must occur on a dedicated branch.
* Naming convention must follow a certain structure (e.g., fix/typo-in-header, feat/user-auth).
* Delete the branch after being merged with Main


Github Rules
* The main branch must never accept direct pushes; changes are introduced solely via Pull Requests.
* Enable squash merging in repository settings to combine pull request commits into a single, clean conventional commit on merge.



——————————————————————————————————————————————————————————————————————



Backend Guidelines (Laravel & PHP)
PHP Strict Types
* Every PHP file must declare strict types immediately below the opening tag:
<?php

declare(strict_types=1);
* Publish and edit stub files (php artisan stub:publish) to ensure newly generated controllers, models, requests, and tests include this declaration automatically.


Routing & Web Files
* Avoid cluttering web.php. Place routes belonging to a specific feature or CRUD cycle into dedicated files inside routes/web/.
* Register these files dynamically in routes/web.php:
foreach (glob(__DIR__.'/web/*.php') as $file) {
    Route::group([], $file);
}


Slim Controllers & Architecture
* Controllers should only accept HTTP requests, invoke a Service or Action, and return an Inertia or HTTP response. Only very simple controllers doing 1-5 lines of code are allowed to stay in the controller.
* Encapsulate Business Logic in single-responsibility Action classes to improve testability and readability.
* Use Services to coordinate multiple related Actions (e.g., a UserService that executes both RegisterUserAction and SendWelcomeEmailAction).


Form Request Validation & Sanitization
* Always use dedicated FormRequest classes for input validation (POST, PUT, PATCH, and GET with query filters).
* Use prepareForValidation() to normalize inputs (e.g., trimming whitespace, converting decimal strings to floats) before validation rules run.
* Use passedValidation() to safely merge additional backend parameters (such as the authenticated user's ID) into the validated dataset when needed,
protected function passedValidation(): void
{
    $this->merge([
        'user_id' => $this->user()->id,
    ]);
}


Back-end Localization (Lang Files)
* Do not hardcode user-facing validation or UI strings in PHP classes.
* Publish language files using:
 php artisan lang:publish.
* Use translation keys in requests or controllers:
'amount.max' => __('validation.custom.savings_limit_exceeded')
* Use the :attributes array in validation.php to map database column names to user-friendly terms (e.g., mapping password_confirmation to "confirm password").
* Only use custom messages() arrays within Form Requests when highly specific business context is required.


Model Purity & Resources
* Keep raw data structures in the database (e.g., money in cents, raw datetimes).
* No $appends: Never use $appends on Eloquent models to prevent over-fetching and unintended payloads. We want granular control; always.
* When sending an Eloquent Model to the frontend, use Laravel Resource classes. Use this for structuring the data and sending the right data to the frontend.
* A Resource should use the 'when' function to add conditions on which data to include in the object. For example:
 'last_login_at' => $this->when(
                $request->routeIs('admin.*'), 
                $this->last_login_at?->toIso8601String()
            ),
* Always format the data that is shown on the frontend in the frontend. Only pass raw data from the backend to the frontend..


Secure Environment Configurations
* Never use `env()` directly in application code, as configuration caching will cause it to return null.
* Retrieve environment variables exclusively through config files using the config() helper (e.g., config('services.stripe.key')).


Structured Error Logging
Implement try/catch blocks and log failures for:
* External API interactions.
* Complex multi-step processes.
* Asynchronous processes (ShouldQueue Jobs, Commands, and Listeners).
* File interactions (Storage:: operations).
* Security and authentication flows (Passkeys, 2FA, password resets, unauthorized access attempts).



——————————————————————————————————————————————————————————————————————


Database & Security

Database Migrations
* Use ULID columns as primary keys for user-accessible tables.
* Use standard auto-incrementing integers only for pivot tables, static system lookup lists (e.g., currencies), or internal system logs.
* Avoid setting default values in migrations unless they are booleans or simple counters. Let application logic (Form Requests or Observers, etc…) handle default state.


Deletion & Cascade Rules
* Hard Delete (Leaf Nodes): If a child model cannot exist without its parent, use ->cascadeOnDelete() in the migration.
* Hard Delete (Parent Nodes): For complex models connected via pivot tables, write a model Observer for the deleting event to programmatically delete relationships: 
$user->projects->each->delete();
* Soft Delete (All cases): Do not use cascadeOnDelete in migrations. Handle cascaded soft-deletes manually in model Observers.
* Parent Deletion Safeguards: Wrap parent deletion operations in Database Transactions:
DB::transaction(fn () => $model->delete());


Authorization, Permissions & Policies
* Always check permissions instead of roles, as permissions are more granular and stable.
* Design system authorization to allow a user to hold multiple roles simultaneously.
* Use route middleware as the primary layer of defense to determine route accessibility.
* Use the following rules to determine when to write a Policy:
Use Policy?	Implementation Detail	Implementation Details
Route has a Model wildcard (e.g., /transactions/{transaction})	Yes	Create a TransactionPolicy
Complex frontend rendering decisions (e.g., showing a "Delete" button only if the user owns the model)	Yes	Check the policy in a custom User Resource class and return authorization booleans to the frontend.
Route has a Model wildcard but is read-only (e.g., show, edit)	Yes	Apply the policy directly in route registration: ->middleware('can:view,project')

* Share authorized permissions with the frontend using HandleInertiaRequests and access them via a dedicated composable:
// resources/js/composables/useAuth.ts
import { usePage } from '@inertiajs/vue3';

export function useAuth() {
    const page = usePage();
    
    const hasPermission = (permission: string): boolean => {
        const permissions = page.props.auth?.user?.permissions ?? [];
        return permissions.includes(permission);
    };

    return { hasPermission };
}


Scopes & Concerns
* Use Local Scopes when finding you are writing 2-3 times the same query, or suspect in the future it will be used multiple times.
* Use Concerns/Traits as utilities classes that are general and to be reused throughout the backend.


——————————————————————————————————————————————————————————————————————




Frontend Architecture

Component Structure Rules
* Write scripts first, using the Vue Composition API in TypeScript, followed by the HTML <template>, and lastly any isolated CSS <style> if absolutely necessary.
* Inside script, group individual features together, using a comment horizontal divider to divide them; instead of data first, then methods, then computed.
* Keep components focused on a single responsibility. Page components manage state and coordinate sub-components; sub-components render isolated features.
* Use persistent layouts on all main pages:
import AppLayout from '@/Layouts/AppLayout.vue';
defineOptions({ layout: AppLayout });
* Always Use Inertia's <Link> component for internal navigation to avoid full page reloads.


Component Properties & Events
* Declare props using TypeScript interfaces within defineProps: TypeScript Interface Prop Structure
interface Props {
    type?: string
    label: string
    name?: string
}

const {
    type = 'primary',
    label,
    name = 'No Name': 
} = defineProps<Props>()
* Always use computed properties over watch statements. Use watch only when triggering side-effects like external API requests or updating localStorage.
* Never use array indexes as keys in v-for loops. Always bind unique database identifiers (:key="item.ulid" or :key="item.id").


Reusable Base Components & Composables
* Build highly reusable components for input fields, buttons, badges, and modals.
* For visual variants of the same components: use base and variant classes:
const baseClasses = 'shadow-xs inline-flex w-full items-center gap-2 justify-center rounded-lg px-3 py-2...'

const variantClasses = {
    primary: 'bg-theme-brand-primary text-white hover:bg-theme-brand-secondary ...',
    inverse: 'bg-theme-bg-surface text-theme-text-primary ...',
}

// Use in template:
:class="[baseClasses, variantClasses[variant]]"

* For formatting the raw data received by the backend, use dedicated (often reusable) composables.

Fetching using Inertia
* Small/Static Data: Load together with the page, non-lazy props.
* Medium/Domain Data: Use Inertia Deferred Props (Inertia::defer) to load the data asynchronously in the background immediately after the page renders.
* Massive/Dynamic Data (e.g., Global Searches): Load the data when the user needs it. (e.g., Dropdown mennus). Use $inertia.get({ only: [...] }) paired with an explicit loading spinner state in Vue.
* Thus: use Partial Reloads for live searching & filtering, load more feeds, table sort, frequently changing metrics, and pagination. In the backend these need to be returned as Lazy Loaded closures:
'items' => fn () => Item::paginate(15) 


State Management (Pinia vs Inertia)
* Use Inertia's HandleInertiaRequest props to handle backend/database state.
* Use Pinia exclusively to manage frontend/UI state.
* Use Pinia to store if the UI state meets any of these conditions:i	Multiple unrelated components need to read or update the state.ii	The state needs to persist when the component that displays it is unmounted or destroyed.iii	The mutation logic is complex enough that it clutters the Vue template file.



——————————————————————————————————————————————————————————————————————



UI & Accessibility (WCAG 2.1 AA Guidelines)

Visual Accessibility
* Implement a "Skip to main content" link at the very top of each layout page for keyboard navigators.
* All interactive components must feature a visible focus state with the ring classes: focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-theme-focus-primary


Form Validation & Handling
* If a form submission fails validation, programmatically move keyboard focus to the first invalid field via a global router.on('error') check.
* Always Annotate error fields with aria-invalid="true" to make this error focussing work.


Modals & Dialog Focus
* Modals must trap keyboard/scroll focus when open.
* Provide a clear close control (X button) and a "Cancel" button.
* Set initial keyboard focus on the close/X button, followed by the primary action, and lastly the secondary cancel buttons.


Toast Notifications
* Wrap toast containers in aria-live="polite" or role="status"
* Use toasts for normal confirmations. Save dialog windows and blockades only for highly destructive, irreversible actions.


Tailwind Design Tokens & Themes
* For colors, always use the semantic tokens inside tailwind.config.js, which point to CSS variables (app.css)
* For fonts, use performance-optimized .woff2 font formats to avoid layout shifts.
* Never use arbitrary values like w-[200px].
* Almost never write custom CSS. But if you do, use both selectors:
.dark .custom-class,[data-theme="dark"] .custom-class {    background: ...}



——————————————————————————————————————————————————————————————————————



Caching & Performance

Cache Strategy
* Use Redis Cache to cache computationally intensive data (e.g., complex ledger calculations)., and invalidate the cache when one or more parts of the data needed for the calculation changes. Do this in Observers (e.g., CRUD actions like on created, updated, deleted. You can then:
// In an Observer
private function clearUserCache(Transaction $transaction): void
{
    $userId = $transaction->purse->user_id;
    Cache::forget("user_{$userId}_net_worth");

//This code returns the saved value from the cache, and if it doesn't exist, it uses the calculate function to do the expensive calculation.
}
Use the remember paradigm to retrieve data smoothly:
return Cache::remember("user_{$user->id}_net_worth", now()->addHours(24), function () use ($user) {
    return $user->calculateNetWorthFromDatabase();
});



——————————————————————————————————————————————————————————————————————



Quality Assurance (Linting & Testing)

Testing Principles
* Include the use RefreshDatabase; trait in any automated test interacting with database engines.
* Always construct testing payloads using Model Factories instead of hardcoded raw arrays.
* Prevent side-effects during testing runs by faking external services (Http::fake(), Mail::fake()).
* When writing tests for custom Exception blocks, assert that system logs recorded the failure correctly.
* Write Feature tests for critical user workflows (registration, onboarding, checkout processes).
* Write isolated Unit tests for calculations, mathematical helpers, and self-contained classes. Do not perform HTTP requests within Unit tests.
* Write tests before implementing new code logic to prevent over-engineering.
* If a bug is found after the feature is tested and shipped, write a test with the exact replication flow, to ensure the bug is fixed.


Linting & Code Standards
* Format backend code using Laravel Pint with the laravel preset.
* Format frontend code using ESLint with the typscript and vuejs-accessibility plugins.
* Format frontend code using Prettier for consistency.

