import axios from 'axios'
//const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3001/api/blogs'
const blogsForUserUrl = baseUrl + '/userblogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getConfig = () => {
  return { headers: { Authorization: token } }
}

const getBlogsForUser = async () => {
  const config = getConfig()
  const response = await axios.get(`${blogsForUserUrl}`, config)
  console.log(response.data)
  return response.data
}

const create = async newObject => {
  const config = getConfig()
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updObject) => {
  const config = getConfig()
  const response = await axios.put(`${baseUrl}/${updObject.id}`, updObject, config)
  return response.data
}

const deleteBlog = async (blogToDelete) => {
  const config = getConfig()
  const response = await axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
  return response.data
}

export default { getAll, getBlogsForUser, create, deleteBlog, update, setToken }