import { defineStore } from 'pinia'
import { markRaw, type Component } from 'vue'
import type { ModalEntry, ModalOptions, OpenResult } from '../Types/modalTypes'

/* ==============================================================
 *              Id Generator
 * ============================================================== */

let _counter = 0
const generateId = (): string => `modal-${++_counter}-${Math.random().toString(36).slice(2, 7)}`

/* ==============================================================
 *              Modal Store
 * ============================================================== */

export const useModalStore = defineStore('modalStore', {
    state: (): { stack: ModalEntry[] } => ({
        stack: [],
    }),

    getters: {
        /**
         * The single active modal in the stack
         */
        visible(state): ModalEntry | null {
            return state.stack.find((e) => e.phase === 'active') ?? null
        },

        /**
         * The topmost modal currently in its exit animation
         */
        leaving(state): ModalEntry | null {
            return state.stack.findLast((e) => e.phase === 'leaving') ?? null
        },
    },

    actions: {
        /**
         * Push a new modal onto the stack.
         *
         * @param component  Any Vue component using markRaw
         * @param props      Props forwarded to the component
         * @param options    Modal options (size, dismissable)
         * @returns          { id, promise }
         */
        open(
            component: Component,
            props: Record<string, unknown> = {},
            options: ModalOptions = {}
        ): OpenResult {
            const id = generateId()

            // Create the promise and extract its resolve function to pass onto the modal, so it can await for a response.
            let _resolve!: (result: unknown) => void
            const promise = new Promise<unknown>((resolve) => {
                _resolve = resolve
            })

            // Mark any currently active modal as hidden
            const current = this.visible
            if (current) current.phase = 'hidden'

            // Create the new modal
            const entry: ModalEntry = {
                id,
                component: markRaw(component as object) as Component,
                props: { ...props },
                options: {
                    size: options.size ?? 'md',
                    dismissable: options.dismissable ?? true,
                },
                phase: 'active',
                _resolve,
            }

            this.stack.push(entry)
            return { id, promise }
        },

        /**
         * Begin closing a modal.
         * Marks the entry as leaving (does not remove it yet; finalizeClose does that after the exit animation).
         * Stores the result so finalizeClose can resolve the open() promise.
         * Promotes the topmost hidden modal to active, if one exists.
         */
        requestClose(id?: string, result?: unknown): void {
            const targetId = id ?? this.visible?.id
            if (!targetId) return

            const entry = this.stack.find((e) => e.id === targetId)
            if (!entry || entry.phase === 'leaving') return

            entry.phase = 'leaving'
            entry.result = result

            const next = this.stack.findLast((e) => e.phase === 'hidden')
            if (next) {
                next.phase = 'active'
            }
        },

        /**
         * Runs after a modal (the ID given) has finished its exit animation.
         * Removes the entry from the stack and resolves the promise.
         */
        finalizeClose(id: string): void {
            const index = this.stack.findIndex((e) => e.id === id)
            if (index === -1) return

            const [entry] = this.stack.splice(index, 1)
            entry._resolve(entry.result)
        },

        /**
         * Clears all initialized modals immediately. Happens on page transitions, as defined in app.ts
         */
        closeAll(): void {
            for (const entry of this.stack) {
                entry._resolve(undefined)
            }
            this.stack = []
        },
    },
})
