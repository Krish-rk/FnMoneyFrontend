import {Link} from 'react-router-dom'
import './index.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/assessments">Assessments</Link>
    </nav>
  )
}

export default Navbar
