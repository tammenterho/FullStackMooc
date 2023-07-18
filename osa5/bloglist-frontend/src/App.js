import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles.css';
import Alert from '@mui/material/Alert';



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successVisible, setSuccessVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      // istunto ei keskeydy vaikka uudelleenladataan sivu
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      // tällä voit kirjautua ulos: window.localStorage.removeItem('loggedNoteappUser')

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleCreate = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })
      setSuccessVisible(true)

      setTimeout(() => {
        setSuccessVisible(false)
      }, 5000)
  }


    const blogForm = () => (
      <div>
        <p>{user.name} has logged in</p>
        <button onClick={handleLogout}>Log out</button>
        <h2>Create New</h2>
        <form onSubmit={handleCreate} className='newBlogForm'>
          Title:
          <input
            type="title"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          ></input>
          Author
          <input
            type="author"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          ></input>
          URL
          <input
            type="url"
            value={newBlog.url}
            name="url"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          ></input>

          <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />

        )}
      </div>
    )

    //kaksi eri errormessage tapaa, MUI ja pelkkä message
    return (
      <div>
        {successVisible && (
        <Alert severity="success">
          New blog added succesfully!
        </Alert>
      )}
      {errorMessage}
        <h1>Blogs</h1>
        {!user && loginForm()}
        {user && blogForm()}
      </div>
    )
  }

  export default App