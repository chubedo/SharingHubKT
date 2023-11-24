/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button, Form, Modal, Input, Select } from 'antd'
import Campaigns from 'src/components/campaigns'
import useQueryParams from 'src/hooks/useQueryParams'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import noSearchCampaigns from 'src/assets/img/dataError.jpg'

const { Option } = Select

export interface SearchProps {}

export default function Search(props: SearchProps) {
  const [isModalSearchOpen, setIsModalSearchOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const queryParams = useQueryParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const showModalSearch = () => {
    setIsModalSearchOpen(true)
  }

  const onCloseModalSearch = () => {
    setIsModalSearchOpen(false)
  }

  const onFinish = (value: any) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({ name: value?.name }).toString()
    })
  }

  return (
    <div id='search-campaigns'>
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
              name='name'
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
                  <Option value='1'>Da Nang</Option>
                  <Option value='2'>Thua Thien Hue</Option>
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
                  <Option value='1'>Ngu Hanh Son</Option>
                  <Option value='2'>Thanh Khe</Option>
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
                  <Option value='1'>My Da Tay 10</Option>
                  <Option value='2'>My An</Option>
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
            {!(Object.keys(queryParams).length > 0) ? (
              <p className='text-center text-[#C2C3C7] text-2xl mt-24'>Some text like Enter keyword to Search</p>
            ) : (
              <Campaigns
                queryParams={queryParams}
                classNameWrapper='overflow-y-scroll max-h-[60vh] no-scrollbar'
                classNameImage='w-48 h48'
                noCampaigns={
                  <div className='flex items-center justify-center mt-20'>
                    <img src={noSearchCampaigns} alt='img' className='w-60 h-60 object-cover object-center' />
                  </div>
                }
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
