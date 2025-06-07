pipeline {
  agent any

  environment {
    APP_DIR = "${WORKSPACE}"
    BACKEND_DIR = "${WORKSPACE}/backend"
    FRONTEND_DIR = "${WORKSPACE}/frontend"
  }

  stages {
    stage('Clean Workspace') {
      steps {
        cleanWs()
      }
    }

    stage('Fix Permissions Before Checkout') {
      steps {
        sh '''
          echo "🔧 Fixing permissions in workspace..."
          find "$WORKSPACE" -type f ! -writable -exec chmod u+w {} +
          find "$WORKSPACE" -type d ! -writable -exec chmod u+w {} +
        '''
      }
    }

    stage('Checkout') {
      steps {
        dir("${APP_DIR}") {
          checkout scm
        }
      }
    }

    stage('Prepare Laravel Directories') {
      steps {
        dir("${BACKEND_DIR}") {
          sh '''
            echo "📁 Ensure storage and cache directories exist..."
            mkdir -p storage/app/public
            mkdir -p storage/framework/cache/data
            mkdir -p storage/framework/sessions
            mkdir -p storage/framework/testing
            mkdir -p storage/framework/views
            mkdir -p storage/logs

            echo "🔐 Fix permissions for storage and bootstrap/cache"
            chmod -R 775 storage bootstrap/cache || true
          '''
        }
      }
    }

    stage('Backend Test') {
      steps {
        dir("${BACKEND_DIR}") {
          sh '''
            echo "🧪 Running Laravel backend tests..."
            docker-compose exec backend php artisan test
          '''
        }
      }
    }

    stage('Frontend Build') {
      steps {
        dir("${FRONTEND_DIR}") {
          sh '''
            echo "🌐 Building frontend (Vue.js)..."
            npm ci
            npm run build
          '''
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}
