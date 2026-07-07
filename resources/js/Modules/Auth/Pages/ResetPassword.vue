<script setup lang="ts">
import GuestLayout from '@/Core/Layouts/GuestLayout.vue'
import BaseInput from '@/Core/Components/Base/BaseInput.vue'
import BaseButton from '@/Core/Components/Base/BaseButton.vue'
import BaseError from '@/Core/Components/Base/BaseError.vue'
import { Head, useForm } from '@inertiajs/vue3'

interface Props {
    email: string
    token: string
}

const { email, token } = defineProps<Props>()

const form = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
})

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation')
        },
    })
}
</script>

<template>
    <GuestLayout>
        <Head title="Reset Password" />

        <form @submit.prevent="submit">
            <h1 class="mb-1 text-2xl font-bold">Reset Password</h1>
            <p class="text-sm text-theme-text-secondary">Enter your new password below.</p>
            <BaseError v-if="form.errors.email" id="email-error">
                {{ form.errors.email }}
            </BaseError>

            <div class="mt-4">
                <BaseInput
                    name="password"
                    v-model="form.password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    :invalid="!!form.errors.password"
                    required
                />
                <BaseError v-if="form.errors.password" id="password-error">
                    {{ form.errors.password }}
                </BaseError>
            </div>

            <div class="mt-4">
                <BaseInput
                    name="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    :invalid="!!form.errors.password || !!form.errors.password_confirmation"
                    required
                />
                <BaseError
                    v-if="form.errors.password_confirmation"
                    id="password_confirmation-error"
                >
                    {{ form.errors.password_confirmation }}
                </BaseError>
            </div>

            <div class="mt-4 flex flex-col gap-4">
                <BaseButton type="submit" :disabled="form.processing" class="w-full">
                    Reset Password
                </BaseButton>
            </div>
        </form>
    </GuestLayout>
</template>
