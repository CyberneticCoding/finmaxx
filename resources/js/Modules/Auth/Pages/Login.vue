<script setup lang="ts">
import Checkbox from '@/Core/Components/Checkbox.vue'
import GuestLayout from '@/Core/Layouts/GuestLayout.vue'
import InputError from '@/Core/Components/InputError.vue'
import InputLabel from '@/Core/Components/InputLabel.vue'
import PrimaryButton from '@/Core/Components/PrimaryButton.vue'
import TextInput from '@/Core/Components/TextInput.vue'
import { Head, useForm } from '@inertiajs/vue3'

defineProps<{
    canResetPassword?: boolean
    status?: string
}>()

const form = useForm({
    email: '',
    password: '',
    remember: false,
})

const submit = () => {
    form.post(route('login'), {
        onFinish: () => {
            form.reset('password')
        },
    })
}
</script>

<template>
    <GuestLayout>
        <Head title="Log in" />

        <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <h1 class="mb-4 text-2xl font-bold">Login</h1>

            <div>
                <InputLabel for="email" value="Email" />
                <TextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="current-password"
                />

                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <PrimaryButton
                class="mt-4 w-full py-3"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                Login to Finmaxx
            </PrimaryButton>

            <!-- TODO add separator when passkey integration is implemented
            <div class="relative my-2 h-4 border-b border-theme-border-primary text-center">
                <span class="relative bg-theme-bg-primary px-5 text-xs"> or </span>
            </div> -->

            <div class="mt-4 block">
                <label class="flex items-center">
                    <Checkbox v-model:checked="form.remember" name="remember" />
                    <span class="ms-2 text-sm text-gray-600 dark:text-gray-400"
                        >Keep me signed in</span
                    >
                </label>
            </div>

            <hr aria-hidden="true" class="relative mt-6 text-theme-border-primary text-center"></hr>

            <PrimaryButton
                v-if="canResetPassword"
                :href="route('password.request')"
                class="mt-4 w-full py-3"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                Forgot your password?
            </PrimaryButton>

            <PrimaryButton
                :href="route('register')"
                class="mt-4 w-full py-3"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                No account? Register here
            </PrimaryButton>

            <div class="mt-4 flex items-center justify-end"></div>
        </form>
    </GuestLayout>
</template>
