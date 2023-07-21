import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog tests', () => {
  let container
  const mockHandler = jest.fn()

  const blog = {
    title: 'TestBlog',
    author: 'Tester',
    url: 'testing@test.fi',
    likes: '20',
    user: {
      id: 1234,
      username: 'TestUser'
    }
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} addLike={mockHandler} />).container
  })

  test('renders title initially', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('TestBlog')
  })
})