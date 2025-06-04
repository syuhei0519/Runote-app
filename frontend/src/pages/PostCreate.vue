<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📝 新規投稿</h1>

    <label class="block font-semibold">タイトル</label>
    <input v-model="title" class="border p-2 w-full mb-4" />

    <label class="block font-semibold">内容</label>
    <textarea v-model="content" class="border p-2 w-full h-40 mb-4" />

    <button @click="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      投稿する
    </button>
    <router-link to="/" class="ml-4 text-gray-600 underline">← 一覧に戻る</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const title = ref('')
const content = ref('')
const router = useRouter()

const submit = async () => {
  await axios.post('http://localhost:8000/api/posts', {
    title: title.value,
    content: content.value,
  })
  alert('投稿しました')
  router.push('/')
}
</script>