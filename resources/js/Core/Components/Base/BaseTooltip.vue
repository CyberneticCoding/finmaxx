<script setup lang="ts">
interface Props {
    content: string
    disabled?: boolean
}

const { content, disabled = false } = defineProps<Props>()
</script>

<template>
    <div :class="['group/tooltip relative inline-flex items-center']">
        <slot />
        <span
            v-if="!disabled && content"
            class="pointer-events-none absolute left-full z-50 ml-4 w-auto min-w-max scale-0 rounded-md bg-gray-800 px-2 py-1.5 text-xs font-medium text-white shadow-md transition-transform duration-100 group-hover/tooltip:scale-100 group-focus-visible/tooltip:scale-100"
        >
            {{ content }}
        </span>
    </div>
</template>
