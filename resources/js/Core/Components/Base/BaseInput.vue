<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    type: string
    label: string
    placeholder: string
    required: boolean
    disabled: boolean
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const value = computed({
    get: () => props.modelValue,
    set: (newValue: string) => emit('update:modelValue', newValue),
})
</script>

<template>
    <div>
        <label for="name" class="block text-sm/8 font-medium text-theme-text-primary">{{
            label
        }}</label>
        <input
            :type="type"
            name="name"
            id="id"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
            v-model="value"
            class="block w-full rounded-md border border-theme-border-primary bg-theme-bg-primary px-3 py-2.5 text-sm text-theme-text-primary placeholder:text-theme-text-tertiary focus:outline-2 focus:-outline-offset-2 focus:outline-theme-focus-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-90 sm:text-sm/6"
        />
    </div>
</template>
