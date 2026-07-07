<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/vue/20/solid'

interface Props {
    type: 'success' | 'danger' | 'info' | 'warning'
}

const { type } = defineProps<Props>()

const baseClasses = 'flex items-center gap-3 rounded-md p-4 outline outline-1'

const iconComponents: Record<string, Component> = {
    success: CheckCircleIcon,
    danger: ExclamationCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
}

const iconColorClasses: Record<string, string> = {
    success: 'text-theme-status-success',
    danger: 'text-theme-status-danger',
    warning: 'text-theme-status-warning',
    info: 'text-theme-status-info',
}

const textColorClasses: Record<string, string> = {
    success: 'text-emerald-800',
    danger: 'text-red-800',
    warning: 'text-amber-800',
    info: 'text-indigo-600',
}

const typeClasses: Record<string, string> = {
    success: 'bg-theme-status-success/10 outline-theme-status-success/20',
    danger: 'bg-theme-status-danger/10 outline-theme-status-danger/20',
    warning: 'bg-theme-status-warning/10 outline-theme-status-warning/20',
    info: 'bg-theme-status-info/10 outline-theme-status-info/20',
}

const alertClasses = computed<string>(() => {
    return [baseClasses, typeClasses[type]].join(' ')
})

const iconClasses = computed<string>(() => iconColorClasses[type])

const textClasses = computed<string>(() => textColorClasses[type])
</script>

<template>
    <div :class="alertClasses" role="alert">
        <component
            :is="iconComponents[type]"
            :class="['h-5 w-5 flex-shrink-0', iconClasses]"
            aria-hidden="true"
        />

        <div :class="['flex-1 text-sm font-medium', textClasses]">
            <slot />
        </div>
    </div>
</template>
