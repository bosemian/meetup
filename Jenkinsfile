node('master') {
  
  stage('Initialize') {
    steps {
      nodejs(nodeJSInstallationName: 'node') {
          sh 'npm install'
      }
    }
  }

  stage('Cloning Git') {
    steps {
      git 'https://github.com/bosemian/meetup.git'
    }
  }
}
