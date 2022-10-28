import { createRouter, createWebHistory } from 'vue-router';
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
  ],
});
