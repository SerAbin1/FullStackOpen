import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleUpdate = async () => {
    const response = await blogService.updateLike({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    })

    setBlogs((prev) =>
      prev
        .map((blog) => (blog.id === response.id ? response : blog))
        .sort((a, b) => b.likes - a.likes),
    )
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog)
      setBlogs((prev) => prev.filter((b) => b.id != blog.id))
    }
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <br />
        likes {blog.likes} <button onClick={handleUpdate}>like</button>
        <br />
        {blog.author}
        <br />
        {console.log("blog", blog)}
        {console.log("b id", blog.user.id)}
        {console.log("u id", user.id)}
        {blog.user && blog.user.id
          ? blog.user.id === user.id && (
              <button onClick={handleDelete}>remove</button>
            )
          : blog.user === user.id && (
              <button onClick={handleDelete}>remove</button>
            )}
      </div>
    )
  }
}

export default Blog
