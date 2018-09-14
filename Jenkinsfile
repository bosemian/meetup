node('master') {
    tools {nodejs “node”}
    stage('Initialize') {
        echo 'Initializing...'
        def node = tool name: 'NodeJS 8.11.3', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH = "${node}/bin:${env.PATH}"
        sh 'npm install'
    }
}
