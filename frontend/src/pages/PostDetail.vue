<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📄 投稿詳細</h1>

    <div v-if="loading" class="text-gray-500">読み込み中...</div>
    
    <div v-else-if="post" class="bg-white border rounded-lg p-6 shadow-sm">
      <div class="mb-6">
        <p class="text-lg font-semibold mb-2">タイトル：</p>
        <h2 class="text-xl mb-4">{{ post.title }}</h2>

        <p class="text-lg font-semibold mb-2">内容：</p>
        <p class="text-gray-700 leading-relaxed">{{ post.content }}</p>
      </div>

      <div class="flex justify-between items-center pt-4 border-t">
        <router-link 
          to="/" 
          class="text-sm text-gray-500 hover:text-gray-700 flex items-center"
        > 一覧に戻る
        </router-link>

        <button
          @click="showDeleteDialog"
          :disabled="deleteLoading"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <svg v-if="deleteLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          {{ deleteLoading ? '削除中...' : '削除' }}
        </button>
      </div>
    </div>

    <div v-else class="text-red-500">投稿が見つかりません</div>

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
import { useRoute, useRouter } from 'vue-router'
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

const route = useRoute()
const router = useRouter()
const post = ref<Post | null>(null)
const loading = ref(true)
const deleteLoading = ref(false)

// ダイアログの状態管理
const dialog = reactive({
  show: false,
  title: '投稿の削除',
  message: '',
  description: 'この操作は取り消すことができません。削除後は一覧ページに戻ります。'
})

// トースト通知の状態管理
const toast = reactive({
  show: false,
  type: 'success' as 'success' | 'error' | 'info' | 'warning',
  message: '',
  description: ''
})

const fetchPost = async () => {
  try {
    loading.value = true
    const res = await axios.get<Post>(`http://localhost:8000/api/posts/${route.params.id}`)
    post.value = res.data
  } catch (error) {
    console.error('Failed to fetch post:', error)
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      showToast('error', '投稿が見つかりません', 'URLが間違っているか、投稿が削除されている可能性があります。')
    } else {
      showToast('error', 'データの取得に失敗しました', '再度お試しください。')
    }
    post.value = null
  } finally {
    loading.value = false
  }
}

const showDeleteDialog = () => {
  if (!post.value) return
  
  dialog.show = true
  dialog.message = `「${post.value.title}」を削除しますか？`
}

const cancelDelete = () => {
  dialog.show = false
}

const confirmDelete = async () => {
  if (!post.value) return

  deleteLoading.value = true
  
  try {
    await axios.delete(`http://localhost:8000/api/posts/${post.value.id}`)
    
    // 成功通知
    showToast('success', '投稿を削除しました', `「${post.value.title}」が削除されました。`)
    
    // ダイアログを閉じる
    dialog.show = false
    
    // 少し遅延してから一覧ページに戻る
    setTimeout(() => {
      router.push('/')
    }, 1500)
    
  } catch (error) {
    console.error('Failed to delete post:', error)
    
    // エラー通知
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        showToast('error', '投稿が見つかりません', 'すでに削除されている可能性があります。')
        // 404の場合は一覧ページに戻る
        setTimeout(() => {
          router.push('/')
        }, 2000)
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

onMounted(fetchPost)
</script>