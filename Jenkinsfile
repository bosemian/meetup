node('master') {
  
  def app
  
  stage('Cloning Git') {
      git 'https://github.com/bosemian/meetup.git'
  }
  
  stage('Install Dependencies') {
    nodejs(nodeJSInstallationName: 'node') {
      sh 'npm install'
      sh 'npm run build'
    }
  }
  
  stage('Build Image') {
      //app = docker.build("unicorn")
      //echo app
      sh 'docker -v'
  }
 
}
