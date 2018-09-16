node('master') {
  
  //def docker = tool 'docker'
  def nodejs = tool 'node'
  
  def app
  
  env.PATH = "${nodejs}/bin:${env.PATH}"
  
  stage('Cloning Git') {
      git 'https://github.com/bosemian/meetup.git'
  }
  
  stage('Install Dependencies') {
    sh 'yarn'
    sh 'yarn build'
    /*nodejs(nodeJSInstallationName: 'node') {
      sh 'yarn'
      sh 'yarn build'
    }*/
  }
  
  /*stage('Build Image') {
     app = docker.build('unicorn')
  }*/
 
}
