<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
const cart = useCartStore()

function inc(id: number) {
    const it = cart.items.find(i => i.id === id)
    if(it) cart.setQty(id, it.qty + 1)
}

function dec(id: number) {
    const it = cart.items.find(i => i.id === id)
    if(it) cart.setQty(id, Math.max(1, it.qty - 1))
}

function onQty(id: number, e: Event) {
    const v = Number((e.target as HTMLInputElement).value || '1')
    cart.setQty(id, isNaN(v) ? 1 : v)
}

function checkout() {
    if(cart.items.length === 0) {
        alert('Корзина пуста')
    } else {
        alert('Заказ оформлен')
    }
}
</script>

<template>
    <div>
        <h2>Корзина</h2>

        <div style="margin-top: 12px;">Пусто</div>

        <div style="display: grid; gap: 12px; margin-top: 12px;">
            <div v-for="item in cart.items" :key="item.id" style="display: grid; grid-template-columns: 80px 1fr auto auto auto; gap: 12px; align-items: center; border: 1px solid #eee; border-radius: 12px; padding: 8px;">
                <img :src="item.image" :alt="item.name" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;"></img>
                <div>
                    <strong>{{ item.name }}</strong><br />
                    <small>{{ (item.price).toFixed(2) }} $ за штуку</small>
                </div>
                <div style="display: flex; gap: 6px; align-items: center;">
                    <button @click="dec(item.id)">-</button>
                    <input :value="item.qty" @input="onQty(item.id, $event)" style="width: 30px; text-align: center; padding: 3px;"></input>
                    <button @click="inc(item.id)">+</button>
                </div>
                <div><strong>{{ (item.price * item.qty).toFixed(2) }} $</strong></div>
                <button @click="cart.remove(item.id)" class="btn bgc-red">Удалить</button>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 16px; align-items: center; border-top: 1px solid #eee; padding-top: 12px;">
                <strong>Итого: {{ cart.total.toFixed(2) }} $</strong>
                <button @click="checkout" class="btn bgc-lg">Оформить</button>
                <button @click="cart.clear" class="btn bgc-choko">Очистить</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn {
    padding: 7px 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
}

.bgc-red {
    background-color: red;
    padding: 10px 15px;
}

.bgc-lg {
    background-color: lawngreen;
}

.bgc-choko {
    background-color: rgb(247, 143, 7);
}
</style>