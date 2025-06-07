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
                    # 該当ディレクトリが存在する場合のみ、パーミッション修正 → 削除
                    if [ -d /var/jenkins_home/workspace/setup_runote/backend ]; then
                      chmod -R u+w /var/jenkins_home/workspace/setup_runote/backend || true
                      rm -rf /var/jenkins_home/workspace/setup_runote/backend/storage || true
                      rm -rf /var/jenkins_home/workspace/setup_runote/backend/bootstrap/cache || true
                    fi
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
                dir("${APP_DIR}/backend") {
                    sh '''
                        mkdir -p storage/app/public
                        mkdir -p storage/framework/{cache,sessions,testing,views}
                        mkdir -p storage/logs
                        mkdir -p bootstrap/cache
                        chmod -R 777 storage bootstrap/cache
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