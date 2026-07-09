<script setup lang="ts">
import GuestLayout from '@/Core/Layouts/GuestLayout.vue'
import BaseInput from '@/Core/Components/Base/BaseInput.vue'
import BaseButton from '@/Core/Components/Base/BaseButton.vue'
import BaseError from '@/Core/Components/Base/BaseError.vue'
import BaseAlert from '@/Core/Components/Base/BaseAlert.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'

interface Props {
    status?: string
}

defineProps<Props>()

const form = useForm({
    email: '',
})

const submit = () => {
    form.post(route('password.email'))
}
</script>

<template>
    <GuestLayout>
        <Head title="Forgot Password" />

        <h1 class="mb-1 text-2xl font-bold">Forgot Password?</h1>
        <p class="mb-4 text-sm text-theme-text-secondary">
            No worries. Enter your email below and we'll send you a link to reset your password.
        </p>

        <BaseAlert v-if="status" class="my-2" type="success">
            {{ status }}
        </BaseAlert>

        <form @submit.prevent="submit">
            <div>
                <BaseInput
                    v-model="form.email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    :invalid="!!form.errors.email"
                    required
                />
                <BaseError v-if="form.errors.email" id="email-error">
                    {{ form.errors.email }}
                </BaseError>
            </div>

            <div class="mt-4 flex flex-col gap-4">
                <BaseButton type="submit" :disabled="form.processing" class="w-full">
                    Send Reset Link
                </BaseButton>
                <Link :href="route('login')" class="text-center text-sm text-theme-text-secondary">
                    Don't want to reset your password?
                    <span class="font-bold underline">Go back to Login</span>
                </Link>
            </div>
        </form>
    </GuestLayout>
</template>
