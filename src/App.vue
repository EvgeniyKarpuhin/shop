<script setup lang="ts">
import { useAuthStore } from './stores/authorization';
import { useCartStore } from './stores/cart';
import { useRouter } from 'vue-router';
const auth = useAuthStore()
const cart = useCartStore()
const router = useRouter()

function onLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="id">
    <header style="display: flex; gap: 12px; font-size: 18px; align-items: center; padding: 12px; border-bottom: 1px solid #eee;">
        <router-link to="/shop" class="link">Магазин</router-link> 
        <router-link to="/cart" class="link active">Корзина ({{ cart.count }})</router-link>

        <div style="margin-left: auto; display: flex; gap: 12px; align-items: center;">
            <span v-if="auth.user">{{ auth.user.email }}</span>
            <button v-if="auth.isAuthenticated" @click="onLogout">Выйти</button>
            <router-link v-else to="/login">Войти</router-link>
        </div>
    </header>
    <main style="padding: 16px;">
        <router-view />
    </main>
  </div>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: black;
}

.router-link-exact-active {
  color: green;
}
</style>