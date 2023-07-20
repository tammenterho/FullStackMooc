import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs';


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async (blogId, updatedData) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.put(`/api/blogs/${blogId}`, updatedData, config);
    // Käsittely vastauksen jälkeen
    console.log(response.data); // Tulostaa palvelimen vastauksen datan
  } catch (error) {
    // Käsittely virheen tapauksessa
    console.error('Virhe PUT-pyynnössä:', error);
  }
};

const save = async (id, blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}



let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, updateBlog, save, remove }