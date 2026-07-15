import type { InjectionKey } from 'vue'

export interface ModalContext {
    close: (result?: unknown) => void
}

export const MODAL_CONTEXT_KEY: InjectionKey<ModalContext> = Symbol('modalContext')
