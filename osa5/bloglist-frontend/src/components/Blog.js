import { useState } from "react"
import '../styles.css';




const Blog = ({ blog, user }) => {
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
          <p>{blog.likes}</p>
          <button onClick={toggle}>hide</button>
        </div>
      }

    </div>
  )
}

export default Blog