import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const update = async (id, newBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, newBlog)
  return res.data
}

const deleting = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const createComment = async (comment, id) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return res.data
}

const getComments = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}/comments`)
  return res.data
}

export default { getAll, create, update, deleting, createComment, getComments, setToken }