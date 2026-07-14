<script setup lang="ts">
/*
For ID, use string 'name_of_input-error' to link to the input field.
*/
interface Props {
    id: string
}

const { id } = defineProps<Props>()
</script>

<template>
    <span
        :id="id"
        class="mt-1 block text-sm font-semibold text-theme-status-danger"
        role="alert"
        aria-live="polite"
    >
        <slot />
    </span>
</template>
