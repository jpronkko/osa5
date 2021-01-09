import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  let addMockHandler
  let deleteMockHandler
  let showButton

  const blog = {
    title: 'Turre goes Hollywood',
    likes: 5,
    author: 'Tero W Alahippi',
    url: 'https://www.fi',
  }

  beforeEach(() => {
    addMockHandler = jest.fn()
    deleteMockHandler = jest.fn()

    component = render(
      <Blog blog={blog} ownedBlog={true} addLikes={addMockHandler} deleteBlog={deleteMockHandler} />
    )

    //component.debug()
    showButton = component.getByText('Show')
  })

  test('renders default content', () => {
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).not.toHaveTextContent(blog.likes.toString())
    expect(component.container).not.toHaveTextContent(blog.url)

  })

  test('renders extended content', () => {
    fireEvent.click(showButton)

    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.likes.toString())
    expect(component.container).toHaveTextContent(blog.url)
  })

  test('add likes clicked twice', () => {
    fireEvent.click(showButton)
    const addLikesButton = component.container.querySelector('#likesButton')
    //const likes = component.container.querySelector('#likesLine')
    //console.log(prettyDOM(likes))

    fireEvent.click(addLikesButton)
    fireEvent.click(addLikesButton)

    expect(addMockHandler.mock.calls).toHaveLength(2)
  })
})
