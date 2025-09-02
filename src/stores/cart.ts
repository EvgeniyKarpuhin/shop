import { defineStore } from "pinia"
import { ref, computed, watch } from 'vue'

export type CartItem = {
    id: number
    name: string
    price: number
    image: string
    qty: number
}

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'))

    const count = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
    const total = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))

    function add(product: Omit<CartItem, 'qty'>, qty = 1) {
        const found = items.value.find(i => i.id === product.id)
        if(found) found.qty += qty
        else items.value.push({...product, qty})
    }

    function remove(id: number) {
        items.value = items.value.filter(i=> i.id !== id)
    }

    function setQty(id:number, qty: number) {
        const it = items.value.find(i=> i.id === id)
        if(!it) return
        it.qty = Math.max(1, qty)
    }

    function clear() {
        items.value = []
    }

    watch(items, (v) => {
        localStorage.setItem('cart', JSON.stringify(v))
    }, { deep: true })

    return { items, count, total, add, remove, setQty, clear }
})