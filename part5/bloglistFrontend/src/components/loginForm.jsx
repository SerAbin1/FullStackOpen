import { useState } from "react"
import Notification from "./Notification"

const LoginForm = ({ onLogin, errorMessage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({ username, password })
    setUsername("")
    setPassword("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <Notification message={errorMessage} />
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
