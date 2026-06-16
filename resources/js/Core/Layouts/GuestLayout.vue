<script setup lang="ts">
import ApplicationLogo from '@/Core/Components/ApplicationLogo.vue'
import { Link } from '@inertiajs/vue3'
</script>

<template>
    <div
        class="flex min-h-screen flex-col items-center bg-gray-100 pt-12 sm:pt-24 dark:bg-gray-900"
    >
        <div>
            <Link href="/login">
                <ApplicationLogo class="h-20 w-20 fill-current text-gray-500" />
            </Link>
        </div>

        <div
            class="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-lg sm:max-w-md sm:rounded-3xl dark:bg-gray-800"
        >
            <slot />
        </div>
    </div>
</template>
