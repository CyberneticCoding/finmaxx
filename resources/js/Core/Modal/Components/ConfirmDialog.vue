<script setup lang="ts">
import { ref, inject, onMounted, nextTick } from 'vue'
import ModalShell from './ModalShell.vue'
import { MODAL_CONTEXT_KEY, ModalContext } from '../Keys/modalContext'
import BaseButton from '@/Core/UI/Components/Base/BaseButton.vue'

/* ==============================================================
 *   Props
 * ============================================================== */

interface Props {
    title: string
    description?: string
    icon?: 'danger' | 'success' | 'info'
    buttonVariant?: 'primary' | 'inverse' | 'danger'
    confirmLabel?: string
    cancelLabel?: string
    onConfirm?: () => unknown | Promise<unknown> // Async action to run on confirm. When absent, this dialog will be a popup (one close button)
}

const {
    title,
    description = undefined,
    icon = undefined,
    buttonVariant = 'danger',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm = undefined,
} = defineProps<Props>()

/* ==============================================================
 *   Modal Context
 * ============================================================== */

const modal = inject<ModalContext>(MODAL_CONTEXT_KEY)

function close() {
    if (isConfirming.value) return
    modal?.close()
}

/* ==============================================================
 *   Confirm action
 * ============================================================== */

const isConfirming = ref(false)

async function handleConfirm() {
    if (isConfirming.value || !onConfirm) return

    isConfirming.value = true

    try {
        await onConfirm()
        modal?.close(true)
    } catch {
        // Action failed: confirm dialog stays open
        isConfirming.value = false
    }
}

/* ==============================================================
 *   Initial Focus
 * ============================================================== */

const cancelButton = ref<{ $el: HTMLElement } | null>(null)

onMounted(() => {
    nextTick(() => cancelButton.value?.$el.focus())
})
</script>

<template>
    <ModalShell :title="title" :description="description" :icon="icon">
        <template #footer>
            <!-- Confirm Dialog: two buttons -->
            <template v-if="onConfirm">
                <BaseButton
                    ref="cancelButton"
                    variant="inverse"
                    :disabled="isConfirming"
                    class="w-full sm:w-auto"
                    @click="close"
                >
                    {{ cancelLabel }}
                </BaseButton>

                <BaseButton
                    :variant="buttonVariant"
                    :processing="isConfirming"
                    :disabled="isConfirming"
                    class="w-full sm:w-auto"
                    @click="handleConfirm"
                >
                    {{ confirmLabel }}
                </BaseButton>
            </template>

            <!-- Popup: single close button -->
            <BaseButton
                v-else
                ref="cancelButton"
                variant="inverse"
                class="mx-24 w-auto"
                @click="close"
            >
                {{ cancelLabel }}
            </BaseButton>
        </template>
    </ModalShell>
</template>
