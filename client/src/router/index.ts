// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: TodoView
    },
    // Możesz dodać więcej tras w przyszłości
    //{
    //  path: '/statistics',
    //  name: 'statistics',
    //  // Lazy loading - komponent będzie załadowany tylko wtedy, gdy będzie potrzebny
    //  component: () => import('@/views/StatisticsView.vue')
    //}
  ]
})

export default router