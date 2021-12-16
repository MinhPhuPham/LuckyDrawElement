import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAHTuIgdrVNLG3UKsbrvhizeU8l_POnoe0',
  authDomain: 'mystery-shape.firebaseapp.com',
  projectId: 'mystery-shape',
  storageBucket: 'mystery-shape.appspot.com',
  messagingSenderId: '225091715204',
  appId: '1:225091715204:web:2d22af10b1591424ba82d1',
  measurementId: 'G-51N74HHHTL',
}

export default class FirebaseHepler {
  app
  analytics

  setup() {
    this.app = initializeApp(firebaseConfig)
    this.analytics = getAnalytics(this.app)
  }
}
