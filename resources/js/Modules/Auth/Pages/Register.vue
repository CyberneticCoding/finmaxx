<script setup lang="ts">
import GuestLayout from '@/Core/Layouts/GuestLayout.vue'
import BaseInput from '@/Core/Components/Base/BaseInput.vue'
import BaseButton from '@/Core/Components/Base/BaseButton.vue'
import BaseError from '@/Core/Components/Base/BaseError.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const submit = () => {
    form.post(route('register'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation')
        },
    })
}
</script>

<template>
    <GuestLayout>
        <Head title="Register" />

        <form @submit.prevent="submit">
            <h1 class="mb-1 text-2xl font-bold">Register</h1>

            <div class="flex flex-col gap-1">
                <div>
                    <BaseInput
                        v-model="form.name"
                        name="name"
                        type="text"
                        label="Name"
                        placeholder="Name"
                        :invalid="!!form.errors.name"
                        required
                    />

                    <BaseError v-if="form.errors.name" id="name-error">
                        {{ form.errors.name }}
                    </BaseError>
                </div>

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

                <div>
                    <BaseInput
                        v-model="form.password"
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        :invalid="!!form.errors.password"
                        required
                    />
                </div>

                <div>
                    <BaseInput
                        v-model="form.password_confirmation"
                        name="password_confirmation"
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
            </div>

            <div class="mt-6 flex w-full flex-col gap-4">
                <BaseButton type="submit" :disabled="form.processing" class="w-full">
                    Register an Account
                </BaseButton>

                <Link :href="route('login')" class="text-center text-sm text-theme-text-secondary">
                    Already have an account? <span class="font-bold underline">Login here</span>
                </Link>
            </div>
        </form>
    </GuestLayout>
</template>
