// src/components/TodoList.vue
<script setup lang="ts">
import { computed } from 'vue'
import TodoListItem from './TodoListItem.vue'
import type { Todo } from '@/types/todo'

const props = withDefaults(defineProps<{
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
}>(), {
  todos: () => [],
  filter: 'all'
})

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'remove', id: number): void
}>()

const filteredTodos = computed(() => {
  switch (props.filter) {
    case 'active':
      return props.todos.filter(t => !t.completed)
    case 'completed':
      return props.todos.filter(t => t.completed)
    default:
      return props.todos
  }
})
</script>

<template>
  <div class="space-y-4">
    <TodoListItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="emit('toggle', todo.id)"
        @remove="emit('remove', todo.id)"
    />
    <div
        v-if="filteredTodos.length === 0"
        class="bg-white rounded-xl p-8 text-center text-slate-500"
    >
      No tasks found
    </div>
  </div>
</template>