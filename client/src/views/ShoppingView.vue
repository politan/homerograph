<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import ShoppingForm from '@/components/shopping/ShoppingForm.vue'
import ShoppingList from '@/components/shopping/ShoppingList.vue'
import ShoppingFilter from '@/components/shopping/ShoppingFilter.vue'
import type { ShoppingItem } from '@/types/shopping'

const items = ref<ShoppingItem[]>([])
const filter = ref<'all' | 'pending' | 'purchased'>('all')

const addItem = (data: { name: string; quantity: number; category: 'groceries' | 'household' | 'other' }) => {
  items.value.push({
    id: Date.now(),
    name: data.name,
    quantity: data.quantity,
    category: data.category,
    purchased: false
  })
}

const toggleItem = (id: number) => {
  const item = items.value.find(i => i.id === id)
  if (item) {
    item.purchased = !item.purchased
  }
}

const removeItem = (id: number) => {
  items.value = items.value.filter(i => i.id !== id)
}

onMounted(() => {
  const savedItems = localStorage.getItem('shoppingItems')
  if (savedItems) {
    items.value = JSON.parse(savedItems)
  }
})

watch(items, (newItems) => {
  localStorage.setItem('shoppingItems', JSON.stringify(newItems))
}, { deep: true })
</script>

<template>
  <MainLayout>
    <ShoppingForm @add="addItem" />
    <ShoppingFilter v-model="filter" />
    <ShoppingList
      :items="items"
      :filter="filter"
      @toggle="toggleItem"
      @remove="removeItem"
    />
  </MainLayout>
</template>