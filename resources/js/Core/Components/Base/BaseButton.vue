<script setup lang="ts">
import { computed } from 'vue'
import { Link as InertiaLink } from '@inertiajs/vue3'
import BaseSpinner from './BaseSpinner.vue'

interface Props {
    variant?: 'primary' | 'inverse'
    disabled?: boolean
    processing?: boolean
    href?: string
}

const {
    variant = 'primary',
    disabled = false,
    processing = false,
    href = '',
} = defineProps<Props>()

const baseClasses =
    'shadow-xs inline-flex w-full items-center gap-2 justify-center rounded-lg px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-theme-focus-primary'

const variantClasses = {
    primary:
        'bg-theme-brand-primary text-white hover:bg-theme-brand-secondary text-sm/6 font-semibold disabled:hover:bg-theme-brand-primary',
    inverse:
        'bg-theme-bg-surface text-theme-text-primary hover:brightness-95 border border-theme-border-primary text-sm/4 font-medium disabled:hover:brightness-100',
}

const componentType = computed(() => {
    if (!href) return 'button'
    return InertiaLink
})

const isInteractionDisabled = computed(() => disabled || processing)
</script>

<template>
    <component
        :is="componentType"
        :href="isInteractionDisabled ? undefined : href"
        :disabled="isInteractionDisabled"
        :aria-busy="processing ? 'true' : undefined"
        :class="[baseClasses, variantClasses[variant]]"
    >
        <template v-if="processing">
            <BaseSpinner class-name="size-4" />
            <span>Loading<span aria-hidden="true">...</span></span>
        </template>
        <template v-else>
            <slot />
        </template>
    </component>
</template>
