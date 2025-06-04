# 🧪 Vueコンポーネントテスト実行ガイド

## 📋 概要

このガイドでは、runoteプロジェクトのVueコンポーネントテストの実行方法を説明します。

## 🚀 セットアップ手順

### 1. **フロントエンドディレクトリに移動**
```bash
cd /home/syuhei0519/work/runote/frontend
```

### 2. **依存関係のインストール**
```bash
npm install
```

これにより、以下のテストライブラリがインストールされます：
- `@vue/test-utils` - Vue コンポーネントテストユーティリティ
- `vitest` - テストランナー
- `happy-dom` - DOM環境シミュレーション
- `@testing-library/jest-dom` - DOM assertion ライブラリ

## 🏃‍♂️ テスト実行方法

### **基本的なテスト実行**

```bash
# 全テスト実行（一回だけ）
npm run test:run

# 全テスト実行（ウォッチモード）
npm run test

# 特定のファイルをテスト
npm run test ConfirmDialog.spec.ts
npm run test ToastNotification.spec.ts

# パターンマッチでテスト
npm run test components
```

### **詳細オプション**

```bash
# UI付きでテスト実行（ブラウザでテスト結果表示）
npm run test:ui

# カバレッジ付きでテスト実行
npm run test:coverage

# 特定のテストのみ実行
npm run test -- --grep "正しくレンダリング"

# 並列実行を無効化（デバッグ時）
npm run test -- --no-threads

# 詳細な出力
npm run test -- --reporter=verbose
```

## 📊 実装済みテスト

### **ConfirmDialog コンポーネント**
- ✅ 正しくレンダリングされる
- ✅ show=falseの時は表示されない
- ✅ 確認ボタンクリック時にconfirmイベントが発火
- ✅ キャンセルボタンクリック時にcancelイベントが発火
- ✅ ローディング状態では正しく表示される
- ✅ デフォルトプロパティが正しく設定される

### **ToastNotification コンポーネント**
- ✅ 成功タイプで正しく表示される
- ✅ エラータイプで正しく表示される
- ✅ 警告タイプで正しく表示される
- ✅ 情報タイプで正しく表示される
- ✅ 閉じるボタンクリック時にcloseイベントが発火
- ✅ show=falseの時は表示されない
- ✅ デフォルトプロパティが正しく設定される
- ✅ descriptionが空の場合は表示されない

## 🎯 テスト結果の見方

### **成功時の出力例**
```
✓ src/components/__tests__/ConfirmDialog.spec.ts (6)
  ✓ 正しくレンダリングされる
  ✓ show=falseの時は表示されない
  ✓ 確認ボタンクリック時にconfirmイベントが発火される
  ✓ キャンセルボタンクリック時にcancelイベントが発火される
  ✓ ローディング状態では正しく表示される
  ✓ デフォルトプロパティが正しく設定される

✓ src/components/__tests__/ToastNotification.spec.ts (8)
  ✓ 成功タイプで正しく表示される
  ✓ エラータイプで正しく表示される
  ✓ 警告タイプで正しく表示される
  ✓ 情報タイプで正しく表示される
  ✓ 閉じるボタンクリック時にcloseイベントが発火される
  ✓ show=falseの時は表示されない
  ✓ デフォルトプロパティが正しく設定される
  ✓ descriptionが空の場合は表示されない

Test Files  2 passed (2)
Tests       14 passed (14)
Start at    10:30:25
Duration    1.23s (transform 45ms, setup 12ms, collect 234ms, tests 156ms, environment 0ms, prepare 89ms)
```

### **失敗時の出力例**
```
⚠ src/components/__tests__/ConfirmDialog.spec.ts (1)
  × 正しくレンダリングされる
    AssertionError: expected 'テストタイトル' to be 'テスト確認'
    ❯ src/components/__tests__/ConfirmDialog.spec.ts:20:50
      18|     })
      19|
      20|     expect(wrapper.find('h3').text()).toBe('テスト確認')
        |                                      ^
      21|     expect(wrapper.text()).toContain('これはテストメッセージです')
```

## 📈 カバレッジレポート

### **カバレッジの確認**
```bash
npm run test:coverage
```

### **カバレッジレポートの例**
```
 % Coverage report from c8
--------------------------------------|---------|----------|---------|---------|-------------------
File                                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------------------------|---------|----------|---------|---------|-------------------
All files                             |   95.65 |    88.89 |     100 |   95.65 |
 src/components                        |   95.65 |    88.89 |     100 |   95.65 |
  ConfirmDialog.vue                    |     100 |      100 |     100 |     100 |
  ToastNotification.vue                |   91.30 |    77.78 |     100 |   91.30 | 45,67
--------------------------------------|---------|----------|---------|---------|-------------------
```

## 🔧 デバッグとトラブルシューティング

### **よくある問題と解決方法**

#### **1. モジュールが見つからないエラー**
```bash
Error: Cannot resolve dependency
```
**解決方法:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### **2. TypeScriptエラー**
```bash
TS2307: Cannot find module '@/components/ConfirmDialog.vue'
```
**解決方法:** `vitest.config.ts`のaliasが正しく設定されているか確認

#### **3. DOM要素が見つからない**
```bash
Cannot find element with selector 'button'
```
**解決方法:** コンポーネントが正しくマウントされているか、セレクタが正しいか確認

### **デバッグ方法**

```typescript
it('デバッグテスト', () => {
  const wrapper = mount(ConfirmDialog, { props: defaultProps })
  
  // HTMLを出力してデバッグ
  console.log(wrapper.html())
  
  // 見つかった要素を確認
  console.log(wrapper.findAll('button').length)
})
```

## 🚀 新しいテストの追加

### **1. テストファイルの作成**
```bash
# コンポーネントテスト
touch src/components/__tests__/NewComponent.spec.ts

# ページテスト
touch src/pages/__tests__/NewPage.spec.ts
```

### **2. テストテンプレート**
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NewComponent from '../NewComponent.vue'

describe('NewComponent', () => {
  it('正しくレンダリングされる', () => {
    const wrapper = mount(NewComponent, {
      props: {
        // 必要なpropsを設定
      }
    })

    expect(wrapper.text()).toContain('期待するテキスト')
  })
})
```

## 🎯 テストのベストプラクティス

### **1. AAA パターンの使用**
```typescript
it('ボタンクリック時に正しく動作する', async () => {
  // Arrange（準備）
  const wrapper = mount(Component, { props: testProps })
  
  // Act（実行）
  await wrapper.find('button').trigger('click')
  
  // Assert（検証）
  expect(wrapper.emitted('click')).toBeTruthy()
})
```

### **2. わかりやすいテスト名**
- ❌ `it('works', () => { ... })`
- ✅ `it('ユーザーがボタンをクリックしたときにモーダルが開く', () => { ... })`

### **3. 1テスト1検証**
```typescript
// ❌ 複数の検証を1つのテストに含める
it('コンポーネントが正しく動作する', () => {
  expect(wrapper.find('h1').exists()).toBe(true)
  expect(wrapper.find('button').exists()).toBe(true)
  expect(wrapper.props().title).toBe('テスト')
})

// ✅ 検証項目ごとにテストを分ける
it('タイトルが表示される', () => {
  expect(wrapper.find('h1').exists()).toBe(true)
})

it('ボタンが表示される', () => {
  expect(wrapper.find('button').exists()).toBe(true)
})
```

### **4. エッジケースのテスト**
- 空の値
- 最大値・最小値
- null/undefined
- 無効な値

## 📝 継続的テスト

### **1. プリコミットフック**
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:run"
    }
  }
}
```

### **2. CI/CD統合**
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:run
      - run: npm run test:coverage
```

## 🎉 まとめ

このテスト環境により、以下のメリットが得られます：

✅ **品質保証**: コンポーネントの動作を自動的に検証
✅ **リファクタリング安全性**: 変更時の影響を早期発見
✅ **ドキュメント**: テストが仕様書として機能
✅ **開発効率**: バグの早期発見と修正
✅ **チーム開発**: 一貫した品質基準

継続的にテストを実行し、高品質なコンポーネントを維持していきましょう！
