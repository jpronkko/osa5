import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  let title
  let author
  let url
  let createMockHandler
  let showMockHandler
  let form

  const testTitle = 'Salainen maa'
  const testAuthor = 'Tiemestari Ö'
  const testUrl = 'https://www.helsinki.fi'

  beforeEach(() => {
    createMockHandler = jest.fn()
    showMockHandler = jest.fn()
    component = render(
      <BlogForm createBlog={createMockHandler}
        showMessage={showMockHandler} />
    )
    title = component.container.querySelector('#title')
    author = component.container.querySelector('#author')
    url = component.container.querySelector('#url')

    form = component.container.querySelector('form')
  })

  test('correct create func call', () => {

    fireEvent.change(title,  { target: { value: testTitle } })
    fireEvent.change(author, { target: { value: testAuthor } })
    fireEvent.change(url, { target: { value: testUrl } })
    fireEvent.submit(form)

    //console.log('Mock calls: ', createMockHandler.mock.calls)
    //console.log(createMockHandler.mock.calls[0][0].title)
    expect(createMockHandler.mock.calls[0][0].title).toBe(testTitle)
    expect(createMockHandler.mock.calls[0][0].author).toBe(testAuthor)
    expect(createMockHandler.mock.calls[0][0].url).toBe(testUrl)
  })
})