import { useState } from "react"
import '../styles.css';
import blogService from '../services/blogs'




const Blog = ({ blog, user, addLike }) => {
  const [showInfo, setShowInfo] = useState(false)
 

  

  console.log(user, "tässä user")
  const toggle = () => {
    setShowInfo(!showInfo)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes += 1
    }
    addLike(blog.id, updatedBlog)
  }
  

  return (
    <div style={blogStyle} className="blogInfo">
      {!showInfo && <div>{blog.title} <button onClick={toggle}>show</button></div>
      }
      {showInfo &&
        <div>
          <p>{blog.title}</p>
          <p>{blog.author}</p>
          <p> <a
            href={blog.url}
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog.url}
          </a></p>
          <p>{blog.likes}<button onClick={handleLike}>like</button></p> 
          <button onClick={toggle}>hide</button>
        </div>
      }

    </div>
  )
}

export default Blog