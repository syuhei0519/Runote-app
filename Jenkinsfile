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
                // Jenkins workspace ディレクトリ全体に chmod を適用
                sh '''
                    chmod -R u+w /var/jenkins_home/workspace || true
                    rm -rf /var/jenkins_home/workspace/setup_runote || true
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