import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = pers => {
  const request = axios.post(baseUrl, pers)
  return request.then(response => response.data)
} 

const deletePerson = name => {
  return axios.delete(baseUrl + '/' + name)
}

export default { getAll, create, deletePerson }
