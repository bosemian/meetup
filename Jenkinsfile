node('master') {
  
  //def docker = tool 'docker'
  def app
  
  //env.PATH = "${docker}/bin:${env.PATH}"
  
  stage('Cloning Git') {
      git 'https://github.com/bosemian/meetup.git'
  }
  
  //stage('Install Dependencies') {
    //nodejs(nodeJSInstallationName: 'node') {
      //sh 'yarn'
      //sh 'yarn build'
    //}
  //}
  
  stage('Build Image') {
     app = docker.build('unicorn')
  }
 
}
