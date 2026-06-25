import '../css/app.css'
import './bootstrap'

import { createInertiaApp, router } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createApp, DefineComponent, h, nextTick } from 'vue'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

// Focus on the first invalid input when an error occurs, on every request.
router.on('error', () => {
    nextTick(() => {
        const firstErrorInput = document.querySelector(
            '[aria-invalid="true"]'
        ) as HTMLElement | null

        if (firstErrorInput) {
            firstErrorInput.focus()
            firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    })
})

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name: string) => {
        const pages = import.meta.glob<DefineComponent>([
            './Core/Pages/**/*.vue',
            './Modules/*/Pages/**/*.vue',
        ])

        return resolvePageComponent(`./${name}.vue`, pages)
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el)
    },
    progress: {
        color: '#4B5563',
    },
})
