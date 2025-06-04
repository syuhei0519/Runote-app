FROM node:22

# 作業ディレクトリ
WORKDIR /app

# パッケージ定義ファイルを先にコピーして依存インストール
COPY package*.json ./

# 依存インストール（ローカル開発環境向け）
RUN npm install

# アプリケーション全体をコピー
COPY . .

# Vite 開発サーバーで起動（--host が HMR に必須）
CMD ["npm", "run", "dev", "--", "--host"]