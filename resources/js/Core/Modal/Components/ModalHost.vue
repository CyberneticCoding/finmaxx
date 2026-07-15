<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { useModalStore } from '../Stores/useModalStore'
import { computed, KeepAlive, provide } from 'vue'
import type { ModalSize } from '../Types/modalTypes'
import { MODAL_CONTEXT_KEY, ModalContext } from '../Keys/modalContext'

const store = useModalStore()

/* ==============================================================
 *   Styling Classes
 * ============================================================== */

const SIZE_CLASSES: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full',
}

const panelSizeClass = computed(() =>
    displayedModal.value ? SIZE_CLASSES[displayedModal.value.options.size] : SIZE_CLASSES.md
)

/* ==============================================================
 *   Display Properties
 * ============================================================== */

const displayedModal = computed(() => store.visible ?? store.leaving)

/**
 * Determines if there is any modal at all currently in the stack.
 * Used for keeping animations running until all modals are fully closed
 */
const isDialogOpen = computed(() => store.visible !== null)

/* Determines which modals (active and hidden) should be kept alive in the KeepAlive component */
const keepAliveInclude = computed<string[]>(() =>
    store.stack.filter((e) => e.phase === 'active' || e.phase === 'hidden').map((e) => e.id)
)

/* ==============================================================
 *   Event Handlers / Closing Logic
 * ============================================================== */

/* Handles the closing */
const handleAttemptClose = () => {
    console.log('handleAttemptClose')
    const modal = displayedModal.value
    if (!modal || !modal.options.dismissable) return
    store.requestClose(modal.id)
}

/* Handles cleanup after the closing animation completes */
const handleAfterLeave = () => {
    const modal = store.leaving
    if (modal) store.finalizeClose(modal.id)
}

/* ==============================================================
 *   Provide Close Method
 * ============================================================== */

provide(MODAL_CONTEXT_KEY, {
    close(result?: unknown) {
        const id = displayedModal.value?.id
        if (id) store.requestClose(id, result)
    },
} satisfies ModalContext)
</script>

<template>
    <TransitionRoot :show="isDialogOpen" appear as="template" @after-leave="handleAfterLeave">
        <Dialog as="div" class="relative z-50" @close="handleAttemptClose">
            <!-- Dark overlay -->
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-out"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div aria-hidden="true" class="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4">
                    <!-- Panel -->
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            :class="[
                                'w-full rounded-xl bg-theme-bg-primary shadow-xl transition-all',
                                panelSizeClass,
                            ]"
                        >
                            <Transition mode="out-in" name="modal-content">
                                <KeepAlive :include="keepAliveInclude">
                                    <component
                                        :is="displayedModal?.component"
                                        v-if="displayedModal"
                                        :key="displayedModal.id"
                                        v-bind="displayedModal.props"
                                    />
                                </KeepAlive>
                            </Transition>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<style scoped>
.modal-content-enter-active,
.modal-content-leave-active {
    transition:
        opacity 0.15s ease,
        transform 0.15s ease;
}

.modal-content-enter-from {
    opacity: 0;
    transform: translateY(6px);
}

.modal-content-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
