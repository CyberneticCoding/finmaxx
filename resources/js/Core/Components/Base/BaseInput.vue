<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    type: string
    label: string
    placeholder: string
    required?: boolean
    disabled?: boolean
    modelValue: string
    invalid?: boolean
    name: string
}

const {
    type = 'text',
    invalid = false,
    label,
    placeholder,
    required,
    disabled,
    modelValue,
    name,
} = defineProps<Props>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const value = computed({
    get: () => modelValue,
    set: (newValue: string) => emit('update:modelValue', newValue),
})
</script>

<template>
    <label :for="name" class="block text-sm/8 font-medium text-theme-text-primary">{{
        label
    }}</label>
    <div class="relative">
        <input
            :id="name"
            v-model="value"
            :type="type"
            :name="name"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
            :aria-invalid="invalid ? 'true' : undefined"
            :class="[
                'block w-full rounded-lg border bg-theme-bg-primary px-3 py-2.5 text-sm text-theme-text-primary transition-colors placeholder:text-theme-text-tertiary disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-90 sm:text-sm/6',
                invalid
                    ? 'border-theme-status-danger pr-10 hover:ring-2 hover:ring-theme-status-danger/30 focus:border-theme-status-danger focus:ring-2 focus:ring-theme-status-danger/30'
                    : 'border-theme-border-primary',
            ]"
        />
        <div
            v-if="invalid"
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            aria-hidden="true"
        >
            <svg
                class="size-5 text-theme-status-danger"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
    </div>
</template>
