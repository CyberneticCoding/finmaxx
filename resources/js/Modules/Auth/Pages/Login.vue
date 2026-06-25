<script setup lang="ts">
import Checkbox from '@/Core/Components/Checkbox.vue'
import GuestLayout from '@/Core/Layouts/GuestLayout.vue'
import InputError from '@/Core/Components/InputError.vue'
import InputLabel from '@/Core/Components/InputLabel.vue'
import TextInput from '@/Core/Components/TextInput.vue'
import BaseInput from '@/Core/Components/Base/BaseInput.vue'
import BaseButton from '@/Core/Components/Base/BaseButton.vue'
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
            <h1 class="mb-1 text-2xl font-bold">Login</h1>

            <div class="flex flex-col gap-1">
                <BaseInput 
                    v-model="form.email"
                    type="email"
                    label="Email"
                    placeholder="Email address"
                    :required="true"
                />

                <BaseInput 
                    v-model="form.password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    :required="true"
                />

                <!-- <InputLabel for="email" value="Email" />
                <TextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.email" /> -->
            </div>
            <div class="mt-4 flex flex-col gap-4">
                <BaseButton variant="primary" type="submit" :processing="form.processing">
                    Login to Finmaxx
                </BaseButton>

                <label class="flex items-center">
                    <Checkbox v-model:checked="form.remember" name="remember" />
                    <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">
                        Keep me signed in
                    </span>
                </label>

                <hr aria-hidden="true" class="relative border-theme-border-secondary text-center"></hr>
            </div>

            <div class="mt-4 flex flex-col gap-2">
                <BaseButton :href="route('password.request')" variant="inverse">
                    Forgot your password?
                </BaseButton>

                <BaseButton :href="route('register')" variant="inverse">
                    No account? Register here
                </BaseButton>
            </div>

            <!-- <div class="mt-4">
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
            </div> -->




            <!-- TODO add separator when passkey integration is implemented
            <div class="relative my-2 h-4 border-b border-theme-border-primary text-center">
                <span class="relative bg-theme-bg-primary px-5 text-xs"> or </span>
            </div> -->


            <div class="mt-4 flex items-center justify-end"></div>
        </form>
    </GuestLayout>
</template>
