pipeline {
  agent any
  
  stages {
    stage('Initialize') {
      steps {
        nodejs(nodeJSInstallationName: 'node') {
            sh 'npm install'
        }
      }
    }
  }
 
  stages {    
    stage('Cloning Git') {
      steps {
        git 'https://github.com/bosemian/meetup.git'
      }
    }
  }   
}
