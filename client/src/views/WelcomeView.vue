<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { 
  CheckCircle, 
  ListTodo, 
  Timer,
  Gauge,
  ArrowRight} from 'lucide-vue-next'

const features = [
  {
    icon: ListTodo,
    title: 'Task Organization',
    description: 'Easily create, manage and organize your tasks with intuitive interface'
  },
  {
    icon: Timer,
    title: 'Priority Levels',
    description: 'Set different priority levels for your tasks to stay focused on what matters most'
  },
  {
    icon: CheckCircle,
    title: 'Progress Tracking',
    description: 'Track your progress with visual indicators and completion statistics'
  },
  {
    icon: Gauge,
    title: 'Performance Insights',
    description: 'Get insights about your productivity and task completion patterns'
  }
]

// Przykładowe statystyki - w prawdziwej aplikacji pobierałyby dane z store'a
const stats = ref({
  totalTasks: 128,
  completedToday: 12,
  completionRate: 87,
  activeStreak: 7
})
</script>

<template>
  <MainLayout>
    <!-- Hero Section -->
    <div class="py-16 sm:py-24">
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Manage Your Tasks with
          <span class="text-violet-600">Ease</span>
        </h1>
        <p class="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
          Stay organized, focused, and productive with our intuitive task management solution. 
          Track your progress and achieve your goals one task at a time.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <RouterLink
            to="/todos"
            class="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-colors duration-200 flex items-center"
          >
            Get Started
            <ArrowRight class="ml-2 h-4 w-4" />
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-white rounded-xl shadow-sm p-8 mb-16">
      <dl class="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="flex flex-col">
          <dt class="text-sm font-medium leading-6 text-slate-500">Total Tasks</dt>
          <dd class="order-first text-3xl font-semibold tracking-tight text-violet-600">
            {{ stats.totalTasks }}
          </dd>
        </div>
        <div class="flex flex-col">
          <dt class="text-sm font-medium leading-6 text-slate-500">Completed Today</dt>
          <dd class="order-first text-3xl font-semibold tracking-tight text-violet-600">
            {{ stats.completedToday }}
          </dd>
        </div>
        <div class="flex flex-col">
          <dt class="text-sm font-medium leading-6 text-slate-500">Completion Rate</dt>
          <dd class="order-first text-3xl font-semibold tracking-tight text-violet-600">
            {{ stats.completionRate }}%
          </dd>
        </div>
        <div class="flex flex-col">
          <dt class="text-sm font-medium leading-6 text-slate-500">Day Streak</dt>
          <dd class="order-first text-3xl font-semibold tracking-tight text-violet-600">
            {{ stats.activeStreak }}
          </dd>
        </div>
      </dl>
    </div>

    <!-- Features Section -->
    <div class="py-8">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200"
        >
          <component 
            :is="feature.icon"
            class="h-12 w-12 text-violet-600 mb-4"
          />
          <h3 class="text-lg font-semibold text-slate-900 mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-sm text-slate-500">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-violet-600 rounded-xl shadow-sm p-8 mt-16 text-center">
      <h2 class="text-2xl font-bold text-white mb-4">
        Ready to Get Started?
      </h2>
      <p class="text-violet-100 mb-8 max-w-2xl mx-auto">
        Join thousands of users who are already managing their tasks more effectively.
        Start organizing your work and life today.
      </p>
      <RouterLink
        to="/todos"
        class="inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-violet-600 shadow-sm hover:bg-violet-50 transition-colors duration-200"
      >
        Start Managing Tasks
        <ArrowRight class="ml-2 h-4 w-4" />
      </RouterLink>
    </div>
  </MainLayout>
</template>