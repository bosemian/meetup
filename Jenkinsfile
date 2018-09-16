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
      sh 'docker -v'
      app = docker.build("unicorn")
  }
 
}
