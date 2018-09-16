node('master') {
  
  //def dockerHome = tool 'docker'
  def nodejs = tool 'node'
  
  def dockerid = 'siwanon'
  def dockerRepo = 'unicorn_test'
  def dockerid_siwanon = 'siwanon'
  def appName = 'unicorn_test'
  def imageTag = "${dockerid}/${dockerRepo}:${appName}.${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
  
  def app
  
  env.PATH = "${nodejs}/bin:${env.PATH}"
  
  stage('Cloning Git') {
      checkout scm
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
    app = docker.build('${imageTag}')
  }
  
  stage('Push image to registry')
    docker.withRegistry('', "${dockerid_siwanon}") {
      app.push()
    }
 
}
