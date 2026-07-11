<script setup lang="ts">
import {
    Menu as HeadlessMenu,
    MenuButton as HeadlessMenuButton,
    MenuItems as HeadlessMenuItems,
} from '@headlessui/vue'

const panelClasses =
    'z-50 min-w-64 rounded-md bg-theme-bg-primary shadow-lg ring-1 ring-theme-border-secondary focus:outline-none'
</script>

<template>
    <HeadlessMenu as="div" class="relative">
        <HeadlessMenuButton as="template">
            <slot name="trigger" />
        </HeadlessMenuButton>

        <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <HeadlessMenuItems :class="panelClasses">
                <slot />
            </HeadlessMenuItems>
        </Transition>
    </HeadlessMenu>
</template>
