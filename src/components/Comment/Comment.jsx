import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useState } from 'react'
import { CFormTextarea, CForm, CButton } from '@coreui/react'
import './Comment.css'

export default function CreateComment() {
	const [text, setText] = useState('')
	const commentsRef = collection(db, 'comments')
	const newComment = async () => {
		await addDoc(commentsRef, {
			author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
			text,
		})
		setText('')
	}
	const isInputEmpty = text.trim() === ''
	return (
		<>
			<div className="createComment">
				<CForm>
					<CFormTextarea
						onChange={e => setText(e.target.value)}
						value={text}
						placeholder="Leave a comment here"
						floatingLabel="Dodaj Komentarz"
						style={{ height: '100px' }}></CFormTextarea>
					<CButton onClick={newComment} color="secondary" disabled={isInputEmpty}>
						Skomentuj
					</CButton>
				</CForm>
			</div>
		</>
	)
}
