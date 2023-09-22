import Input from 'src/components/input'
import SlideImage from 'src/components/slideImage'
import { Button, Select } from 'antd'

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

export default function Login(props: LoginProps) {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-8 hidden lg:block'>
        <SlideImage />
      </div>
      <div className='col-span-12 lg:col-span-4 p-4'>
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
        <div className='flex flex-col items-center gap-4'>
          <h1>Login</h1>
          <form className='mt-6 flex flex-col items-center gap-8'>
            <div className='flex flex-col gap-4'>
              <Input type='text' placeholder='Email' id='floating_email' />
              <Input type='password' placeholder='Password' id='floating_password' />
            </div>
            <Button type='primary'>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
