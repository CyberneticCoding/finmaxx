<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import AppSidebar from '@/Core/Components/AppSidebar.vue'
import { useLayoutStore } from '@/Core/Stores/useLayoutStore'

const layoutStore = useLayoutStore()

const hamburgerRef = ref<HTMLButtonElement | null>(null)

watch(
    () => layoutStore.isMobileOpen,
    (open) => {
        if (!open) nextTick(() => hamburgerRef.value?.focus())
    }
)
</script>

<template>
    <div class="flex h-screen overflow-hidden bg-theme-bg-secondary">
        <!-- Sidebar / Left column -->
        <AppSidebar />

        <!-- Header & Main / Right column -->
        <div class="flex min-w-0 flex-1 flex-col overflow-hidden" :inert="layoutStore.isMobileOpen">
            <header
                class="flex h-16 flex-shrink-0 items-center gap-4 border-b border-theme-border-secondary bg-theme-bg-primary px-5"
            >
                <button
                    ref="hamburgerRef"
                    aria-label="Open navigation sidebar"
                    type="button"
                    class="rounded-md p-1 text-theme-text-secondary transition-colors hover:bg-theme-bg-tertiary hover:text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-focus-primary md:hidden"
                    @click="layoutStore.toggleMobile"
                >
                    <Bars3Icon class="h-5 w-5 stroke-[1.7]" />
                </button>
            </header>

            <main class="flex-1 overflow-auto p-4">
                <slot />
            </main>
        </div>
    </div>
</template>
