import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
    const isSidebarExpanded = ref<boolean>(localStorage.getItem('sidebar_expanded') === 'true')

    function toggleSidebar(): void {
        isSidebarExpanded.value = !isSidebarExpanded.value
        localStorage.setItem('sidebar_expanded', String(isSidebarExpanded.value))
    }

    const isMobileOpen = ref<boolean>(false)

    function openMobile(): void {
        isMobileOpen.value = true
    }
    function closeMobile(): void {
        isMobileOpen.value = false
    }
    function toggleMobile(): void {
        isMobileOpen.value = !isMobileOpen.value
    }

    return {
        isSidebarExpanded,
        toggleSidebar,
        isMobileOpen,
        openMobile,
        closeMobile,
        toggleMobile,
    }
})
