import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            colors: {
                theme: {
                    bg: {
                        primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
                        secondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
                        tertiary: 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
                    },
                    text: {
                        primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
                        secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
                        tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
                    },
                    border: {
                        primary: 'rgb(var(--color-border-primary) / <alpha-value>)',
                        secondary: 'rgb(var(--color-border-secondary) / <alpha-value>)',
                    },
                    brand: {
                        primary: 'rgb(var(--color-brand-primary) / <alpha-value>)',
                        secondary: 'rgb(var(--color-brand-secondary) / <alpha-value>)',
                    },
                    status: {
                        success: 'rgb(var(--color-success) / <alpha-value>)',
                        danger: 'rgb(var(--color-danger) / <alpha-value>)',
                        warning: 'rgb(var(--color-warning) / <alpha-value>)',
                        info: 'rgb(var(--color-info) / <alpha-value>)',
                    },
                    focus: {
                        primary: 'rgb(var(--color-focus-primary) / <alpha-value>)',
                    },
                },
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
}
