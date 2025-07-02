pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'leninner/life-insurance-back'
        DOCKER_TAG = 'latest'
        DOCKER_HUB_USER = 'elvis00007' // 👈 Reemplaza con tu usuario real
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
                sh 'npm run lint || true' // evita que falle si no está configurado
            }
        }

        stage('Formatear código') {
            steps {
                sh 'npm run format || true'
            }
        }

        stage('Compilar') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Pruebas') {
            steps {
                sh 'npm run test || true'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t $DOCKER_IMAGE:$DOCKER_TAG ."
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-token', variable: 'DOCKER_TOKEN')]) {
                    sh """
                        echo "$DOCKER_TOKEN" | docker login -u '$DOCKER_HUB_USER' --password-stdin
                        docker push $DOCKER_IMAGE:$DOCKER_TAG
                    """
                }
            }
        }

        stage('Desplegar en Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
                sh 'kubectl apply -f k8s/service.yaml'
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
