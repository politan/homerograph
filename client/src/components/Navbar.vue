// src/components/Navbar.vue
<script setup lang="ts">
import {ref} from 'vue'
import {UsersRound} from 'lucide-vue-next'

const navigation = ref([
  {name: 'Tasks', href: '/tasks', current: true},
  {name: 'Shopping list', href: '/shopping-list', current: true},
  {name: 'Calendar', href: '/calendar', current: true},
  {name: 'Budget', href: '/budget', current: true},
  {name: 'Statistics', href: '/statistics', current: false},
])
</script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-slate-900 p-6">
    <router-link to="/" class="flex items-center flex-shrink-0 text-white mr-6 hover:text-violet-600">
      <UsersRound class="h-8 w-8 text-violet-600"/>
      <span class="font-semibold text-xl tracking-tight ml-3">Homeograph</span>
    </router-link>
    <div class="block lg:hidden">
      <button
          class="flex items-center px-3 py-2 border rounded text-violet-600 border-teal-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <a v-for="item in navigation"
           :key="item.name"
           :href="item.href"
           class="block mt-4 lg:inline-block lg:mt-0 text-violet-600 hover:text-white mr-4">
          {{ item.name }}
        </a>
      </div>
<!--      <div>-->
<!--        <a href="#"-->
<!--           class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>-->
<!--      </div>-->
    </div>
  </nav>
</template>