<script setup lang="ts">
import { watch, markRaw, type Component } from 'vue'
import { HomeIcon, ArrowDownTrayIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { usePage } from '@inertiajs/vue3'
import { useLayoutStore } from '@/Core/Stores/useLayoutStore'
import BaseNavigationItem from '@/Core/Components/Base/BaseNavigationItem.vue'
import BaseTooltip from '@/Core/Components/Base/BaseTooltip.vue'
import ApplicationLogo from '@/Core/Components/ApplicationLogo.vue'

const layoutStore = useLayoutStore()

interface NavItem {
    label: string
    icon: Component
    routeName: string
    activePattern?: string
}

const navItems: NavItem[] = [
    {
        // Can include a pattern to match the route like: `dashboard.*` to match subpages
        label: 'Dashboard',
        icon: markRaw(HomeIcon),
        routeName: 'dashboard',
    },
]

function isItemActive(item: NavItem): boolean {
    return route().current(item.activePattern || item.routeName)
}

const page = usePage()
// Close mobile sidebar when page changes
watch(
    () => page.url,
    () => layoutStore.closeMobile()
)
</script>

<template>
    <aside
        :class="[
            'transition-width-spring flex flex-col border-r border-theme-border-primary bg-theme-bg-primary',
            'fixed inset-y-0 left-0 z-50 w-full md:relative md:inset-auto md:z-20',
            layoutStore.isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
            layoutStore.isSidebarExpanded ? 'md:w-56' : 'md:w-16',
        ]"
    >
        <!-- Mobile Logo and Close Button -->
        <div class="flex items-center justify-between px-4 py-4 md:hidden">
            <ApplicationLogo aria-hidden="true" class="h-5 w-auto" />
            <button
                type="button"
                aria-label="Close navigation sidebar"
                class="rounded-md p-1 text-theme-text-secondary transition-colors hover:bg-theme-bg-tertiary hover:text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-brand-primary"
                @click="layoutStore.closeMobile"
            >
                <XMarkIcon aria-hidden="true" class="h-5 w-5 stroke-2" />
            </button>
        </div>

        <!-- Desktop logo -->
        <ApplicationLogo aria-hidden="true" class="mt-4 hidden h-5 w-auto px-1 md:block" />

        <!-- Navigation -->
        <nav class="flex h-full w-full flex-col justify-between">
            <div class="flex flex-col gap-2 px-2 pt-4">
                <BaseNavigationItem
                    v-for="item in navItems"
                    :key="item.routeName"
                    :href="route(item.routeName)"
                    :is-active="isItemActive(item)"
                    :icon="item.icon"
                    :label="item.label"
                    :expanded="layoutStore.isSidebarExpanded"
                />
            </div>

            <!-- Toggle Collapse Button -->
            <div class="mb-6 mt-3 hidden flex-col gap-2 px-2 md:flex">
                <BaseTooltip
                    :content="layoutStore.isSidebarExpanded ? 'Collapse' : 'Expand'"
                    :disabled="layoutStore.isSidebarExpanded"
                    class="w-full"
                >
                    <button
                        type="button"
                        class="group flex w-full cursor-pointer items-center justify-start gap-2 rounded-md px-3 py-1.5 transition-colors duration-150 hover:bg-theme-bg-tertiary focus:outline-none focus:ring-2 focus:ring-theme-brand-primary"
                        @click="layoutStore.toggleSidebar"
                    >
                        <ArrowDownTrayIcon
                            :class="[
                                'h-5 w-5 shrink-0 stroke-theme-text-secondary stroke-2 transition-all duration-300 group-hover:stroke-theme-text-primary',
                                layoutStore.isSidebarExpanded ? 'rotate-90' : '-rotate-90',
                            ]"
                        />
                        <span
                            v-if="layoutStore.isSidebarExpanded"
                            class="min-w-0 truncate text-sm font-medium leading-none text-theme-text-secondary group-hover:text-theme-text-primary"
                        >
                            Collapse
                        </span>
                    </button>
                </BaseTooltip>
            </div>
        </nav>
    </aside>
</template>

<style scoped>
.transition-width-spring {
    transition-property: width, transform;
    transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1), cubic-bezier(0.25, 1, 0.5, 1);
    transition-duration: 350ms, 320ms;
}
</style>
