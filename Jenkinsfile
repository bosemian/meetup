node('master') {
    stage('Initialize') {
        echo 'Initializing...'
        withEnv(["PATH+NODE=${tool name: 'node-5.10.1', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
            sh 'node -v'
        }
    }
}
