import {useState} from 'react'
import './index.css'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isError, setIsError] = useState(false)

  const onSubmit = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl =
      'https://react-form-intern-production.up.railway.app/register'

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
        window.location.replace('/login')
      } else {
        setErrorMsg(data.error_msg)
        setIsError(true)
      }
    } catch (error) {
      setErrorMsg('Something went wrong')
      setIsError(true)
    }
  }

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h1 className="register-text">Register</h1>
        <form className="register-form" onSubmit={onSubmit}>
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
          <button type="submit">Register</button>
          {isError && <p className="error-msg">*{errorMsg}</p>}
        </form>
        <a href="/login" className="login-link">
          Already have an account? Login
        </a>
      </div>
    </div>
  )
}

export default Register
