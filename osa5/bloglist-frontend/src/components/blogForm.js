import React, { useState } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Alert from '@mui/material/Alert';

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog('');
    });
    setSuccessVisible(true);

    setTimeout(() => {
      setSuccessVisible(false);
    }, 5000);
  };

  const [successVisible, setSuccessVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreate} className='newBlogForm'>
        Title:
        <input
          type='title'
          value={newBlog.title}
          name='Title'
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        ></input>
        Author
        <input
          type='author'
          value={newBlog.author}
          name='Author'
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        ></input>
        URL
        <input
          type='url'
          value={newBlog.url}
          name='url'
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        ></input>

        <button type='submit'>create</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogForm;
