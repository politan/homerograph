// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/TodoView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import ShoppingView from '@/views/ShoppingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeView
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TodoView
    },
    {
      path: '/shopping-list',
      name: 'shopping-list',
      component: ShoppingView
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