<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📋 投稿一覧</h1>

    <router-link
      to="/create"
      class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
    >
      + 新規投稿
    </router-link>

    <div v-if="posts.length === 0" class="text-gray-500">投稿がありません</div>

    <ul>
      <li
        v-for="post in posts"
        :key="post.id"
        class="mb-4 p-4 border rounded shadow-sm flex justify-between items-center"
      >
        <div>
          <p class="font-semibold">{{ post.title }}</p>
        </div>
        <div class="flex gap-4 text-sm">
          <router-link
            :to="`/posts/${post.id}`"
            class="text-blue-600 hover:underline"
          >
            詳細
          </router-link>
          <button
            @click="deletePost(post.id)"
            class="text-red-500 hover:underline"
          >
            削除
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Post {
  id: number
  title: string
  content: string
}

const posts = ref<Post[]>([])

const fetchPosts = async () => {
  const res = await axios.get<Post[]>('http://localhost:8000/api/posts')
  posts.value = res.data
}

const deletePost = async (id: number) => {
  if (confirm('この投稿を削除しますか？')) {
    await axios.delete(`http://localhost:8000/api/posts/${id}`)
    posts.value = posts.value.filter(p => p.id !== id)
  }
}

onMounted(fetchPosts)
</script>