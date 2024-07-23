import React, {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const Assessments = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async event => {
    event.preventDefault()
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl =
      'https://react-form-intern-production.up.railway.app/assessments'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({title, description}),
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        setMessage('Assessment submitted successfully')
        setTitle('')
        setDescription('')
      } else {
        setMessage(data.error_msg)
      }
    } catch (error) {
      setMessage('Something went wrong')
    }
  }

  return (
    <div className="assessments-container">
      <form className="assessments-form" onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  )
}

export default Assessments
