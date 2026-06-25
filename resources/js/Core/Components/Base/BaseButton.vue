<script setup lang="ts">
const props = defineProps<{
    variant: 'primary'
    disabled?: boolean
}>()

const baseClasses =
    'shadow-xs inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold disabled:opacity-50 disabled:hover:bg-theme-brand-primary disabled:cursor-not-allowed'

const variantClasses = {
    primary: 'bg-theme-brand-primary text-white hover:bg-theme-brand-secondary',
}
</script>

<template>
    <button :disabled="disabled" :class="[baseClasses, variantClasses[variant]]">
        <slot />
    </button>
</template>
