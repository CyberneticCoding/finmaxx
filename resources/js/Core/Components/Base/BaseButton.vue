<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    variant: 'primary'
    disabled?: boolean
    processing?: boolean
}>()

const baseClasses =
    'shadow-xs inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold disabled:opacity-50 disabled:hover:bg-theme-brand-primary disabled:cursor-not-allowed'

const variantClasses = {
    primary: 'bg-theme-brand-primary text-white hover:bg-theme-brand-secondary',
}

const isInteractionDisabled = computed(() => props.disabled || props.processing)
</script>

<template>
    <button :disabled="isInteractionDisabled" :class="[baseClasses, variantClasses[variant]]">
        <slot />
    </button>
</template>
