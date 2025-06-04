import { createRouter, createWebHistory } from 'vue-router'
import PostList from '@/pages/PostList.vue'
import PostDetail from '@/pages/PostDetail.vue'
import PostCreate from '@/pages/PostCreate.vue'

const routes = [
  { path: '/create', component: PostCreate },
  { path: '/', component: PostList },
  { path: '/posts/:id', component: PostDetail },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})