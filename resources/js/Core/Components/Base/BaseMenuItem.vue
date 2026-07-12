<script setup lang="ts">
/*
 * Clickable menu item for use inside BaseMenu's default slot.
 */

import { MenuItem as HeadlessMenuItem } from '@headlessui/vue'
import type { Component } from 'vue'

interface Props {
    as?: string | Component
    disabled?: boolean
}

const { as = 'button', disabled = false } = defineProps<Props>()

const itemBase =
    'group flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-theme-text-primary transition-colors duration-100'
const itemActive = 'bg-theme-bg-tertiary'
const itemDisabled = 'cursor-not-allowed opacity-50'
</script>

<template>
    <HeadlessMenuItem
        v-slot="{ active, disabled: isDisabled }"
        :disabled="as === 'button' && disabled"
    >
        <component
            :is="as"
            v-bind="$attrs"
            :disabled="as === 'button' && isDisabled ? true : undefined"
            :class="[itemBase, active ? itemActive : '', isDisabled ? itemDisabled : '']"
        >
            <slot />
        </component>
    </HeadlessMenuItem>
</template>
