<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import UserMenu from '@/Core/Layout/Components/UserMenu.vue'
import { useLayoutStore } from '@/Core/Layout/Stores/useLayoutStore'

const layoutStore = useLayoutStore()

const hamburgerRef = ref<HTMLButtonElement | null>(null)

watch(
    () => layoutStore.isMobileOpen,
    (open) => {
        if (!open) nextTick(() => hamburgerRef.value?.focus())
    }
)

const headerClasses =
    'flex h-16 flex-shrink-0 items-center gap-4 border-b border-theme-border-secondary bg-theme-bg-primary px-5'

const hamburgerClasses =
    'rounded-md p-1 text-theme-text-secondary transition-colors hover:bg-theme-bg-tertiary hover:text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-focus-primary md:hidden'
</script>

<template>
    <header :class="headerClasses">
        <button
            ref="hamburgerRef"
            aria-label="Open navigation sidebar"
            type="button"
            :class="hamburgerClasses"
            @click="layoutStore.toggleMobile"
        >
            <Bars3Icon class="h-5 w-5 stroke-[1.7]" />
        </button>

        <!-- Global search -->
        <div class="flex flex-1 items-center" />

        <UserMenu />
    </header>
</template>
