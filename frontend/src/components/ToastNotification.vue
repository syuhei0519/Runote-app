<template>
  <div
    v-if="show"
    class="fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out transform"
    :class="show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
  >
    <div
      class="bg-white rounded-lg shadow-lg border-l-4 p-4 max-w-sm"
      :class="{
        'border-green-500': type === 'success',
        'border-red-500': type === 'error',
        'border-blue-500': type === 'info',
        'border-yellow-500': type === 'warning'
      }"
    >
      <div class="flex items-center">
        <!-- アイコン -->
        <div class="flex-shrink-0 mr-3">
          <!-- Success Icon -->
          <svg v-if="type === 'success'" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <!-- Error Icon -->
          <svg v-else-if="type === 'error'" class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <!-- Info Icon -->
          <svg v-else-if="type === 'info'" class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <!-- Warning Icon -->
          <svg v-else-if="type === 'warning'" class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.696-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>

        <!-- メッセージ -->
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900">{{ message }}</p>
          <p v-if="description" class="text-xs text-gray-500 mt-1">{{ description }}</p>
        </div>

        <!-- 閉じるボタン -->
        <button
          @click="close"
          class="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

interface Props {
  show: boolean
  type?: 'success' | 'error' | 'info' | 'warning'
  message: string
  description?: string
  duration?: number
}

interface Emits {
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  description: '',
  duration: 5000
})

const emit = defineEmits<Emits>()

let timeoutId: number | null = null

const close = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  emit('close')
}

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        close()
      }, props.duration)
    }
  }
)
</script>
