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

        stage('Fix Permissions') {
            steps {
                sh 'sudo chown -R jenkins:jenkins /var/jenkins_home/workspace || true'
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
                dir("${APP_DIR}") {
                    sh '''
                        git clean -fdX backend/storage
                        git clean -fdX backend/bootstrap/cache
                        mkdir -p backend/storage/framework/{cache,sessions,testing,views}
                        mkdir -p backend/storage/logs
                        mkdir -p backend/bootstrap/cache
                        chmod -R 777 backend/storage backend/bootstrap/cache
                    '''
                }
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

        // Optional: Docker Build
        // stage('Docker Build') {
        //     steps {
        //         dir("${APP_DIR}") {
        //             sh 'docker build -t runote:ci .'
        //         }
        //     }
        // }
    }

    post {
        always {
            cleanWs()
        }
    }
}