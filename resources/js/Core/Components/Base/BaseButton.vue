<script setup lang="ts">
import { computed } from 'vue'
import BaseSpinner from './BaseSpinner.vue'

interface Props {
    variant: 'primary' | 'inverse'
    disabled?: boolean
    processing?: boolean
}

const { variant = 'primary', disabled = false, processing = false } = defineProps<Props>()

const baseClasses =
    'shadow-xs inline-flex w-full items-center gap-2 justify-center rounded-md px-3 py-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses = {
    primary:
        'bg-theme-brand-primary text-white hover:bg-theme-brand-secondary disabled:hover:bg-theme-brand-primary',
    inverse:
        'bg-theme-bg-surface text-theme-brand-primary hover:brightness-95 border border-theme-border-primary disabled:hover:brightness-100',
}

const isInteractionDisabled = computed(() => disabled || processing)
</script>

<template>
    <button
        :disabled="isInteractionDisabled"
        :aria-busy="processing ? 'true' : undefined"
        :class="[baseClasses, variantClasses[variant]]"
    >
        <template v-if="processing">
            <BaseSpinner className="size-4" />
            <span>Loading<span aria-hidden="true">...</span></span>
        </template>
        <template v-else>
            <slot />
        </template>
    </button>
</template>
