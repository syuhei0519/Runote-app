#!/bin/bash

# 📝 Vueコンポーネントテスト実行スクリプト

echo "🚀 Vueコンポーネントテスト環境のセットアップと実行"
echo "=============================================="

# フロントエンドディレクトリに移動
cd /home/syuhei0519/work/runote/frontend

# 依存関係をインストール（初回のみ）
echo "📦 依存関係のインストール..."
npm install

# テスト実行
echo ""
echo "🧪 テストの実行..."
echo "=================="

# 基本テスト実行
echo "1. 全テスト実行:"
npm run test:run

echo ""
echo "📊 テストカバレッジ:"
npm run test:coverage

echo ""
echo "✅ テスト完了!"
echo ""
echo "🎯 次のコマンドでテストを実行できます:"
echo ""
echo "# 全テスト実行"
echo "npm run test"
echo ""
echo "# 特定のファイルをテスト"
echo "npm run test ConfirmDialog.spec.ts"
echo ""
echo "# ウォッチモード（ファイル変更時に自動実行）"
echo "npm run test --watch"
echo ""
echo "# UI付きでテスト実行"
echo "npm run test:ui"
echo ""
echo "# カバレッジ付きでテスト実行"
echo "npm run test:coverage"
