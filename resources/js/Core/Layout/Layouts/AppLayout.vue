<script setup lang="ts">
import AppHeader from '@/Core/Layout/Components/AppHeader.vue'
import AppSidebar from '@/Core/Layout/Components/AppSidebar.vue'
import BaseSkipToMain from '@/Core/Layout/Components/SkipToMain.vue'
import { useLayoutStore } from '@/Core/Layout/Stores/useLayoutStore'

const layoutStore = useLayoutStore()
</script>

<template>
    <BaseSkipToMain />
    <div class="flex h-screen overflow-hidden bg-theme-bg-secondary">
        <!-- Sidebar / Left column -->
        <AppSidebar />

        <!-- Header & Main / Right column -->
        <div class="flex min-w-0 flex-1 flex-col overflow-hidden" :inert="layoutStore.isMobileOpen">
            <AppHeader />

            <main id="main" tabindex="-1" class="flex-1 overflow-auto p-4">
                <slot />
            </main>
        </div>
    </div>
</template>
