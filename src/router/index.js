import { createRouter, createWebHistory } from 'vue-router';
import watch from "@/components/VueWatcher.vue"
import Sample from '@/components/Sample.vue'

export const routerHistory = createWebHistory();
export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    {
      path: '/',
      components: { default: Sample },
    },
    {
      path: '/watch',
      components: { default: watch },
    },
  ],
});