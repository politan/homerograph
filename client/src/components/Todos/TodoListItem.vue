// src/components/TodoListItem.vue
<script setup lang="ts">
import { TrashIcon, CheckIcon } from 'lucide-vue-next'
import type { Todo } from '@/types/todo'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'remove'): void
}>()

const priorityClasses = {
  low: 'text-green-800 bg-green-50 ring-1 ring-green-600/20',
  medium: 'text-yellow-800 bg-yellow-50 ring-1 ring-yellow-600/20',
  high: 'text-red-800 bg-red-50 ring-1 ring-red-600/20'
}
</script>

<template>
  <div
      class="group bg-white rounded-xl shadow-sm p-4 flex items-center justify-between
           hover:shadow-md transition-shadow duration-200"
  >
    <div class="flex items-center gap-4">
      <div class="relative">
        <input
            type="checkbox"
            :checked="todo.completed"
            @change="emit('toggle')"
            class="peer h-5 w-5 rounded border-slate-300 text-violet-600
                 focus:ring-4 focus:ring-violet-500/20"
        />
        <CheckIcon
            class="absolute top-0.5 left-0.5 h-4 w-4 text-white
                 pointer-events-none opacity-0 peer-checked:opacity-100
                 transition-opacity duration-200"
        />
      </div>
      <span
          :class="[
          'text-slate-900 text-sm',
          todo.completed ? 'line-through text-slate-400' : ''
        ]"
      >
        {{ todo.title }}
      </span>
      <span
          :class="[
          priorityClasses[todo.priority],
          'px-2.5 py-0.5 rounded-full text-xs font-medium'
        ]"
      >
        {{ todo.priority }}
      </span>
    </div>
    <button
        @click="emit('remove')"
        class="text-slate-400 hover:text-red-500 focus:outline-none
             opacity-0 group-hover:opacity-100 transition-opacity duration-200
             focus:ring-4 focus:ring-red-500/20 rounded-lg p-1"
    >
      <TrashIcon class="h-5 w-5" />
    </button>
  </div>
</template>