import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import DetailContent from './pages/DetailContent/DetailContent.jsx'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, provider } from './config/firebase.js'
import './App.css'
import { signInWithPopup } from 'firebase/auth'

function App() {
	const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))

	const signUserOut = () => {
		signOut(auth).then(() => {
			localStorage.clear()
			setIsAuth(false)
		})
	}
	const signInWithGoogle = () => {
		signInWithPopup(auth, provider).then(result => {
			localStorage.setItem('isAuth', true)
			setIsAuth(true)
		})
	}

	return (
		<Router>
			<nav>
				<Link to="/">Marcin Detlaf</Link>
				{!isAuth ? (
					<button onClick={signInWithGoogle}> Zaloguj sie</button>
				) : (
					<>
						<button onClick={signUserOut}>Wyloguj sie</button>
					</>
				)}
			</nav>

			<Routes>
				<Route path="/React-blog/" element={<Home isAuth={isAuth} />} />
				<Route path="/posts/:id" element={<DetailContent isAuth={isAuth} />} />
			</Routes>
			<Footer />
		</Router>
	)
}

export default App
