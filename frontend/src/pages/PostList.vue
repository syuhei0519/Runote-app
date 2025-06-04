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
        <div class="flex-1">
          <p class="font-semibold">{{ post.title }}</p>
          <p class="text-sm text-gray-500 mt-1 truncate">{{ post.content }}</p>
        </div>
        <div class="flex gap-4 text-sm ml-4">
          <router-link
            :to="`/posts/${post.id}`"
            class="text-blue-600 hover:underline"
          >
            詳細
          </router-link>
          <button
            @click="showDeleteDialog(post)"
            :disabled="deleteLoading"
            class="text-red-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            削除
          </button>
        </div>
      </li>
    </ul>

    <!-- 確認ダイアログ -->
    <ConfirmDialog
      :show="dialog.show"
      :title="dialog.title"
      :message="dialog.message"
      :description="dialog.description"
      :loading="deleteLoading"
      confirm-text="削除"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

    <!-- トースト通知 -->
    <ToastNotification
      :show="toast.show"
      :type="toast.type"
      :message="toast.message"
      :description="toast.description"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import ToastNotification from '@/components/ToastNotification.vue'

interface Post {
  id: number
  title: string
  content: string
  created_at?: string
  updated_at?: string
}

const posts = ref<Post[]>([])
const deleteLoading = ref(false)
const selectedPost = ref<Post | null>(null)

// ダイアログの状態管理
const dialog = reactive({
  show: false,
  title: '投稿の削除',
  message: '',
  description: 'この操作は取り消すことができません。'
})

// トースト通知の状態管理
const toast = reactive({
  show: false,
  type: 'success' as 'success' | 'error' | 'info' | 'warning',
  message: '',
  description: ''
})

const fetchPosts = async () => {
  try {
    const res = await axios.get<Post[]>('http://localhost:8000/api/posts')
    posts.value = res.data
  } catch (error) {
    showToast('error', 'データの取得に失敗しました', '再度お試しください。')
    console.error('Failed to fetch posts:', error)
  }
}

const showDeleteDialog = (post: Post) => {
  selectedPost.value = post
  dialog.show = true
  dialog.message = `「${post.title}」を削除しますか？`
}

const cancelDelete = () => {
  dialog.show = false
  selectedPost.value = null
}

const confirmDelete = async () => {
  if (!selectedPost.value) return

  deleteLoading.value = true
  
  try {
    await axios.delete(`http://localhost:8000/api/posts/${selectedPost.value.id}`)
    
    // UIから投稿を削除
    posts.value = posts.value.filter(p => p.id !== selectedPost.value!.id)
    
    // 成功通知
    showToast('success', '投稿を削除しました', `「${selectedPost.value.title}」が削除されました。`)
    
    // ダイアログを閉じる
    dialog.show = false
    selectedPost.value = null
    
  } catch (error) {
    console.error('Failed to delete post:', error)
    
    // エラー通知
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        showToast('error', '投稿が見つかりません', 'すでに削除されている可能性があります。')
        // 404の場合は一覧を再取得
        fetchPosts()
      } else if (error.response?.status >= 500) {
        showToast('error', 'サーバーエラーが発生しました', 'しばらく時間をおいて再度お試しください。')
      } else {
        showToast('error', '削除に失敗しました', 'ネットワーク接続を確認してください。')
      }
    } else {
      showToast('error', '予期しないエラーが発生しました', '再度お試しください。')
    }
  } finally {
    deleteLoading.value = false
  }
}

const showToast = (type: 'success' | 'error' | 'info' | 'warning', message: string, description: string = '') => {
  toast.type = type
  toast.message = message
  toast.description = description
  toast.show = true
}

onMounted(fetchPosts)
</script>