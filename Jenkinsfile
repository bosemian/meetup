node('master') {
  
  stage('Cloning Git') {
      git 'https://github.com/bosemian/meetup.git'
  }
  
  stage('Install Dependencies') {
    nodejs(nodeJSInstallationName: 'node') {
      sh 'npm install'
      sh 'npm run build'
    }
  }
 
}
