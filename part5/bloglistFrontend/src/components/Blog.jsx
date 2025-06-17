import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs }) => {
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
      </div>
    )
  }
}

export default Blog
