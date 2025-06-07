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

        stage('Checkout') {
            steps {
                dir("${APP_DIR}") {
                    checkout scm
                }
            }
        }

        stage('Fix Permissions') {
            steps {
                sh 'chown -R $(id -u):$(id -g) backend/storage backend/bootstrap/cache || true'
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

        // stage('Docker Build') {
        //     steps {
        //         dir("${APP_DIR}") {
        //             sh 'docker build -t runote:ci .'
        //         }
        //     }
        // }
    }
}