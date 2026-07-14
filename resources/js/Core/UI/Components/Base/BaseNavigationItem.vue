<script setup lang="ts">
import { computed, type Component } from 'vue'
import { Link } from '@inertiajs/vue3'
import BaseTooltip from '@/Core/UI/Components/Base/BaseTooltip.vue'

interface Props {
    href: string
    isActive?: boolean
    icon: Component
    label: string
    expanded?: boolean
}

const { href, isActive = false, expanded = false, label, icon } = defineProps<Props>()

const baseRowClasses =
    'group relative flex w-full cursor-pointer items-center justify-start gap-2 rounded-md px-3 py-1.5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-theme-focus-primary'
const rowActive =
    'bg-theme-brand-primary hover:bg-theme-brand-primary-hover focus-theme-control-offset focus:ring-offset-2'
const rowInactive = 'hover:bg-theme-bg-tertiary focus-theme-control'

const baseIconClasses = 'h-5 w-5 shrink-0 stroke-2 transition-all duration-200'
const iconActive = 'stroke-white'
const iconInactive = 'stroke-theme-text-secondary group-hover:stroke-theme-text-primary'

const baseLabelClasses = 'min-w-0 truncate text-sm font-medium leading-none'
const labelActive = 'text-white'
const labelInactive = 'text-theme-text-secondary group-hover:text-theme-text-primary'

const rowClasses = computed(() => [baseRowClasses, isActive ? rowActive : rowInactive])
const iconClasses = computed(() => [baseIconClasses, isActive ? iconActive : iconInactive])
const labelClasses = computed(() => [baseLabelClasses, isActive ? labelActive : labelInactive])
</script>

<template>
    <Link :href="href" :class="rowClasses">
        <BaseTooltip :disabled="expanded" :content="label">
            <component :is="icon" aria-hidden="true" :class="iconClasses" />
        </BaseTooltip>
        <span v-if="expanded" :class="labelClasses">
            {{ label }}
        </span>
    </Link>
</template>
