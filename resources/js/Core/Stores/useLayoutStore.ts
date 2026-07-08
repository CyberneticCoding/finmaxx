import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
    const isSidebarExpanded = ref<boolean>(localStorage.getItem('sidebar_expanded') === 'true')

    function toggleSidebar(): void {
        isSidebarExpanded.value = !isSidebarExpanded.value
        localStorage.setItem('sidebar_expanded', String(isSidebarExpanded.value))
    }

    return {
        isSidebarExpanded,
        toggleSidebar,
    }
})
