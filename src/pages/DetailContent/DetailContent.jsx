import CreateComment from '../../components/Comment/Comment.jsx'
import Comments from '../../components/Comments/Comments.jsx'
import React, { useEffect, useState } from 'react'
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { CContainer } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams, Link } from 'react-router-dom'
import './DetailContent.css'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'

export default function DetailContent({ isAuth }) {
	const [post, setPost] = useState(null)
	const { id } = useParams()
	const [postIds, setPostIds] = useState([])

	useEffect(() => {
		const getPost = async () => {
			try {
				const postsCollectionRef = collection(db, 'posts')
				const postQuery = query(postsCollectionRef, where('id', '==', id))
				const querySnapshot = await getDocs(postQuery)

				if (querySnapshot.empty) {
					console.log('No matching documents', id)
					return
				}

				const postData = querySnapshot.docs[0].data()
				setPost({ ...postData, id: querySnapshot.docs[0].id })
			} catch (error) {
				console.error('Error fetching post data:', error)
			}
		}

		const getPostIds = async () => {
			try {
				const postsCollectionRef = collection(db, 'posts')
				const postIdsQuery = query(postsCollectionRef, orderBy('title', 'asc'))
				const querySnapshot = await getDocs(postIdsQuery)

				const ids = []
				querySnapshot.forEach(doc => {
					ids.push(doc.data().id)
				})

				setPostIds(ids)
			} catch (error) {
				console.error('Error fetching post IDs:', error)
			}
		}

		getPost()
		getPostIds()
	}, [id])

	const currentIndex = postIds.indexOf(id)

	const previousIndex = currentIndex - 1
	const nextIndex = currentIndex + 1

	return (
		<>
			{post ? (
				<div className="DetailContent">
					<img src={post.image} alt={post.title} />
					<hr className="Detail__hr" />
					<CContainer>
						<h2>{post.title}</h2>
						<p>{post.summary}</p>
					</CContainer>
				</div>
			) : (
				<p>Loading...</p>
			)}
			<CContainer>
				<div className="DetailContent__links">
					{previousIndex >= 0 && <Link to={`/posts/${postIds[previousIndex]}`}>Poprzedni Post</Link>}
					{nextIndex < postIds.length && <Link to={`/posts/${postIds[nextIndex]}`}>Nastepny Post</Link>}
				</div>
				{isAuth ? <CreateComment /> : <p>Zaloguj się, aby dodać komentarz</p>}
				<Comments />
			</CContainer>
		</>
	)
}
