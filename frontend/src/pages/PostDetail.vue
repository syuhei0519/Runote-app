<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📄 投稿詳細</h1>

    <div v-if="post">
      <p class="text-lg font-semibold mb-2">タイトル：</p>
      <p class="mb-4">{{ post.title }}</p>

      <p class="text-lg font-semibold mb-2">内容：</p>
      <p>{{ post.content }}</p>
    </div>
    <div v-else>読み込み中...</div>

    <router-link to="/" class="mt-6 inline-block text-gray-600 underline">← 一覧に戻る</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface Post {
  id: number
  title: string
  content: string
}

const route = useRoute()
const post = ref<Post | null>(null)

onMounted(async () => {
  const res = await axios.get<Post>(`http://localhost:8000/api/posts/${route.params.id}`)
  post.value = res.data
})
</script>