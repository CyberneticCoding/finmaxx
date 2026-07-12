<script setup lang="ts">
import {
    Menu as HeadlessMenu,
    MenuButton as HeadlessMenuButton,
    MenuItems as HeadlessMenuItems,
} from '@headlessui/vue'

interface Props {
    anchor?: MenuAnchor
}

type MenuAnchor =
    | 'bottom end'
    | 'bottom start'
    | 'bottom'
    | 'top end'
    | 'top start'
    | 'top'
    | 'left'
    | 'right'

const { anchor = 'bottom end' } = defineProps<Props>()

const anchorClasses: Record<MenuAnchor, string> = {
    'bottom end': 'absolute right-0 top-full mt-2',
    'bottom start': 'absolute left-0 top-full mt-2',
    bottom: 'absolute left-1/2 -translate-x-1/2 top-full mt-2',
    'top end': 'absolute right-0 bottom-full mb-2',
    'top start': 'absolute left-0 bottom-full mb-2',
    top: 'absolute left-1/2 -translate-x-1/2 bottom-full mb-2',
    left: 'absolute right-full top-0 mr-2',
    right: 'absolute left-full top-0 ml-2',
}

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
            <HeadlessMenuItems :class="[panelClasses, anchorClasses[anchor]]">
                <slot />
            </HeadlessMenuItems>
        </Transition>
    </HeadlessMenu>
</template>
