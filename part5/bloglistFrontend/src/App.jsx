import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/loginForm"
import Notification from "./components/Notification"
import CreateBlog from "./components/CreateBlog"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      setErrorMessage("wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    setUser(null)
  }

  const handleCreation = async ({ author, url, title }) => {
    try {
      const response = await blogService.create({ author, url, title })
      setBlogs(blogs.concat(response))
    } catch (exception) {
      setErrorMessage("Failed blog creation")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <Notification error={errorMessage} />

      {!user && <LoginForm onLogin={handleLogin} />}

      {user && (
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      )}

      {user && <CreateBlog handleCreation={handleCreation} />}

      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default App
