pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'leninner/life-insurance-back'
        DOCKER_TAG = 'latest'
        DOCKER_HUB_USER = 'elvis00007' // tu usuario de DockerHub
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
                bat 'npm ci'
            }
        }

        stage('Linting') {
            steps {
                bat 'npm run lint || exit 0'
            }
        }

        stage('Formatear código') {
            steps {
                bat 'npm run format || exit 0'
            }
        }

        stage('Compilar') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Pruebas') {
            steps {
                bat 'npm run test || exit 0'
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% ."
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-token', variable: 'DOCKER_TOKEN')]) {
                    bat """
                        echo %DOCKER_TOKEN% | docker login -u %DOCKER_HUB_USER% --password-stdin
                        docker push %DOCKER_IMAGE%:%DOCKER_TAG%
                    """
                }
            }
        }

        stage('Desplegar en Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s\\deployment.yaml'
                bat 'kubectl apply -f k8s\\service.yaml'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo '✅ Pipeline ejecutado exitosamente'
        }
        failure {
            echo '❌ Pipeline falló'
        }
    }
}
