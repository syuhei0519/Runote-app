import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ToastNotification from '../ToastNotification.vue'

describe('ToastNotification', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllTimers()
  })

  it('成功タイプで正しく表示される', () => {
    const wrapper = mount(ToastNotification, {
      props: {
        show: true,
        type: 'success',
        message: '成功メッセージ',
        description: '成功の詳細'
      }
    })

    expect(wrapper.text()).toContain('成功メッセージ')
    expect(wrapper.text()).toContain('成功の詳細')
    expect(wrapper.find('.border-green-500').exists()).toBe(true)
  })

  it('エラータイプで正しく表示される', () => {
    const wrapper = mount(ToastNotification, {
      props: {
        show: true,
        type: 'error',
        message: 'エラーメッセージ'
      }
    })

    expect(wrapper.find('.border-red-500').exists()).toBe(true)
    expect(wrapper.find('.text-red-500').exists()).toBe(true)
  })

  it('警告タイプで正しく表示される', () => {
    const wrapper = mount(ToastNotification, {
      props: {
        show: true,
        type: 'warning',
        message: '警告メッセージ'
      }
    })

    expect(wrapper.find('.border-yellow-500').exists()).toBe(true)
    expect(wrapper.find('.text-yellow-500').exists()).toBe(true)
  })

  it('情報タイプで正しく表示される', () => {
    const wrapper = mount(ToastNotification, {
      props: {
        show: true,
        type: 'info',
        message: '情報メッセージ'
      }
    })

    expect(wrapper.find('.border-blue-500').exists()).toBe(true)
    expect(wrapper.find('.text-blue-500').exists()).toBe(true)
  })

  it('閉じるボタンクリック時にcloseイベントが発火される', async () => {
    const wrapper = mount(ToastNotification, {
      props: {
        show: true,
        type: 'info',
        message: 'テストメッセージ'
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('show=falseの時は表示されない', () => {
    const wrapper = mount(ToastNotification, {
      props: {
        show: false,
        type: 'info',
        message: 'テストメッセージ'
      }
    })

    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  it('デフォルトプロパティが正しく設定される', () => {
    const wrapper = mount(ToastNotification, {
      props: {
        show: true,
        message: 'テストメッセージ'
      }
    })

    expect(wrapper.find('.border-blue-500').exists()).toBe(true) // デフォルトはinfo
  })

  it('descriptionが空の場合は表示されない', () => {
    const wrapper = mount(ToastNotification, {
      props: {
        show: true,
        type: 'info',
        message: 'テストメッセージ'
      }
    })

    expect(wrapper.text()).toContain('テストメッセージ')
    // descriptionが表示されていないことを確認
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs).toHaveLength(1) // messageのみ
  })
})
