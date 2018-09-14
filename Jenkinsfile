node('master') {
    stage('Checkout'){
        checkout scm
    }

    stage('Test'){
       print "Environment will be : ${env.NODE_ENV}"
       sh 'node -v'
     }
}
