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
        
        stage('Pruebas y cobertura') {
            steps {
                sh 'npm run test:cov'
            }
            post {
                always {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage',
                        reportFiles: 'index.html',
                        reportName: 'Cobertura de código'
                    ])
                }
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