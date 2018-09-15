node('master') {
    stage('Initialize') {
        checkout scm
    }
  
    stage('Prepare') {
        git 'https://github.com/bosemian/meetup.git'
    }
  
    stage('Build') {
        sh 'docker build -t .' 
    }
}
