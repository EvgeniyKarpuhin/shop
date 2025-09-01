<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authorization';
import { useRoute, useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

function onSubmit() {
    try {
        auth.login(email.value, password.value)
        router.push((route.query.redirect as string) || '/shop')
    } catch (e: any) {
        error.value = e.message || 'Ошибка входа'
    }
}
</script>

<template>
    <div style="max-width: 360px; margin: 40px auto;">
        <h2>Вход</h2>
        <form @submit.prevent="onSubmit" style="display: grid; gap: 12px; margin-top: 16px;">
            <input v-model="email" type="email" placeholder="Email" required></input>
            <input v-model="password" type="password" placeholder="Введите пароль" required></input>
            <button type="submit">Войти</button>
        </form>
        <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
</template>