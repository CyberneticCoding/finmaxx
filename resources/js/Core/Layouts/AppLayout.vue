<script setup lang="ts">
import AppSidebar from '@/Core/Components/AppSidebar.vue'
</script>

<template>
    <div class="flex h-screen overflow-hidden bg-theme-bg-secondary">
        <!-- Sidebar / Left column -->
        <AppSidebar />

        <!-- Header & Main / Right column -->
        <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
            <!-- Top header -->
            <header
                class="flex h-16 flex-shrink-0 items-center gap-4 border-b border-theme-border-secondary bg-theme-bg-primary px-5"
            ></header>

            <!-- Main content -->
            <main class="flex-1 overflow-auto p-4">
                <slot />
            </main>
        </div>
    </div>
</template>
