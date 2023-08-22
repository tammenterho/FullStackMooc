import React, { useState } from "react";
import Blog from "../components/Blog";
import blogService from "../services/blogs";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const BlogForm = ({ setBlogs, blogs }) => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleCreate = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };
    try {
      const returnedBlog = await blogService.create(blogObject); // Muutettu await
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog("");
      setSuccessVisible(true);
      setTimeout(() => {
        setSuccessVisible(false);
      }, 5000);
    } catch (error) {
      console.log("Error creating blog:", error);
    }
  };

  // const [blogs, setBlogs] = useState([]);

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreate} className="newBlogForm">
        Title:
        <input
          type="title"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        ></input>
        Author
        <input
          type="author"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        ></input>
        URL
        <input
          type="url"
          value={newBlog.url}
          name="url"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        ></input>
        <button type="submit">create</button>
      </form>
      <div className="alert">
        {successVisible && (
          <Alert severity="success">New blog added successfully!</Alert>
        )}
      </div>
    </div>
  );
};

export default BlogForm;
