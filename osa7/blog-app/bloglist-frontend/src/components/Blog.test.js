import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

// Tämä auttaa ryhmittelemään testit yhteen ja selkeyttämään testiraportteja.
describe('Blog tests', () => {
  let container // alustetaan container
  const mockHandler = jest.fn() // auttaa seuraamaan jotain

  const blog = { // käytetään testien suorittamiseen. Eli tämä on esimerkkiblogi
    title: 'TestBlog',
    author: 'Tester',
    url: 'testing@test.fi',
    likes: '20',
    user: {
      id: 1234,
      username: 'TestUser'
    }
  }
  // tehdään ennen jokaista testiä
  beforeEach(() => {
    container = render(<Blog blog={blog} addLike={mockHandler} />).container
  })

  test('renders title initially', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('TestBlog')
  })

  test('after button click, url, like and user are shown', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.blog-all')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('testing@test.fi')
    expect(div).toHaveTextContent('TestUser')
    // nämä on likes
    expect(div).toHaveTextContent('20')
  })
})