<script setup lang="ts">
const props = defineProps<{
    type: string
    label: string
    placeholder: string
    required: boolean
    disabled: boolean
    value: string
}>()
</script>

<template>
    <div>
        <label for="name" class="block text-sm/6 font-medium text-gray-900 dark:text-white">{{
            label
        }}</label>
        <div class="mt-1">
            <input
                type="type"
                name="name"
                id="id"
                :value="value"
                :placeholder="placeholder"
                :disabled="disabled"
                :required="required"
                class="block w-full rounded-md border border-theme-border-primary bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 disabled:opacity-60 disabled:outline-gray-200 sm:text-sm/6"
            />
        </div>
    </div>
</template>
