import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, ownedBlog, addLikes, deleteBlog }) => {
  const [isMaximized, setMaximized] = useState(false)

  const blogStyle = {
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    margin: 2,
  }

  const ownBlogStyle = {
    backgroundColor: 'yellow',
    borderStyle: 'solid',
    borderColor: 'blue',
    borderWidth: 5,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    margin: 2,
  }

  const toggleMaximized = () => {
    setMaximized(!isMaximized)
  }

  const showMinimized = ()  => {
    return (
      <div className='blog-entry' style={ownedBlog ? ownBlogStyle : blogStyle}>
        {blog.title}, {blog.author} &nbsp;
        <button className='maxBtn' id='maximize' onClick={toggleMaximized}>Show</button>
      </div>

    )
  }

  const showMaxmimized = () => {
    return (
      <div className='blog-entry-expanded' style={ownedBlog ? ownBlogStyle : blogStyle}>
        <p>Title: {blog.title} &nbsp;
          <button id='minimize' onClick={toggleMaximized}>Hide</button></p>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p className ='likesLine'>Likes: {blog.likes} &nbsp;
          <button id='likesButton' onClick={() => addLikes(blog)}>Add</button></p>
        {ownedBlog ?
          <p><button id='deleteButton' onClick={() => deleteBlog(blog)}>Delete</button></p> :
          null}
      </div>
    )
  }

  return (
    <>
      {isMaximized ? showMaxmimized() : showMinimized() }
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  ownedBlog: PropTypes.bool.isRequired,
  addLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
