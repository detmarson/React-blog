import React from 'react'
import { useEffect, useState } from 'react'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { CCallout } from '@coreui/react'
import { db } from '../../config/firebase'
import './Comments.css'

export default function Comments() {
	const [postLists, setPostList] = useState([])
	const postsCollectionRef = collection(db, 'comments')

	useEffect(() => {
		const updateComments = snapshot => {
			const comments = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
			setPostList(comments)
		}
		const unsubscribe = onSnapshot(query(postsCollectionRef, orderBy('text', 'asc')), updateComments)
		return () => unsubscribe()
	}, [])
	return (
		<div>
			{postLists.map(comment => (
				<div key={comment.id} className="comment">
					<CCallout>
						<h3 className="comment-author">{comment.author.name}</h3>
						<p className="comment-text">{comment.text}</p>
					</CCallout>
				</div>
			))}
		</div>
	)
}
