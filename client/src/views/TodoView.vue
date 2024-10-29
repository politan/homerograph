// src/views/TodoView.vue
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import TodoForm from '@/components/todos/TodoForm.vue'
import TodoList from '@/components/todos/TodoList.vue'
import TodoFilter from '@/components/todos/TodoFilter.vue'
import type { Todo } from '@/types/todo'

const todos = ref<Todo[]>([])
const filter = ref<'all' | 'active' | 'completed'>('all')

const addTodo = (data: { title: string; priority: 'low' | 'medium' | 'high' }) => {
  todos.value.push({
    id: Date.now(),
    title: data.title,
    completed: false,
    priority: data.priority
  })
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

const removeTodo = (id: number) => {
  todos.value = todos.value.filter(t => t.id !== id)
}

// Load todos from localStorage
onMounted(() => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  }
})

// Save todos to localStorage when they change
watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })
</script>

<template>
  <MainLayout>
    <TodoForm @add="addTodo" />
    <TodoFilter v-model="filter" />
    <TodoList
        :todos="todos"
        :filter="filter"
        @toggle="toggleTodo"
        @remove="removeTodo"
    />
  </MainLayout>
</template>