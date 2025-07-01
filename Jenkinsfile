pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-u root'
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Leninner/life_insurance_back.git'
                    ]]
                ])
            }
        }
        
        stage('Instalar dependencias') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Linting') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Formatear código') {
            steps {
                sh 'npm run format'
            }
        }
        
        stage('Compilar') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Pruebas') {
            steps {
                sh 'npm run test'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline ejecutado exitosamente'
        }
        failure {
            echo 'Pipeline falló'
        }
    }
}