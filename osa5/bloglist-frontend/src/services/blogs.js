import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs';


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create }