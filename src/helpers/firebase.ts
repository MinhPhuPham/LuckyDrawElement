import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAHTuIgdrVNLG3UKsbrvhizeU8l_POnoe0',
  authDomain: 'mystery-shape.firebaseapp.com',
  projectId: 'mystery-shape',
  storageBucket: 'mystery-shape.appspot.com',
  messagingSenderId: '225091715204',
  appId: '1:225091715204:web:2d22af10b1591424ba82d1',
  measurementId: 'G-51N74HHHTL',
}

const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
logEvent(analytics, 'notification_received')

const database = getFirestore()

export { firebaseApp, database, analytics }
