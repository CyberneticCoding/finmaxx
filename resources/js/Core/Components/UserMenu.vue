<script setup lang="ts">
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import BaseMenu from '@/Core/Components/Base/BaseMenu.vue'
import BaseMenuItem from '@/Core/Components/Base/BaseMenuItem.vue'

interface AuthUser {
    name: string
    email: string
}

const page = usePage()
const user = computed<AuthUser>(() => (page.props.auth as { user: AuthUser }).user)

const userInitials = computed<string>(() =>
    user.value.name
        .split(' ')
        .slice(0, 2)
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
)

const triggerClasses =
    'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-theme-text-primary transition hover:bg-theme-bg-tertiary focus:outline-none focus:ring-2 focus:ring-theme-focus-primary'
const avatarClasses =
    'flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-theme-bg-tertiary text-xs font-semibold text-theme-text-secondary'
const panelHeaderClasses = 'border-b border-theme-border-secondary px-4 py-2'
const panelFooterClasses = 'border-t border-theme-border-secondary'
</script>

<template>
    <BaseMenu>
        <template #trigger>
            <button type="button" :class="triggerClasses">
                <div :class="avatarClasses">{{ userInitials }}</div>
                <span class="hidden sm:block">{{ user.name }}</span>
                <ChevronDownIcon class="size-4 text-theme-text-tertiary" />
            </button>
        </template>

        <div :class="panelHeaderClasses">
            <p class="text-xs text-theme-text-tertiary">Signed in as</p>
            <p class="truncate text-sm font-medium text-theme-text-primary">
                {{ user.email }}
            </p>
        </div>

        <BaseMenuItem :as="Link" :href="route('profile.edit')">Profile</BaseMenuItem>

        <div :class="panelFooterClasses">
            <BaseMenuItem :as="Link" :href="route('logout')" method="post"> Log Out </BaseMenuItem>
        </div>
    </BaseMenu>
</template>
