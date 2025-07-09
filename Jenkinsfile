pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Instalar dependencias') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Lint') {
            steps {
                bat 'npm run lint'
            }
        }
        stage('Format') {
            steps {
                bat 'npm run format'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Test') {
            steps {
                bat 'npm run test'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
