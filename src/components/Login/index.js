import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isError, setIsError] = useState(false)

  const onSubmit = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://react-form-intern-production.up.railway.app/login'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        window.location.replace('/')
      } else {
        setErrorMsg(data.error_msg)
        setIsError(true)
      }
    } catch (error) {
      setErrorMsg('Something went wrong')
      setIsError(true)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-text">Login</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {isError && <p className="error-msg">*{errorMsg}</p>}
        </form>
        <a href="/register" className="signup-link">
          Don&apos;t have an account? Sign up
        </a>
      </div>
    </div>
  )
}

export default Login
