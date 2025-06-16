import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, credentials, config)
  return response.data
}

const updateLike = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

export default { getAll, create, setToken, updateLike }
