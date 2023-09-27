import { Link } from 'react-router-dom'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createDescription, stripHTML } from '/src/util/StringUtils.js'
import './BlogItem.css'
import { useMediaQuery } from 'react-responsive'


export default function BlogItem({ title, summary, thumbnail, index, id }) {
	const isSmallScreen = useMediaQuery({ query: '(max-width: 991.98px)' })
	return (
		<>
			<CCol xs>
				<CCard
					style={{
						borderRadius: '2rem',
						left: isSmallScreen ? '0%' : index % 2 === 0 ? '20%' : '-20%',
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
