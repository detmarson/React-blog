import React, { useEffect, useState } from 'react'
import { getDocs, collection, query, orderBy } from 'firebase/firestore'
import { db } from '../../config/firebase'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CContainer, CRow } from '@coreui/react'
import './Home.css'
import BlogItem from '../../components/BlogItem/BlogItem'
import { useMediaQuery } from 'react-responsive'

function Home({ isAuth }) {
	const [postLists, setPostList] = useState([])
	const postsCollectionRef = collection(db, 'posts')
	const isBigScreen = useMediaQuery({ query: '(min-width: 991.98px)' })

	useEffect(() => {
		const getPosts = async () => {
			const data = await getDocs(query(postsCollectionRef, orderBy('title', 'asc')))
			setPostList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
		}

		getPosts()
	}, [])

	return (
		<div className="home">
			<div className="header">
				<div className="header__text">
					<h1>7 dni na Korfu</h1>
					<p>
						2023 <i className="fa-regular fa-paper-plane"></i>
					</p>
				</div>
			</div>
			<hr />
			<CContainer>
				<CRow xs={{ cols: 1 }}>
					{postLists.map((post, index) => {
						return (
							<>
								<BlogItem
									title={post.title}
									id={post.id}
									image={post.image}
									thumbnail={post.thumbnail}
									summary={post.summary}
									index={index}
									date={post.date}
								/>
							</>
						)
					})}
				</CRow>
				{isBigScreen && (
					<svg xmlns="http://www.w3.org/2000/svg" width="3.55556in" height="17.9861in" viewBox="0 0 256 1295">
						<path
							stroke-dasharray="4"
							fill="none"
							stroke="black"
							stroke-width="2"
							d="M 206.00,141.00
						C 206.00,141.00 23.00,220.00 66.00,326.00
						109.00,432.00 264.00,427.00 197.00,506.00
						130.00,585.00 17.00,647.00 75.00,688.00
						133.00,729.00 241.00,838.00 202.00,860.00
						163.00,882.00 29.00,1004.00 71.00,1030.00
						113.00,1056.00 248.00,1155.00 205.00,1193.00"
						/>
					</svg>
				)}
			</CContainer>
		</div>
	)
}

export default Home
