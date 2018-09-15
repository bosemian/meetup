node('master') {
  
  stage('Initialize') {
    nodejs(nodeJSInstallationName: 'node') {
      sh 'npm install'
    }
  }

  stage('Cloning Git') {
      git 'https://github.com/bosemian/meetup.git'
  }
}
