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

        stage('Clean Laravel Cache') {
            steps {
                sh '''
                    rm -rf backend/storage/*
                    rm -rf backend/bootstrap/cache/*
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

        // stage('Docker Build') {
        //     steps {
        //         dir("${APP_DIR}") {
        //             sh 'docker build -t runote:ci .'
        //         }
        //     }
        // }
    }
}