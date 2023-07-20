import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles.css';
import Alert from '@mui/material/Alert';
import LoginForm from './components/loginForm';
import Togglable from './components/togglable';
import BlogForm from './components/blogForm';



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [successVisible, setSuccessVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)


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

  const addLike = async (id, blog) => {
    const res = await blogService.save(id, blog)
    setBlogs(blogs
      .map(blog => blog !== res ? blog : res)
      .sort((a,b) => b.likes - a.likes)
    )
  }

  const removeBlog = async id => {
    await blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }


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


      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
          
        </Togglable>
      }
      {user && 
      <div>
      <BlogForm/> 
      <h4>logged in as {user.username}<button onClick={handleLogout}>Log out</button></h4>
      {blogs.map(blog => <Blog 
      key={blog.id} 
      blog={blog} 
      user={user.username} 
      addLike={addLike}
      removeBlog={removeBlog}
      />)}
      </div>
      }
      <div>
      </div>

    </div>
  )
}

export default App