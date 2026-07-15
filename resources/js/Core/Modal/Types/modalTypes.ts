import type { Component } from 'vue'

/**
 * Defines the width of the modal.
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

/**
 * Active: displayed at the top of the stack.
 * Hidden: alive in keep-alive, but not visible. Used for preserving state.
 * Leaving: Functionally closed, but still in the DOM until finalizeClose().
 */
export type ModalPhase = 'active' | 'hidden' | 'leaving'

/**
 * Defines the options for the modal.
 */
export interface ModalOptions {
    size?: ModalSize
    /** When true, clicking the backdrop or pressing Escape closes the modal. Defaults to true. */
    dismissable?: boolean
}

/**
 * Defines the entry for the modal inside the Pinia store.
 */
export interface ModalEntry {
    id: string
    component: Component
    props: Record<string, unknown>
    options: Required<ModalOptions>
    phase: ModalPhase
    /** The function that settles the open() promise when the modal is fully closed. */
    _resolve: (result: unknown) => void
    /** The answer the modal gives back when it closes. */
    result?: unknown
}

/**
 * Defines the result of the open() method.
 */
export interface OpenResult {
    id: string
    /** The promise that resolves with the modal's result when it closes. */
    promise: Promise<unknown>
}
