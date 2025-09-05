import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import App from '../src/App.jsx'

// mock fetch for both endpoints used by App
global.fetch = (url) => {
  if (url.includes('/api/hello')) {
    return Promise.resolve({ json: () => Promise.resolve({ message: 'Hello from FastAPI' }) })
  }
  if (url.includes('/healthz')) {
    return Promise.resolve({ json: () => Promise.resolve({ status: 'ok' }) })
  }
  return Promise.reject(new Error('unknown url'))
}

describe('App', () => {
  it('shows health and backend message', async () => {
    render(<App />)
    await waitFor(() => expect(screen.getByText(/Frontend health:/)).toBeInTheDocument())
    expect(await screen.findByText(/Backend says:/)).toBeInTheDocument()
    expect(await screen.findByText(/Hello from FastAPI/)).toBeInTheDocument()
  })
})
