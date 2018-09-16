node('master') {
  
  def dockerHome = tool 'docker'
  //def nodejs = tool 'node'
  
  def app
  
  env.PATH = "${dockerHome}/bin:${env.PATH}"
  
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
  
  stage('Build Image') {
     sh 'docker -v'
     sh 'docker build -t unicorn_test .'
  }
 
}
