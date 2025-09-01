<script setup lang="ts">
import { useAuthStore } from './stores/authorization';
import { useCartStore } from './stores/cart';
const auth = useAuthStore()
const cart = useCartStore()
</script>

<template>
  <div class="id">
    <header style="display: flex; gap: 12px; align-items: center; padding: 12px; border-bottom: 1px solid #eee;">
        <router-link to="/shop">Магазин</router-link> 
        <router-link to="/cart">Корзина ({{ cart.count }})</router-link>

        <div style="margin-left: auto; display: flex; gap: 12px; align-items: center;">
            <span v-if="auth.user">{{ auth.user.email }}</span>
            <button v-if="auth.isAuthenticated" @click="auth.logout">Выйти</button>
            <router-link v-else to="/login">Войти</router-link>
        </div>
    </header>
    <main style="padding: 16px;">
        <routewr-view />
    </main>
  </div>
</template>
