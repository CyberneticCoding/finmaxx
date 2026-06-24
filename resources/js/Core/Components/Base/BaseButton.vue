<script setup lang="ts">
const props = defineProps<{
    variant: 'primary'
}>()

const baseClasses =
    'shadow-xs inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold'

const variantClasses = {
    primary: 'bg-theme-brand-primary text-white hover:bg-theme-brand-secondary',
}
</script>

<template>
    <button :class="[baseClasses, variantClasses[variant]]">
        <slot />
    </button>
</template>
