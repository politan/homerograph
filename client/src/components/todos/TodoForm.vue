// src/components/TodoForm.vue
<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from 'lucide-vue-next'

interface TodoFormData {
  title: string
  priority: 'low' | 'medium' | 'high'
}

const emit = defineEmits<{
  (e: 'add', data: TodoFormData): void
}>()

const title = ref('')
const priority = ref<'low' | 'medium' | 'high'>('medium')

const handleSubmit = () => {
  if (title.value.trim()) {
    emit('add', {
      title: title.value,
      priority: priority.value
    })
    title.value = ''
  }
}

const priorityClasses = {
  low: 'bg-green-100 ring-1 ring-green-600/20',
  medium: 'bg-yellow-100 ring-1 ring-yellow-600/20',
  high: 'bg-red-100 ring-1 ring-red-600/20'
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
    <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
            v-model="title"
            type="text"
            placeholder="What needs to be done?"
            class="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300
                 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20
                 placeholder:text-slate-400"
        />
      </div>
      <div class="flex gap-4">
        <select
            v-model="priority"
            :class="{
              'px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20': true,
              [priorityClasses[priority]]: true
            }"
        >
          <option value="low" class="bg-green-100">Low Priority</option>
          <option value="medium" class="bg-yellow-100">Medium Priority</option>
          <option value="high" class="bg-red-100">High Priority</option>
        </select>
        <button
            type="submit"
            class="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium
                 text-white bg-violet-600 hover:bg-violet-700
                 focus:outline-none focus:ring-4 focus:ring-violet-500/20
                 transition-colors duration-200"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add Task
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
select option {
  padding: 0.5rem;
}
</style>