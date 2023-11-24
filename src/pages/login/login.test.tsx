import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import App from 'src/App'
import { vi, beforeEach, describe, expect, test } from 'vitest'
import { toast } from 'react-toastify'

beforeEach(() => {
  render(<App />, { wrapper: BrowserRouter }) // called once before all tests run
})

describe('Trang login', () => {
  test('Trang login được hiển thị', () => {
    expect(document.querySelector('#title')?.textContent).toBe('Sign in')
    // default: timeout: 1000ms, interval: 500ms
  })
  test('Trường nhập email được hiển thị', () => {
    expect(document.getElementById('floating_email')).toBeInTheDocument()
  })
  test('Trường nhập password được hiển thị', () => {
    expect(document.getElementById('floating_password')).toBeInTheDocument()
  })
  test('Checkbox remember me được hiển thị', () => {
    expect(document.getElementById('remember_me')).toBeInTheDocument()
  })
  test('Button đăng nhập được hiển thị', () => {
    expect(document.getElementById('button_submit')).toBeInTheDocument()
  })
  test('Button chuyển hướng qua trang register được hiển thị', () => {
    expect(document.getElementById('button_redirect_register')).toBeInTheDocument()
  })
  test('Không nhập email', async () => {
    const buttonSubmit = (await document.getElementById('button_submit')) as HTMLButtonElement
    const error = (await document.getElementById('email_error')) as HTMLElement
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('Email is required')
  })
  test('Trường Input email có thể nhập', async () => {
    const emailInput = (await document.getElementById('floating_email')) as HTMLInputElement
    await userEvent.type(emailInput, 'Tuyen')
    expect(emailInput.value).toBe('Tuyen')
  })
  test('Nhập đúng định dạng email', async () => {
    const emailInput = (await document.getElementById('floating_email')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_submit')) as HTMLButtonElement
    const error = (await document.getElementById('email_error')) as HTMLElement
    await userEvent.type(emailInput, 'tuyenpham@gmail.com')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('')
  })
  test('Nhập sai định dạng email', async () => {
    const emailInput = (await document.getElementById('floating_email')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_submit')) as HTMLButtonElement
    const error = (await document.getElementById('email_error')) as HTMLElement
    await userEvent.type(emailInput, 'tuyenpham.com')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('Email is invalid')
  })
  test('Không nhập pasword', async () => {
    const buttonSubmit = (await document.getElementById('button_submit')) as HTMLButtonElement
    const error = (await document.getElementById('password_error')) as HTMLElement
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('Password is required')
  })
  test('Trường Input password có thể nhập', async () => {
    const passwordInput = document.getElementById('floating_password') as HTMLInputElement
    await userEvent.type(passwordInput, 'Kiem')
    expect(passwordInput.value).toBe('Kiem')
  })
  test('Nhập đúng định dạng password', async () => {
    const passwordInput = (await document.getElementById('floating_password')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_submit')) as HTMLButtonElement
    const error = (await document.getElementById('password_error')) as HTMLElement
    // password phải từ 8 kí tự trở lên
    await userEvent.type(passwordInput, '1234567890')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('')
  })
  test('Nhập sai định dạng password', async () => {
    const passwordInput = (await document.getElementById('floating_password')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_submit')) as HTMLButtonElement
    const error = (await document.getElementById('password_error')) as HTMLElement
    await userEvent.type(passwordInput, '123456')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('Password must be at least 8 characters')
  })
  test('Click checkbox remember-me', async () => {
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
  test('Double click checkbox remember-me', async () => {
    const checkbox = screen.getByRole('checkbox')
    await userEvent.dblClick(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  test('Đăng nhập thất bại do email hoặc password không chính xác', async () => {
    const emailInput = (await document.getElementById('floating_email')) as HTMLInputElement
    const passwordInput = (await document.getElementById('floating_password')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_submit')) as HTMLButtonElement

    await userEvent.type(emailInput, 'tuye@gmail.com')
    await userEvent.type(passwordInput, '12345678')
    await userEvent.click(buttonSubmit)
    const buySpy = vi.spyOn(toast, 'error')
    toast.error('Email or password is incorrect')
    await waitFor(() => {
      expect(buySpy).toHaveBeenCalledWith('Email or password is incorrect')
    })
  })

  test('Đăng nhập thành công', async () => {
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

  test('Click button chuyển hướng qua trang register', async () => {
    const register = document.getElementById('button_redirect_register') as HTMLButtonElement
    await userEvent.click(register)
    expect(screen.queryByTitle('sign up')).toBeInTheDocument()
  })
})
