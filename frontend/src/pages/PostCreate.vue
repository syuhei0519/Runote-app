<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📝 新規投稿</h1>

    <form @submit.prevent="submit" class="bg-white border rounded-lg p-6 shadow-sm">
      <div class="mb-4">
        <label class="block font-semibold mb-2">タイトル</label>
        <input 
          v-model="title" 
          type="text"
          placeholder="投稿のタイトルを入力してください"
          class="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :disabled="loading"
          required 
        />
      </div>

      <div class="mb-6">
        <label class="block font-semibold mb-2">内容</label>
        <textarea 
          v-model="content" 
          placeholder="投稿の内容を入力してください"
          class="border p-2 w-full h-40 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          :disabled="loading"
          required 
        />
      </div>

      <div class="flex justify-between items-center">
        <router-link 
          to="/" 
          class="text-sm text-gray-500 hover:text-gray-700 flex items-center"
        > 一覧に戻る
        </router-link>

        <button 
          type="submit"
          :disabled="loading || !title.trim() || !content.trim()"
          class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          {{ loading ? '投稿中...' : '投稿する' }}
        </button>
      </div>
    </form>

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
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import ToastNotification from '@/components/ToastNotification.vue'

const title = ref('')
const content = ref('')
const loading = ref(false)
const router = useRouter()

// トースト通知の状態管理
const toast = reactive({
  show: false,
  type: 'success' as 'success' | 'error' | 'info' | 'warning',
  message: '',
  description: ''
})

const submit = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    showToast('warning', '入力内容を確認してください', 'タイトルと内容の両方を入力してください。')
    return
  }

  loading.value = true

  try {
    await axios.post('http://localhost:8000/api/posts', {
      title: title.value.trim(),
      content: content.value.trim(),
    })

    showToast('success', '投稿を作成しました', '新しい投稿が正常に作成されました。')
    
    // 少し遅延してから一覧ページに戻る
    setTimeout(() => {
      router.push('/')
    }, 1500)

  } catch (error) {
    console.error('Failed to create post:', error)
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        // バリデーションエラー
        const errors = error.response.data?.errors
        if (errors) {
          const errorMessages = Object.values(errors).flat()
          showToast('error', 'バリデーションエラー', errorMessages.join(' '))
        } else {
          showToast('error', '入力内容に問題があります', '入力内容を確認してください。')
        }
      } else if (error.response?.status >= 500) {
        showToast('error', 'サーバーエラーが発生しました', 'しばらく時間をおいて再度お試しください。')
      } else {
        showToast('error', '投稿の作成に失敗しました', 'ネットワーク接続を確認してください。')
      }
    } else {
      showToast('error', '予期しないエラーが発生しました', '再度お試しください。')
    }
  } finally {
    loading.value = false
  }
}

const showToast = (type: 'success' | 'error' | 'info' | 'warning', message: string, description: string = '') => {
  toast.type = type
  toast.message = message
  toast.description = description
  toast.show = true
}
</script>