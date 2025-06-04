# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際にClaude Code (claude.ai/code)にガイダンスを提供します。

## プロジェクトアーキテクチャ

これは「runote」という名前のフルスタックWebアプリケーションで、Laravelバックエンド、Vue.jsフロントエンド、Dockerコンテナ化、Jenkins CI/CD自動化で構成されています。

### 構造
- **バックエンド**: `/backend`ディレクトリ内のLaravel 10 API、投稿管理用RESTful エンドポイントを提供
- **フロントエンド**: `/frontend`ディレクトリ内のVue 3 + Vite SPA、ユーザーインターフェースとAPI連携を担当
- **データベース**: データ永続化用MySQL 8.0データベース
- **DevOps**: ローカル開発用Docker Compose、CI/CD自動化用Jenkins

### 主要コンポーネント
- **投稿管理**: ブログ投稿のCRUD操作のコア機能
- **APIレイヤー**: 標準HTTPメソッドを使用した`/api/posts`のRESTful APIエンドポイント
- **Vue Router**: 投稿一覧、作成、詳細ページのクライアントサイドルーティング
- **Dockerサービス**: バックエンド(`runote-backend`)、フロントエンド(`runote-frontend`)、データベース(`runote-db`)の分離コンテナ

## 開発コマンド

### Docker環境
```bash
# アプリケーションスタック全体を起動
make set-up_app
# または手動で:
docker-compose up -d

# Jenkins CI環境を起動
make set-up_jenkins
```

### バックエンド (Laravel)
```bash
# バックエンドコンテナ内でコマンド実行
docker-compose exec app <command>

# テスト実行
docker-compose exec app php artisan test

# 依存関係インストール
docker-compose exec app composer install

# マイグレーション付きモデル生成
make make-model model=ModelName

# コントローラ生成
make make-controller controller=ControllerName
```

### フロントエンド (Vue.js)
```bash
# 開発サーバー (コンテナ内でポート5173で自動実行)
npm run dev

# 本番用ビルド
npm run build

# 依存関係インストール
npm install
```

### データベース
- **ホスト**: localhost:3306
- **データベース**: runote
- **ユーザー**: runote_admin
- **パスワード**: secret
- **ルートパスワード**: root

## サービスポート
- フロントエンド: http://localhost:5173
- バックエンド: http://localhost:8000
- データベース: localhost:3306

## テスト
- バックエンドテスト: `docker-compose exec app php artisan test`
- Jenkinsパイプラインには自動バックエンドテストとフロントエンドビルドが含まれます