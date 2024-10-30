<script setup lang="ts">
import { TrashIcon, CheckIcon } from 'lucide-vue-next'
import type { ShoppingItem } from '@/types/shopping'

const props = defineProps<{
  item: ShoppingItem
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'remove'): void
}>()

const categoryClasses = {
  groceries: 'text-green-800 bg-green-100 ring-1 ring-green-600/20',
  household: 'text-blue-800 bg-blue-100 ring-1 ring-blue-600/20',
  other: 'text-gray-800 bg-gray-100 ring-1 ring-gray-600/20'
}
</script>

<template>
  <div class="group bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
    <div class="flex items-center gap-4">
      <div class="relative">
        <input
          type="checkbox"
          :checked="item.purchased"
          @change="emit('toggle')"
          class="peer h-5 w-5 rounded border-slate-300 text-violet-600 focus:ring-4 focus:ring-violet-500/20"
        />
        <CheckIcon
          class="absolute top-0.5 left-0.5 h-4 w-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
        />
      </div>
      <div :class="['flex items-center gap-2', item.purchased ? 'line-through text-slate-400' : 'text-slate-900']">
        <span class="text-sm">{{ item.name }}</span>
        <span class="text-sm font-medium">({{ item.quantity }})</span>
      </div>
      <span
        :class="[
          categoryClasses[item.category],
          'px-2.5 py-0.5 rounded-full text-xs font-medium'
        ]"
      >
        {{ item.category }}
      </span>
    </div>
    <button
      @click="emit('remove')"
      class="text-slate-400 hover:text-red-500 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:ring-4 focus:ring-red-500/20 rounded-lg p-1"
    >
      <TrashIcon class="h-5 w-5" />
    </button>
  </div>
</template>