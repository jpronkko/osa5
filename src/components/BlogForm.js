import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onCreate = async (event) => {
    event.preventDefault()

    setTitle('')
    setAuthor('')
    setUrl('')
    createBlog({ title: title, author: author, url: url, likes: 0 })
  }

  return(
    <form onSubmit={onCreate}>
      <div>
        Title &nbsp;
        <input
          id='title'
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author &nbsp;
        <input
          id='author'
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url &nbsp;
        <input
          id='url'
          type='text'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='submit_blog' type='submit'>create</button>

    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm