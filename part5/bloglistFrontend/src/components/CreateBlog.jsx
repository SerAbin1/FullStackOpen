import { useState } from "react"

const CreateBlog = ({ handleCreation }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleCreation({ title, author, url })
    setUrl("")
    setAuthor("")
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="name"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="name"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="name"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlog
