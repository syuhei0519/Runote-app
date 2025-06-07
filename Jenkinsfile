pipeline {
    agent any

    environment {
        APP_DIR = '/workspace'
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
                    echo "🔧 Fixing permissions in Jenkins workspace..."
                    find /var/jenkins_home/workspace -type f ! -writable -exec chmod u+w {} + || true
                    find /var/jenkins_home/workspace -type d ! -writable -exec chmod u+w {} + || true
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
                sh '''
                    mkdir -p backend/storage/framework/{cache,sessions,testing,views}
                    mkdir -p backend/bootstrap/cache
                    chmod -R 777 backend/storage backend/bootstrap/cache
                '''
            }
        }

        stage('Backend Test') {
            steps {
                dir("${APP_DIR}/backend") {
                    sh 'composer install'
                    sh 'php artisan test'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir("${APP_DIR}/frontend") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
    }
}