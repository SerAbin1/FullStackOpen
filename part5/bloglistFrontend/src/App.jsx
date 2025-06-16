import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/loginForm"
import Notification from "./components/Notification"
import CreateBlog from "./components/CreateBlog"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

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
      setErrorMessage("wrong username or password")
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
      setErrorMessage(
        `a new blog ${response.title} by ${response.author} added`,
      )
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setErrorMessage("Failed blog creation")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      {!user && <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />}

      {user && (
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      )}

      <Togglable buttonLabel="create" ref={blogFormRef}>
        <CreateBlog handleCreation={handleCreation} />
      </Togglable>

      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default App
