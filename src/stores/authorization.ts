import { defineStore } from "pinia"
import { ref, computed, watch } from 'vue'

type User = { email: string } | null

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('token'))
    const user = ref<User>(JSON.parse(localStorage.getItem('user') || 'null'))

    const isAuthenticated = computed(() => !!token.value)

    function login(email: string, password: string) {
        token.value = 'John-Doll'
        user.value = { email }
    }

    function logout() {
        token.value = null
        user.value = null
    }

    watch(token, (e) => {
        if (e) localStorage.setItem('token', e)
            else localStorage.removeItem('token')
    }, { immediate: true })

    watch(user, (e) => {
        if (e) localStorage.setItem('user', JSON.stringify(e))
            else localStorage.removeItem('user')
    }, { deep: true, immediate: true })

    return { token, user, isAuthenticated, login, logout }
})

