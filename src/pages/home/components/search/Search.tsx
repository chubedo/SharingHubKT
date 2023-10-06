/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button, Form, Modal, Input, Select } from 'antd'
import imageCampaign from 'src/assets/img/campaigns.png'

const { Option } = Select

export interface SearchProps {}

export default function Search(props: SearchProps) {
  const [isModalSearchOpen, setIsModalSearchOpen] = useState<boolean>(false)
  const [data, setData] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const showModalSearch = () => {
    setIsModalSearchOpen(true)
  }

  const onCloseModalSearch = () => {
    setIsModalSearchOpen(false)
  }

  const onFinish = (value: any) => {
    setLoading(true)
    setTimeout(() => {
      setData(true)
      setLoading(false)
    }, 2000)
  }

  return (
    <div>
      <Button
        className='absolute top-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-10 w-[600px] p-7 rounded-xl'
        type='primary'
        onClick={showModalSearch}
      >
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
            d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
          />
        </svg>
        <span className='text-lg'>Search</span>
      </Button>
      <Modal
        className='bg-white top-8 !w-[1000px] !py-0 rounded-2xl overflow-hidden'
        open={isModalSearchOpen}
        onCancel={onCloseModalSearch}
        footer={null}
      >
        <div className='min-h-[80vh]'>
          <Form
            form={form}
            name='basic'
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            autoComplete='off'
            className='w-full p-4'
          >
            <Form.Item
              name='campaigns'
              rules={[
                {
                  required: true,
                  message: 'Please input your campaigns!'
                }
              ]}
              className='mb-4 w-full'
            >
              <Input placeholder='Enter organization and project name' className='p-4 text-base w-full rounded-xl' />
            </Form.Item>

            <div className='flex gap-2'>
              <Form.Item
                name='city'
                rules={[
                  {
                    required: true,
                    message: 'Please select your city!'
                  }
                ]}
                className='mb-0 w-full'
              >
                <Select placeholder='City' size='large'>
                  <Option value='1'>1</Option>
                  <Option value='2'>2</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='district'
                rules={[
                  {
                    required: true,
                    message: 'Please select your district!'
                  }
                ]}
                className='mb-0 w-full'
              >
                <Select placeholder='District' size='large'>
                  <Option value='1'>1</Option>
                  <Option value='2'>2</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='ward'
                rules={[
                  {
                    required: true,
                    message: 'Please select your ward!'
                  }
                ]}
                className='mb-0 w-full'
              >
                <Select placeholder='Ward' size='large'>
                  <Option value='1'>1</Option>
                  <Option value='2'>2</Option>
                </Select>
              </Form.Item>
            </div>
            <Button
              className='w-full flex justify-center items-center gap-2 p-7 mt-6 rounded-xl'
              htmlType='submit'
              type='primary'
              onClick={showModalSearch}
              loading={loading}
            >
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
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
              <span className='text-lg'>Search</span>
            </Button>
          </Form>
          <div>
            {!data ? (
              <p className='text-center text-[#C2C3C7] text-2xl mt-24'>Some text like Enter keyword to Search</p>
            ) : (
              <ul className='flex flex-col gap-6 overflow-y-scroll max-h-[60vh] no-scrollbar'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <li key={index}>
                      <div className='p-4 bg-[#F5F5F6] rounded-lg cursor-pointer'>
                        <div className='flex gap-8'>
                          <img
                            src={imageCampaign}
                            alt='img'
                            className='w-48 h-48 object-cover object-center rounded-lg'
                          />
                          <div className='flex flex-col gap-4 text-base'>
                            <h2 className='font-bold text-2xl text-[#3F3F3F]'>Xuân yêu thương</h2>
                            <span className='text-green-500'>Đang diễn ra</span>
                            <div className='flex gap-1 text-[#3F3F3F]'>
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
                                  d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                                />
                              </svg>
                              <p>193 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
                            </div>
                            <div className='flex gap-1 text-[#3F3F3F]'>
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
                                  d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
                                />
                              </svg>
                              <p>Trường Đại học Bách Khoa - Đại học Đè Nẵng</p>
                            </div>
                          </div>
                        </div>
                        <p className='text-[#747474] text-sm font-normal mt-4'>
                          Chiến dịch này nhằm mục tiêu hỗ trợ giáo dục cho trẻ em ở vùng nông thôn, nơi họ gặp nhiều khó
                          khăn trong việc tiếp cận giáo dục chất lượng. Chúng tôi cung cấp sách giáo trình, máy tính, và
                          lớp học ngoại khóa để giúp trẻ em có cơ hội học tốt hơn.
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
