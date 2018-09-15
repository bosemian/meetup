node('master') {
  
  stage('Cloning Git') {
      git 'https://github.com/bosemian/meetup.git'
  }
  
  stage('Initialize') {
    nodejs(nodeJSInstallationName: 'node') {
      sh 'npm install'
    }
  }
  
  stage('Build') {
    sh 'docker build -t .'
  }
}
