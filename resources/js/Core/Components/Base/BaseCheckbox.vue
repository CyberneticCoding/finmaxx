<script setup lang="ts">
const emit = defineEmits(['update:checked'])

interface Props {
    name: string
    value?: any
    disabled?: boolean
    label?: string
}

const { name, value, disabled, label } = defineProps<Props>()

const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
    <label
        :for="name"
        :class="[
            'inline-flex select-none items-center text-sm transition-opacity',
            disabled ? 'cursor-not-allowed opacity-50' : '',
        ]"
    >
        <input
            :id="name"
            :name="name"
            type="checkbox"
            v-model="modelValue"
            :value="value"
            :disabled="disabled"
            class="size-4 rounded border-theme-border-primary bg-theme-bg-surface text-theme-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-theme-brand-primary focus:ring-offset-2 focus:ring-offset-theme-bg-primary disabled:cursor-not-allowed"
        />

        <span
            v-if="label"
            class="ml-2 font-medium text-theme-text-secondary transition-colors hover:text-theme-text-primary"
        >
            {{ label }}
        </span>
    </label>
</template>
