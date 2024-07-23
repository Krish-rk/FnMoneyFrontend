import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Assessments from './components/Assessments'
import Cookies from 'js-cookie'
import './App.css'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const jwtToken = Cookies.get('jwt_token')
  return (
    <Route
      {...rest}
      render={props =>
        jwtToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/assessments" component={Assessments} />
      </Switch>
    </Router>
  )
}

export default App
