import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyDdA4hrJgqJlSVUXDegl7OdIxfZ2h1lMqA',
	authDomain: 'blog-576f5.firebaseapp.com',
	projectId: 'blog-576f5',
	storageBucket: 'blog-576f5.appspot.com',
	messagingSenderId: '990148582167',
	appId: '1:990148582167:web:376cd3fa7bc2a52998f552',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
