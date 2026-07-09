<script setup lang="ts">
import { markRaw, type Component } from 'vue'
import { HomeIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
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
</script>

<template>
    <aside
        :class="[
            'transition-width-spring z-20 flex flex-col border-r border-theme-border-primary bg-theme-bg-primary',
            layoutStore.isSidebarExpanded ? 'w-[232px]' : 'w-[60px]',
        ]"
    >
        <ApplicationLogo class="mt-4 h-5 w-auto px-1" />

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
            <div class="mb-6 mt-3 flex flex-col gap-2 px-2">
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
                                'h-5 w-5 shrink-0 stroke-theme-text-secondary stroke-[1.7] transition-all duration-300 group-hover:stroke-theme-text-primary',
                                layoutStore.isSidebarExpanded ? 'rotate-90' : '-rotate-90',
                            ]"
                        />
                        <span
                            v-if="layoutStore.isSidebarExpanded"
                            class="min-w-0 truncate text-[15px] font-medium leading-none text-theme-text-secondary group-hover:text-theme-text-primary"
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
    transition-property: width;
    transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
    transition-duration: 350ms;
}
</style>
