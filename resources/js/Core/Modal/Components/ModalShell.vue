<script setup lang="ts">
import { computed, inject } from 'vue'
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { MODAL_CONTEXT_KEY, ModalContext } from '../Keys/modalContext'
import { DialogTitle } from '@headlessui/vue'

/* ==============================================================
 *   Props
 * ============================================================== */

interface Props {
    title?: string
    description?: string
    icon?: 'danger' | 'success' | 'info'
    bleed?: boolean // Whether to apply padding to the body
    showClose?: boolean // Whether to show the corner close button
    loading?: boolean
    loadingMessage?: string
}

const {
    title = undefined,
    description = undefined,
    icon = undefined,
    bleed = false,
    showClose = false,
    loading = false,
    loadingMessage = 'Loading...',
} = defineProps<Props>()

/* ==============================================================
 *   Modal Context
 * ============================================================== */

const modal = inject<ModalContext>(MODAL_CONTEXT_KEY)

function close() {
    modal?.close()
}

/* ==============================================================
 *   Icon mapping
 * ============================================================== */

const ICON_MAP = {
    danger: {
        component: ExclamationTriangleIcon,
        class: 'text-theme-status-danger',
        iconBackgroundClass: 'bg-theme-status-danger/10',
    },
    success: {
        component: CheckCircleIcon,
        class: 'text-theme-status-success',
        iconBackgroundClass: 'bg-theme-status-success/10',
    },
    info: {
        component: InformationCircleIcon,
        class: 'text-theme-status-info',
        iconBackgroundClass: 'bg-theme-status-info/10',
    },
}

const iconDefinition = computed(() => (icon ? ICON_MAP[icon] : null))

/* ==============================================================
 *   Slot Detection
 * ============================================================== */

const slots = defineSlots<{
    default(): unknown
    footer?(): unknown
}>()

const hasFooter = computed(() => !!slots.footer)
</script>

<template>
    <div class="overflow-hidden rounded-xl" :class="bleed ? 'relative' : 'flex flex-col'">
        <!-- Header -->
        <div
            v-if="title || icon || showClose"
            class="px-4 pb-4 pt-5 sm:p-6"
            :class="bleed ? 'absolute inset-x-0 top-0 z-10' : ''"
        >
            <div class="sm:flex sm:items-start">
                <!-- Icon -->
                <div
                    v-if="iconDefinition"
                    :class="[
                        'mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10',
                        iconDefinition.iconBackgroundClass,
                    ]"
                >
                    <component
                        :is="iconDefinition.component"
                        class="size-6"
                        :class="iconDefinition.class"
                        aria-hidden="true"
                    />
                </div>

                <div
                    :class="[
                        'mt-3 flex-1 text-center sm:mt-0 sm:text-left',
                        iconDefinition && 'sm:ml-4',
                    ]"
                >
                    <DialogTitle v-if="title" class="text-lg font-semibold text-theme-text-primary">
                        {{ title }}
                    </DialogTitle>
                    <p v-if="description" class="mt-2 text-theme-text-tertiary">
                        {{ description }}
                    </p>
                </div>
                <!-- Corner close button -->
                <button
                    v-if="showClose"
                    type="button"
                    class="focus:ring-theme-primary ml-auto flex-shrink-0 rounded-md p-1 text-theme-text-secondary transition hover:text-theme-brand-primary focus:outline-none focus:ring-2 focus:ring-inset"
                    aria-label="Close"
                    @click="close"
                >
                    <XMarkIcon class="size-5" aria-hidden="true" />
                </button>
            </div>
        </div>

        <!-- Body -->
        <div :class="bleed ? 'relative h-full' : 'relative flex-1'">
            <!-- Content -->
            <div :inert="loading || undefined" :class="{ 'blur-sm': loading }"><slot /></div>

            <!-- Loading overlay -->
            <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="loading"
                    class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-white/80 dark:bg-gray-900/80"
                >
                    <!-- Spinner -->
                    <svg
                        class="h-8 w-8 animate-spin text-indigo-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        />
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>

                    <div class="flex flex-col items-center gap-1 text-sm text-theme-text-secondary">
                        <span>{{ loadingMessage }}</span>
                    </div>

                    <!-- Cancel button, in case of a long load -->
                    <button
                        type="button"
                        class="mt-1 text-sm text-theme-text-secondary underline underline-offset-2 hover:text-theme-brand-primary"
                        @click="close"
                    >
                        Cancel
                    </button>
                </div>
            </Transition>
        </div>

        <!-- Footer only rendered when the #footer slot is provided. Always padded regardless of bleed mode. -->
        <div
            v-if="hasFooter"
            class="flex flex-wrap items-center justify-end gap-2 bg-theme-bg-secondary px-4 py-3 sm:flex-nowrap sm:px-6"
            :inert="loading || undefined"
            :class="{ 'pointer-events-none opacity-50': loading }"
        >
            <slot name="footer" />
        </div>
    </div>
</template>
