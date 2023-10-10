/* eslint-disable react/no-unescaped-entities */
import Input from 'src/components/input'
import SlideImage from 'src/components/slideImage'
import { Button, Checkbox, Select } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useState } from 'react'
import { AppContext } from 'src/context/app.context'
import { useMutation } from '@tanstack/react-query'
import { authApi } from 'src/api/auth.api'
import { toast } from 'react-toastify'
import { omit } from 'lodash'

const { Option } = Select

const options: {
  label: string
  value: string
  key: string
}[] = [
  {
    label: 'Vie',
    value: 'vn',
    key: 'vn'
  },
  {
    label: 'Eng',
    value: 'en',
    key: 'en'
  }
]

export interface LoginProps {}

export type FormDataLogin = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login(props: LoginProps) {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormDataLogin>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormDataLogin) => authApi.login(body)
  })

  const handleOnSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        setIsAuthenticated(true)
        setProfile(omit(data.data.user, ['organizations']))
        navigate(path.home)
      }
    })
  })

  return (
    <div className='grid grid-cols-12 p-4 min-h-screen'>
      <div className='col-span-8 hidden lg:block rounded-tl-lg rounded-bl-lg overflow-hidden'>
        <SlideImage />
      </div>
      <div className='col-span-12 lg:col-span-4 flex flex-col justify-between'>
        <div className='flex justify-end'>
          <Select onChange={(value) => console.log(value)} defaultValue='vn' style={{ width: 120 }} allowClear>
            {options.map((option) => (
              <Option key={option.key} value={option.value}>
                <div className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                    />
                  </svg>{' '}
                  {option.label}
                </div>
              </Option>
            ))}
          </Select>
        </div>
        <div className='flex flex-col gap-4 p-0 md:p-8 lg:p-6 lg:pl-10'>
          <h1 className='text-left text-4xl font-bold'>Welcome!</h1>
          <form className='mt-6 flex flex-col items-center w-full' onSubmit={handleOnSubmit}>
            <div className='flex flex-col w-full'>
              <Input
                type='text'
                placeholder='Email'
                id='floating_email'
                register={register}
                name='email'
                errors={errors.email?.message}
              />
              <Input
                type='password'
                placeholder='Password'
                id='floating_password'
                register={register}
                name='password'
                errors={errors.password?.message}
              />
            </div>
            <div className='mt-4'>
              <Checkbox>
                <span className='text-[#747474] text-base'>Remember me</span>
              </Checkbox>
            </div>
            <Button
              loading={loginMutation.isLoading}
              className='mt-12 w-full h-14 text-base'
              type='primary'
              htmlType='submit'
            >
              Sign in
            </Button>
          </form>
          <div className='h-[1px] bg-[#C2C3C7] relative mt-6 w-full'>
            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-white'>or</span>
          </div>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <div className='h-[1px] bg-[#C2C3C7] w-[80%]'></div>
          <span className='font-semibold text-lg'>Don't have an account?</span>
          <Link className='text-primary' to={path.register}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
