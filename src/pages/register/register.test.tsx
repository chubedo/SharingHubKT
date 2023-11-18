import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import App from 'src/App'
import { vi, beforeEach, describe, expect, test } from 'vitest'

beforeEach(async () => {
  await render(<App />, { wrapper: BrowserRouter }) // called once before all tests run
  const register = document.getElementById('button_redirect_register') as HTMLButtonElement
  await userEvent.click(register)
})

describe('Trang register', () => {
  test('Trang register được hiển thị', () => {
    expect(document.querySelector('#title')?.textContent).toBe('Sign up')
    // default: timeout: 1000ms, interval: 500ms
  })
  test('Trường nhập name được hiển thị', () => {
    expect(document.getElementById('floating_name')).toBeInTheDocument()
  })
  test('Trường nhập email được hiển thị', () => {
    expect(document.getElementById('floating_email')).toBeInTheDocument()
  })
  test('Trường nhập password được hiển thị', () => {
    expect(document.getElementById('floating_password')).toBeInTheDocument()
  })
  test('Trường nhập confirm_password được hiển thị', () => {
    expect(document.getElementById('floating_CFpassword')).toBeInTheDocument()
  })
  test('Checkbox agree rule được hiển thị', () => {
    expect(document.getElementById('agree_rule')).toBeInTheDocument()
  })
  test('Button đăng ký được hiển thị', () => {
    expect(document.getElementById('button_register')).toBeInTheDocument()
  })
  test('Button chuyển hướng qua trang login được hiển thị', () => {
    expect(document.getElementById('redirect_login')).toBeInTheDocument()
  })
  test('Không nhập name', async () => {
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_name')) as HTMLElement
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('FullName is required')
  })
  test('Trường Input name có thể nhập', async () => {
    const emailInput = (await document.getElementById('floating_name')) as HTMLInputElement
    await userEvent.type(emailInput, 'Kiem')
    expect(emailInput.value).toBe('Kiem')
  })
  test('Không nhập email', async () => {
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_email')) as HTMLElement
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
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_email')) as HTMLElement
    await userEvent.type(emailInput, 'tuyenpham@gmail.com')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('')
  })
  test('Nhập sai định dạng email', async () => {
    const emailInput = (await document.getElementById('floating_email')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_email')) as HTMLElement
    await userEvent.type(emailInput, 'tuyenpham.com')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('Email is invalid')
  })
  test('Không nhập pasword', async () => {
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_password')) as HTMLElement
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
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_password')) as HTMLElement
    // password phải từ 8 kí tự trở lên
    await userEvent.type(passwordInput, '1234567890')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('')
  })
  test('Nhập sai định dạng password', async () => {
    const passwordInput = (await document.getElementById('floating_password')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_password')) as HTMLElement
    await userEvent.type(passwordInput, '123456')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('Password must be at least 8 characters')
  })
  test('Không nhập confirm_pasword', async () => {
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_cf_password')) as HTMLElement
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('Confirm password is required')
  })
  test('Trường Input confirm password có thể nhập', async () => {
    const confirmPasswordInput = document.getElementById('floating_CFpassword') as HTMLInputElement
    await userEvent.type(confirmPasswordInput, 'Long')
    expect(confirmPasswordInput.value).toBe('Long')
  })
  test('Nhập đúng định dạng password', async () => {
    const confirmPasswordInput = (await document.getElementById('floating_CFpassword')) as HTMLInputElement
    const passwordInput = (await document.getElementById('floating_password')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_cf_password')) as HTMLElement
    // confirm password phải từ 8 kí tự trở lên vvà match với password
    await userEvent.type(passwordInput, '1234567890')
    await userEvent.type(confirmPasswordInput, '1234567890')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('')
  })
  test('Nhập sai định dạng password(Không match với password)', async () => {
    const confirmPasswordInput = (await document.getElementById('floating_CFpassword')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_cf_password')) as HTMLElement
    await userEvent.type(confirmPasswordInput, '123456')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('Confirm password must be match')
  })
  test('Nhập sai định dạng password(Không đúng định dạng)', async () => {
    const confirmPasswordInput = (await document.getElementById('floating_CFpassword')) as HTMLInputElement
    const passwordInput = (await document.getElementById('floating_password')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const error = (await document.getElementById('error_cf_password')) as HTMLElement
    // confirm password phải từ 8 kí tự trở lên vvà match với password
    await userEvent.type(passwordInput, '12345')
    await userEvent.type(confirmPasswordInput, '12345')
    await userEvent.click(buttonSubmit)
    expect(error.textContent).toBe('Confirm password must be at least 8 characters')
  })
  test('Click checkbox agree rule', async () => {
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
  test('Double click checkbox agree rule', async () => {
    const checkbox = screen.getByRole('checkbox')
    await userEvent.dblClick(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  test('Đăng ký thành công', async () => {
    const nameInput = (await document.getElementById('floating_name')) as HTMLInputElement
    const emailInput = (await document.getElementById('floating_email')) as HTMLInputElement
    const passwordInput = (await document.getElementById('floating_password')) as HTMLInputElement
    const confirmPasswordInput = (await document.getElementById('floating_CFpassword')) as HTMLInputElement
    const buttonSubmit = (await document.getElementById('button_register')) as HTMLButtonElement
    const checkbox = screen.getByRole('checkbox')

    await userEvent.type(nameInput, 'tuyen')
    await userEvent.type(emailInput, 'tuyen1233345566778@gmail.com')
    await userEvent.type(passwordInput, '12345678')
    await userEvent.type(confirmPasswordInput, '12345678')
    await userEvent.click(checkbox)
    await userEvent.click(buttonSubmit)
  })

  // test('Click button chuyển hướng qua trang register', async () => {
  //   const register = document.getElementById('button_redirect_register') as HTMLButtonElement
  //   await userEvent.click(register)
  //   expect(screen.queryByTitle('sign up')).toBeInTheDocument()
  // })
})
