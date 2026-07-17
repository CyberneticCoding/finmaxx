import { markRaw, type App } from 'vue'
import { useModalStore } from '../Stores/useModalStore'
import ConfirmDialog from '../Components/ConfirmDialog.vue'
import type { ConfirmOptions, PopupOptions, ModalOptions } from '../Types/modalTypes'
import type { Component } from 'vue'

/*
 *  Opens any component as a modal
 */
export function openModal(
    component: Component,
    props: Record<string, unknown> = {},
    options: ModalOptions = {}
) {
    return useModalStore().open(component, props, options)
}

/*
 * Opens a ConfirmDialog and returns a promise that resolves with true when confirmed
 */
export function confirm(options: ConfirmOptions): Promise<unknown> {
    const { size = 'md', ...props } = options

    const { promise } = openModal(markRaw(ConfirmDialog), props as Record<string, unknown>, {
        size,
        dismissable: false,
    })

    return promise
}

/*
 * Opens a ConfirmDialog with a single close button, no actions. Resolves true when the user closes the dialog
 */
export function popup(options: PopupOptions): Promise<unknown> {
    const { size = 'sm', closeLabel, ...rest } = options

    const { promise } = openModal(
        markRaw(ConfirmDialog),
        { ...rest, cancelLabel: closeLabel ?? 'Close' } as Record<string, unknown>,
        { size, dismissable: true }
    )

    return promise
}
