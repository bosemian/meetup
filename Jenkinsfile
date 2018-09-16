node('master') {
  
  def dockerHome = tool 'docker'
  def app
  
  env.PATH = "${dockerHome}/bin:${env.PATH}"
  
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
    withCredentials([usernamePassword(credentialsId: 'siwanon', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
    }
    app = docker.build('unicorn')
  }
 
}
