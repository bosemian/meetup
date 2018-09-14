node('master') {
    stage('Initialize') {
        nodejs(nodeJSInstallationName: 'Node 8.x', configId: null) {
            sh 'npm config ls'
        }
    }
}
