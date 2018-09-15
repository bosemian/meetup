node('master') {
  
  stage('Initialize') {
      echo 'Initializing...'
      def node = tool name: 'Node-8.12', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
      env.PATH = "${node}/bin:${env.PATH}"
  }

  stage('Checkout') {
      echo 'Getting source code...'
      checkout scm
  }

  stage('Build') {
      echo 'Building dependencies...'
      sh 'npm i'
  }
 
}
