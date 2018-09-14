node('master') {
    def nodeHome = tool name: 'node-8.11.3', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    sh "${nodeHome}/bin/node -v"
  
    stage 'Install Dependencies'
    sh(" npm install ")
}
