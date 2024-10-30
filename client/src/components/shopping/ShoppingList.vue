<script setup lang="ts">
import { computed } from 'vue'
import ShoppingListItem from './ShoppingListItem.vue'
import type { ShoppingItem } from '@/types/shopping'

const props = withDefaults(defineProps<{
  items: ShoppingItem[]
  filter: 'all' | 'pending' | 'purchased'
}>(), {
  items: () => [],
  filter: 'all'
})

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'remove', id: number): void
}>()

const filteredItems = computed(() => {
  switch (props.filter) {
    case 'pending':
      return props.items.filter(i => !i.purchased)
    case 'purchased':
      return props.items.filter(i => i.purchased)
    default:
      return props.items
  }
})
</script>

<template>
  <div class="space-y-4">
    <ShoppingListItem
      v-for="item in filteredItems"
      :key="item.id"
      :item="item"
      @toggle="emit('toggle', item.id)"
      @remove="emit('remove', item.id)"
    />
    <div
      v-if="filteredItems.length === 0"
      class="bg-white rounded-xl p-8 text-center text-slate-500"
    >
      No items found
    </div>
  </div>
</template>