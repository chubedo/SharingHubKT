import { Button, Checkbox, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/input'
import SlideImage from 'src/components/slideImage'
import path from 'src/constants/path'
import { Schema, schema } from 'src/utils/rules'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { authApi } from 'src/api/auth.api'
import { omit } from 'lodash'

export interface RegisterProps {}

export type FormDataRegister = Schema
const registerSchema = schema

const initialValue: FormDataRegister = {
  agree: false,
  confirmPassword: '',
  email: '',
  fullName: '',
  password: ''
}

export default function Register(props: RegisterProps) {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
    control
  } = useForm<FormDataRegister>({
    resolver: yupResolver(registerSchema),
    defaultValues: initialValue
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormDataRegister, 'agree'>) => authApi.register(body)
  })

  const handleOnSubmit = handleSubmit((data) => {
    if (!data.agree) {
      messageApi.error('Please, I agree with Terms and Privacy')
    } else {
      registerMutation.mutate(omit(data, ['agree']), {
        onSuccess: (data) => {
          toast.success(data.data.message)
          navigate(path.login)
        }
      })
    }
  })

  return (
    <div className='grid grid-cols-12 p-4 min-h-screen'>
      {contextHolder}
      <div className='col-span-8 hidden lg:block rounded-tl-lg rounded-bl-lg overflow-hidden'>
        <SlideImage />
      </div>
      <div className='col-span-12 lg:col-span-4 flex flex-col justify-between'>
        <div></div>
        <div className='flex flex-col gap-4 p-0 md:p-8 lg:p-6 lg:pl-10'>
          <h1 className='text-center text-4xl font-bold'>Sign up</h1>
          <form className='mt-6 flex flex-col items-center w-full' onSubmit={handleOnSubmit}>
            <div className='flex flex-col w-full'>
              <Input
                type='text'
                placeholder='Full Name'
                id='floating_name'
                register={register}
                name='fullName'
                errors={errors.fullName?.message}
              />
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
                ruleMessage='At least 8 characters'
              />
              <Input
                type='password'
                placeholder='Confirm Password'
                id='floating_CFpassword'
                classNameWrapper='mt-1'
                register={register}
                name='confirmPassword'
                errors={errors.confirmPassword?.message}
              />
            </div>
            <div className='mt-4'>
              <Controller
                name='agree'
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value}>
                    <span className='text-[#747474] text-base'>
                      I agree with <span className='underline text-primary font-medium'>Terms</span> and{' '}
                      <span className='underline text-primary font-medium'>Privacy</span>
                    </span>
                  </Checkbox>
                )}
              />
            </div>
            <Button
              loading={registerMutation.isLoading}
              className='mt-12 w-full h-14 text-base'
              type='primary'
              htmlType='submit'
            >
              Sign up
            </Button>
          </form>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <div className='h-[1px] bg-[#C2C3C7] w-[80%]'></div>
          <span className='font-semibold text-lg'>Already have an account?</span>
          <Link className='text-primary' to={path.login}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
