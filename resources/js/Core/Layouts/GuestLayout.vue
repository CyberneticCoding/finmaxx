<script setup lang="ts">
import ApplicationLogo from '@/Core/Components/ApplicationLogo.vue'
import { Link } from '@inertiajs/vue3'
</script>

<template>
    <div class="flex min-h-screen flex-col items-center bg-theme-bg-tertiary pt-12 sm:pt-24">
        <div>
            <Link href="/login">
                <ApplicationLogo class="size-6 fill-current" />
            </Link>
        </div>

        <div
            class="mt-8 w-full overflow-hidden border-y border-theme-border-secondary bg-theme-bg-primary p-6 pb-10 shadow-lg sm:max-w-md sm:rounded-3xl sm:border"
        >
            <slot />
        </div>
    </div>
</template>
