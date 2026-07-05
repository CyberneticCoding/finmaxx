import pluginVue from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from 'eslint-config-prettier'

export default defineConfigWithVueTs(
    {
        ignores: [
            '**/vendor/**',
            '**/node_modules/**',
            '**/public/build/**',
            '**/bootstrap/cache/**',
            '**/storage/**',
        ],
    },
    pluginVue.configs['flat/recommended'],
    vueTsConfigs.recommended,
    ...pluginVueA11y.configs['flat/recommended'],
    {
        rules: {
            'vue/multi-word-component-names': 'off',
            'vuejs-accessibility/no-autofocus': 'warn',
            'vue/block-order': [
                'error',
                {
                    order: ['script', 'template', 'style'],
                },
            ],
            'vuejs-accessibility/label-has-for': [
                'error',
                {
                    components: ['Label'],
                    required: {
                        some: ['nesting', 'id'],
                    },
                    allowChildren: false,
                },
            ],
        },
    },
    skipFormatting
)
