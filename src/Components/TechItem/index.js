import './index.css'
import {Link} from 'react-router-dom'

const TechItem = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <Link to={`/courses/${id}`}>
      <li className="Itemcontainer">
        <img className="Imgelement" src={logoUrl} alt={name} />
        <p className="Paragraph">{name}</p>
      </li>
    </Link>
  )
}
export default TechItem
