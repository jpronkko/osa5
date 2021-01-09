import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [userBlogs, setUserBlogs] = useState([])
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()
  const messageRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      updateBlogList(blogs)
    )
  }, [])

  useEffect(() => {
    try {
      const loggedBlogAppUser = window.localStorage
        .getItem('loggedBlogAppUser')

      if(loggedBlogAppUser) {
        const user = JSON.parse(loggedBlogAppUser)
        setUser(user)
        blogService.setToken(user.token)
        blogService.getBlogsForUser().then(ownBlogs => setUserBlogs(ownBlogs))

      }
    } catch (error) {
      showMessage(error.message, true)
    }

  }, [])

  const showMessage = (text, isError) => {
    messageRef.current.show(text, isError)
  }

  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login(username, password)

      console.log('User: ', user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      showMessage('User ' + username + ' just logged in', false)

      const ownBlogs = await blogService.getBlogsForUser()
      setUserBlogs(ownBlogs)
      console.log('Own blogs; ', ownBlogs)
      setUser(user)
    } catch (error) {
      console.error('Login failed: ', error)
      if(error.response.status === 401) {
        showMessage('Wrong username or password!', error.message, true)
      } else {
        showMessage('Error in login, check your network connection!')
      }
      setUser(null)
    }
  }

  const handleLogout = () => {
    console.log('Logout!')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setUserBlogs([])
  }

  const updateBlogList = (newBlogList) => {
    setBlogs(newBlogList.sort((a, b) => b.likes - a.likes))
  }

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      updateBlogList(blogs.concat(blog))
      setUserBlogs(userBlogs.concat(blog.id))
      showMessage(`A new blog "${blog.title}" by ${blog.author} added`, false)
    } catch (error) {
      showMessage(error.message, true)
    }
  }

  const addLikes = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await blogService.update(updatedBlog)
      updateBlogList(blogs.map(x => x.id === updatedBlog.id ? updatedBlog : x))
      showMessage(`Blog ${updatedBlog.title} liked.`)
    } catch (error) {
      showMessage(error.message, true)
    }
  }

  const deleteBlog = async (blog) => {
    if(!window.confirm(`Do you really want to delete blog ${blog.title}?`))
      return

    try {
      await blogService.deleteBlog(blog)
      updateBlogList(blogs.filter(x => x.id !== blog.id))
      setUserBlogs(userBlogs.filter(x => x !== blog.id))
    } catch (error) {
      showMessage(error.message, true)
    }
  }

  const loginForm = () => {
    return (
      <LoginForm handleLogin={handleLogin}/>
    )
  }

  const isMyBlog = (blog) => {
    return userBlogs.includes(blog.id)
  }

  const showBlogs = () => {
    return (
      <div>
        <p>{user.name} aka {user.username} has logged in.
          <button type="button" onClick={handleLogout}>Logout</button> </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <h2>All blogs</h2>
        <div id='blog-list'>
          {
            blogs.map(blog =>
              <Blog key={blog.id} ownedBlog={isMyBlog(blog)} blog={blog} addLikes={addLikes} deleteBlog={deleteBlog}/>)
          }
        </div>
      </div>
    )
  }


  return (
    <div>
      <h1>Blog App</h1>
      <Notification ref={messageRef}/>
      {user === null ? loginForm() : showBlogs()}
    </div>
  )
}

export default App
