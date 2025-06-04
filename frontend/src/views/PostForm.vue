<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">新規投稿</h1>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <label class="block font-semibold mb-1">タイトル</label>
        <input v-model="title" type="text" class="border rounded w-full p-2" />
      </div>
      <div class="mb-4">
        <label class="block font-semibold mb-1">内容</label>
        <textarea v-model="content" class="border rounded w-full p-2"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">送信</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const title = ref("");
const content = ref("");

const submit = async () => {
  try {
    await axios.post(
      "http://localhost:8000/api/posts",
      {
        title: title.value,
        content: content.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    alert("投稿に成功しました");
    title.value = "";
    content.value = "";
  } catch (error) {
    console.error("❌ 投稿エラー", error);
    alert("投稿に失敗しました");
  }
};
</script>
