<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: 'all' | 'pending' | 'purchased'
}>(), {
  modelValue: 'all'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'all' | 'pending' | 'purchased'): void
}>()
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm mb-8">
    <nav class="flex" aria-label="Tabs">
      <button
        v-for="tab in ['all', 'pending', 'purchased']"
        :key="tab"
        @click="emit('update:modelValue', tab as 'all' | 'pending' | 'purchased')"
        :class="[
          modelValue === tab
            ? 'border-b-2 border-violet-500 text-violet-600'
            : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
          'flex-1 py-4 px-1 text-center font-medium text-sm'
        ]"
      >
        {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
      </button>
    </nav>
  </div>
</template>