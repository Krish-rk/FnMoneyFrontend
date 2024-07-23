import {Link} from 'react-router-dom'
import './index.css'

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/assessments">Assessments</Link>
      </nav>
      <div className="about-us">
        <h1>About Us</h1>
        <p>This is the About Us section.</p>
      </div>
    </div>
  )
}

export default Home
