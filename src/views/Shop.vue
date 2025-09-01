<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';

type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
}

const products = ref<Product[]>([])
const loading = ref(false)
const error = ref('')
const search = ref('')
const sortBy = ref<'name' | 'price-asc' | 'price-desc'>('name')

const cart = useCartStore()

onMounted(async () => {
    try {
        loading.value = true
        const res = await fetch('/products.json')
        if (!res.ok) throw new Error('Не удалось закгрузить товары')
        products.value = await res.json()
    } catch (e:any) {
        error.value = e.message
    } finally {
        loading.value = false
    }
})

const filtered = computed(() => {
    let list = products.value.filter(p => 
        [p.name, p.description].join('').toLowerCase().includes(search.value.toLowerCase())
    )
    if(sortBy.value === 'name') list = list.sort((a, b) => a.name.localeCompare(b.name))
    if(sortBy.value === 'price-asc') list = list.sort((a, b) => a.price - b.price)
    if(sortBy.value === 'price-desc') list = list.sort((a, b) => b.price - a.price)
    return list
})

function add(p: Product) {
    cart.add({ id: p.id, name: p.name, price: p.price, image: p.image }, 1)
}
</script>

<template>
    <div>
        <h2>Магазин</h2>
        <div style="margin: 12px 0; display: flex; gap: 8px; flex-wrap: wrap;">
            <input v-model="search" placeholder="Поиск..."></input>
            <select v-model="sortBy">
                <option value="name">Название</option>
                <option value="price-asc">Цена ↑</option>
                <option value="price-desc">Цена ↓</option>
            </select>
        </div>
        <div class="flex" style="display: flex; grid-template-columns: repeat(auto-fill, mimax(220px, 1fr)); gap: 16px; justify-content: space-around; margin-top: 30px;">
            <div v-for="p in filtered" :key="p.id" class="card" style="border: 1px solid #eee; padding: 12px; border-radius: 12px;">
                <img :src="p.image" alt="p.name" style="width: 500px; height: 500px; object-fit: cover; border-radius: 8px;" />
                <h3 style="margin: 8px 0 4px;">{{ p.name }}</h3>
                <p style="opacity: .7; margin: 0 0 8px;">{{ p.description }}</p>
                <strong>{{ p.price.toFixed(2) }} $</strong>
                <div style="margin-top: 8px; display: flex; gap: 8px;">
                    <button @click="add(p)">В корзину</button>
                </div>
            </div>
        </div>
        <p v-if="loading" style="margin-top: 12px;">Закгрузка</p>
        <p v-if="error" style="margin-top: 12px; color: red;">{{ error }}</p>
    </div>
</template>