<script setup lang="ts">
import ApplicationLogo from '@/Core/Components/ApplicationLogo.vue'
</script>

<template>
    <div class="flex min-h-screen flex-col items-center bg-theme-bg-tertiary">
        <div
            class="flex h-12 w-full items-center justify-center bg-theme-brand-primary sm:mb-8 sm:mt-16 sm:h-0 sm:bg-transparent"
        >
            <ApplicationLogo
                class="h-4 text-white transition-all sm:h-8 sm:text-theme-text-primary"
            />
        </div>

        <div
            class="mt-4 w-full overflow-hidden border-y border-theme-border-secondary bg-theme-bg-primary p-6 pb-10 shadow-lg sm:max-w-md sm:rounded-3xl sm:border sm:p-8 sm:pb-12"
        >
            <slot />
        </div>
    </div>
</template>
