<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from 'lucide-vue-next'

interface ShoppingFormData {
  name: string
  quantity: number
  category: 'groceries' | 'household' | 'other'
}

const emit = defineEmits<{
  (e: 'add', data: ShoppingFormData): void
}>()

const name = ref('')
const quantity = ref(1)
const category = ref<'groceries' | 'household' | 'other'>('groceries')

const handleSubmit = () => {
  if (name.value.trim()) {
    emit('add', {
      name: name.value,
      quantity: quantity.value,
      category: category.value
    })
    name.value = ''
    quantity.value = 1
  }
}

const categoryClasses = {
  groceries: 'bg-green-100 ring-1 ring-green-600/20',
  household: 'bg-blue-100 ring-1 ring-blue-600/20',
  other: 'bg-gray-100 ring-1 ring-gray-600/20'
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
    <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          v-model="name"
          type="text"
          placeholder="What do you need to buy?"
          class="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
        />
      </div>
      <input
        v-model="quantity"
        type="number"
        min="1"
        class="w-24 px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
      />
      <select
        v-model="category"
        :class="{
          'px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20': true,
          [categoryClasses[category]]: true
        }"
      >
        <option value="groceries">Groceries</option>
        <option value="household">Household</option>
        <option value="other">Other</option>
      </select>
      <button
        type="submit"
        class="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:ring-violet-500/20"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Add Item
      </button>
    </form>
  </div>
</template>