import axios from 'axios'
const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = pers => {
  const request = axios.post(baseUrl, pers)
  return request.then(response => response.data)
} 

const deletePerson = id => {
  return axios.delete(baseUrl + '/' + id)
}

const updateNum = (id, pers) => {
  const request = axios.put(baseUrl + '/' + id, pers)
  return request.then(res => res.data)
}

export default { getAll, create, deletePerson, updateNum }
