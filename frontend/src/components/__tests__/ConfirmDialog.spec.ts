import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmDialog from '../ConfirmDialog.vue'

describe('ConfirmDialog', () => {
  const defaultProps = {
    show: true,
    title: 'テスト確認',
    message: 'これはテストメッセージです',
    description: 'テスト説明文',
    confirmText: '確認',
    loading: false
  }

  it('正しくレンダリングされる', () => {
    const wrapper = mount(ConfirmDialog, {
      props: defaultProps
    })

    expect(wrapper.find('h3').text()).toBe('テスト確認')
    expect(wrapper.text()).toContain('これはテストメッセージです')
    expect(wrapper.text()).toContain('テスト説明文')
  })

  it('show=falseの時は表示されない', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...defaultProps, show: false }
    })

    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  it('確認ボタンクリック時にconfirmイベントが発火される', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: defaultProps
    })

    const buttons = wrapper.findAll('button')
    const confirmButton = buttons[1] // 2番目のボタンが確認ボタン
    await confirmButton.trigger('click')
    
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('キャンセルボタンクリック時にcancelイベントが発火される', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: defaultProps
    })

    const buttons = wrapper.findAll('button')
    const cancelButton = buttons[0] // 1番目のボタンがキャンセルボタン
    await cancelButton.trigger('click')
    
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('ローディング状態では正しく表示される', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...defaultProps, loading: true }
    })

    expect(wrapper.text()).toContain('削除中...')
    
    const buttons = wrapper.findAll('button')
    const confirmButton = buttons[1]
    expect(confirmButton.attributes('disabled')).toBeDefined()
  })

  it('デフォルトプロパティが正しく設定される', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { show: true }
    })

    expect(wrapper.find('h3').text()).toBe('確認')
    expect(wrapper.text()).toContain('本当に実行しますか？')
    expect(wrapper.text()).toContain('削除')
  })
})
