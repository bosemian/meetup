node('master') {
    stage('Initialize') {
        echo 'Initializing...'
        withEnv(["PATH+NODE=${tool name: 'node-8.11.3', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
            sh 'node -v'
        }
    }
}
