import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from 'src/App'
import { describe, test, expect, beforeEach } from 'vitest'
import Home from '.'
import { logScreen } from 'src/utils/testUtils'

beforeEach(async () => {
  await render(<App />, { wrapper: BrowserRouter }) // called once before all tests run
  const emailInput = (await document.getElementById('floating_email')) as HTMLInputElement
  const passwordInput = (await document.getElementById('floating_password')) as HTMLInputElement
  const buttonSubmit = (await document.getElementById('button_submit')) as HTMLButtonElement

  await userEvent.type(emailInput, 'tuyen123@gmail.com')
  await userEvent.type(passwordInput, '12345678')
  await userEvent.click(buttonSubmit)
  await waitFor(() => {
    expect(screen.queryByText('Sharing hub')).toBeInTheDocument()
  })
})

describe('Trang home', () => {
  test('Tiêu đề (tên) trang web được hiển thị đúng', () => {
    expect(screen.queryByText('Sharing hub')).toBeInTheDocument()
  })

  test('Thanh tùy chọn bên phải màn hình được hiển thị', () => {
    expect(document.getElementById('side-bar')).toBeInTheDocument()
  })
  // test('Thanh search bên trên màn hình được hiển thị', async () => {
  //   await logScreen()
  //   expect(document.getElementById('search-campaigns')).toBeInTheDocument()
  // })
})
