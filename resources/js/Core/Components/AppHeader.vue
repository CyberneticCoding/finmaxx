<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { Bars3Icon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { Link, usePage } from '@inertiajs/vue3'
import Dropdown from '@/Core/Components/Dropdown.vue'
import DropdownLink from '@/Core/Components/DropdownLink.vue'
import { useLayoutStore } from '@/Core/Stores/useLayoutStore'

interface AuthUser {
    name: string
    email: string
}
const page = usePage()
const user = computed<AuthUser | null>(() => (page.props.auth as any)?.user ?? null)

const userInitials = computed<string>(() => {
    return (user.value?.name ?? '')
        .split(' ')
        .slice(0, 2)
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
})

const layoutStore = useLayoutStore()

const hamburgerRef = ref<HTMLButtonElement | null>(null)

watch(
    () => layoutStore.isMobileOpen,
    (open) => {
        if (!open) nextTick(() => hamburgerRef.value?.focus())
    }
)

const headerClasses =
    'flex h-16 flex-shrink-0 items-center gap-4 border-b border-theme-border-secondary bg-theme-bg-primary px-5'

const hamburgerClasses =
    'rounded-md p-1 text-theme-text-secondary transition-colors hover:bg-theme-bg-tertiary hover:text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-focus-primary md:hidden'

const userTriggerClasses =
    'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-theme-text-primary transition hover:bg-theme-bg-tertiary focus:outline-none focus:ring-2 focus:ring-theme-focus-primary'

const avatarClasses =
    'flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-theme-bg-tertiary text-xs font-semibold text-theme-text-secondary'

const dropdownHeaderClasses = 'border-b border-theme-border-secondary px-4 py-2'

const dropdownFooterClasses = 'border-t border-theme-border-secondary'

const logoutClasses =
    'block w-full px-4 py-2 text-start text-sm leading-5 text-theme-text-primary transition duration-150 ease-in-out hover:bg-theme-bg-tertiary focus:bg-theme-bg-tertiary focus:outline-none'
</script>

<template>
    <header :class="headerClasses">
        <button
            ref="hamburgerRef"
            aria-label="Open navigation sidebar"
            type="button"
            :class="hamburgerClasses"
            @click="layoutStore.toggleMobile"
        >
            <Bars3Icon class="h-5 w-5 stroke-[1.7]" />
        </button>

        <!-- Global search -->
        <div class="flex flex-1 items-center" />

        <Dropdown align="right" content-classes="py-1 bg-theme-bg-primary">
            <template #trigger>
                <button type="button" :class="userTriggerClasses">
                    <div :class="avatarClasses">
                        {{ userInitials || '?' }}
                    </div>
                    <span class="hidden sm:block">{{ user?.name ?? 'Account' }}</span>
                    <ChevronDownIcon class="size-4 text-theme-text-tertiary" />
                </button>
            </template>

            <template #content>
                <div :class="dropdownHeaderClasses">
                    <p class="text-xs text-theme-text-tertiary">Signed in as</p>
                    <p class="truncate text-sm font-medium text-theme-text-primary">
                        {{ user?.email ?? '' }}
                    </p>
                </div>
                <DropdownLink :href="route('profile.edit')">Profile</DropdownLink>
                <div :class="dropdownFooterClasses">
                    <Link :href="route('logout')" method="post" as="button" :class="logoutClasses">
                        Log Out
                    </Link>
                </div>
            </template>
        </Dropdown>
    </header>
</template>
