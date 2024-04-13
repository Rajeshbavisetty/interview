import './index.css'
import {Link} from 'react-router-dom'

const Header = () => (
  <div className="Headercontainer">
    <Link to="/">
      <img
        className="Imgelement"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </div>
)

export default Header
