import { useState } from "react"




const Blog = ({blog, user}) => {
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
  <div style={blogStyle}>
    {!showInfo && <div>{blog.title} {blog.author} <button onClick={toggle}>show</button></div>
    }
    {showInfo && 
    <div>
      {blog.title}
      {blog.author}
      {blog.url}
      {blog.likes}
      <button onClick={toggle}>hide</button>
    </div>
    }
    
  </div>  
)
}

export default Blog