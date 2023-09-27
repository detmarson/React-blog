import { Link } from 'react-router-dom'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createDescription, stripHTML } from '/src/util/StringUtils.js'
import './BlogItem.css'

export default function BlogItem({ title, summary, thumbnail, index, id }) {
	return (
		<>
			<CCol xs>
				<CCard
					style={{
						borderRadius: '2rem',
						left: index % 2 === 0 ? '20%' : '-20%',
					}}>
					<Link to={`/posts/${id}`}>
						<CCardImage orientation="top" src={thumbnail} />
						<hr />
						<CCardBody>
							<CCardTitle>{title}</CCardTitle>
							<CCardText>{createDescription(stripHTML(summary), 100)}</CCardText>
						</CCardBody>
					</Link>
				</CCard>
			</CCol>
		</>
	)
}
