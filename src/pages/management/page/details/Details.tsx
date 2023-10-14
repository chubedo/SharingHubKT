/* eslint-disable prettier/prettier */
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import path from 'src/constants/path'
import { RegisterCampaignSchema, registerCampaignSchema } from 'src/utils/rules'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import UploadImage from 'src/components/uploadImage'
import { Button } from 'antd'
import Input from 'src/components/input'
import AddressSelect from 'src/components/addressSelect'
import { useEffect, useContext, useState } from 'react'
import { Campaign } from 'src/types/campaigns.type'
import { isUndefined, omit, omitBy } from 'lodash'
import { format, parseISO } from 'date-fns'
import { useMutation } from '@tanstack/react-query'
import { campaignsApi } from 'src/api/campaigns.api'
import { AppContext } from 'src/context/app.context'
import axios from 'axios'
import { toast } from 'react-toastify'

export interface ManagementDetailsProps {}

type FormData = RegisterCampaignSchema
const schema = registerCampaignSchema

export default function ManagementDetails(props: ManagementDetailsProps) {
  const { id } = useParams()
  const { state }: { state: Campaign } = useLocation()
  const isEdit = Boolean(id)
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<FormData>({
    defaultValues: {
      address: '',
      description: '',
      endDate: '',
      image: '',
      name: '',
      specificAddress: '',
      startDate: '',
      donationRequirement: '',
      registerLink: ''
    },
    resolver: yupResolver(schema)
  })

  const createCampaignMutation = useMutation({
    mutationFn: (body: Omit<Campaign, 'id' | 'image'>) =>
      campaignsApi.postCampaign(profile?.organizations[0].id as number, body),
    onSuccess: (data) => {
      toast.success(data.data.message)
      navigate(path.home)
    }
  })
  const updateCampaignMutation = useMutation({
    mutationFn: (body: Omit<Campaign, 'id' | 'image'>) =>
      campaignsApi.patchCampaign(profile?.organizations[0].id as number, Number(id), body),
    onSuccess: (data) => {
      toast.success(data.data.message)
      navigate(path.home)
    }
  })

  useEffect(() => {
    if (state) {
      Object.keys(omit(state, ['id', 'coordinate'])).forEach((key) => {
        setValue(
          key as keyof Omit<Campaign, 'id' | 'coordinate'>,
          state[key as keyof Omit<Campaign, 'id' | 'coordinate'>]
        )
      })
      setValue('startDate', format(parseISO(state.startDate), 'yyyy-MM-dd'))
      setValue('endDate', format(parseISO(state.endDate), 'yyyy-MM-dd'))
      setValue('image', '')
    }
  }, [state])

  const fetchAddress = async (address: string) => {
    const addressRes = await axios.get(`https://nominatim.openstreetmap.org/search?q="${address}"&format=json`)
    return addressRes.data[0]
  }

  const handleSubmitForm = handleSubmit(async (data) => {
    const body = omit(data, ['image'])
    let lat = state?.coordinate.lat
    let lng = state?.coordinate.lng
    try {
      setIsLoading(true)
      if (!isEdit) {
        const address = await fetchAddress(data.address)
        lat = address?.lat as number
        lng = address?.lon as number
        await createCampaignMutation.mutateAsync({
          ...body,
          coordinate: {
            lat,
            lng
          }
        })
      } else {
        if (data.address !== state.address) {
          const address = await fetchAddress(data.address)
          lat = address?.lat as number
          lng = address?.lon as number
        }
        await updateCampaignMutation.mutateAsync({
          ...body,
          coordinate: {
            lat,
            lng
          }
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <div className='pt-[4.5rem] pb-8'>
      <header className='fixed top-0 left-0 lg:left-64 w-full py-9 bg-[#D9FEFC] text-black text-xl font-bold uppercase z-10'>
        <Link
          to={path.management}
          className='absolute top-1/2 -translate-y-1/2 right-5 lg:left-5 lg:right-[unset] cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 text-primary'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
          </svg>
        </Link>

        <span className='absolute top-1/2 left-1/2 lg:left-[calc((100%-_16rem)_/_2)] -translate-x-1/2 -translate-y-1/2'>
          {isEdit ? 'Chỉnh sửa dự án' : 'Tạo dự án mới'}
        </span>
      </header>
      <div className='mt-12'>
        <form onSubmit={handleSubmitForm}>
          <div className='grid grid-cols-1 lg:grid-cols-2 w-full'>
            <div className='flex flex-col items-center w-full px-4 md:px-16'>
              <div className='mb-6 w-full'>
                <UploadImage listType='picture-card' />
              </div>
              <Input
                type='text'
                placeholder='Tên dự án'
                register={register}
                name='name'
                errors={errors.name?.message}
                classNameWrapper='w-full'
              />
              <Input
                placeholder='Mô tả'
                register={register}
                name='description'
                errors={errors.name?.message}
                classNameWrapper='w-full'
                typeElement='textarea'
                rows={8}
              />
              <Controller
                control={control}
                name='address'
                render={({ field }) => (
                  <AddressSelect errorMessage={errors.address?.message} onChange={field.onChange} />
                )}
              />
              <Input
                type='text'
                placeholder='Địa chỉ cụ thể'
                register={register}
                name='specificAddress'
                errors={errors.specificAddress?.message}
                classNameWrapper='w-full'
              />
              <Input
                type='date'
                placeholder='Thời gian bắt đầu'
                register={register}
                name='startDate'
                errors={errors.startDate?.message}
                classNameWrapper='w-full'
              />
              <Input
                type='date'
                placeholder='Thời gian kết thúc'
                register={register}
                name='endDate'
                errors={errors.endDate?.message}
                classNameWrapper='w-full'
              />
            </div>
            <div className='flex flex-col items-center w-full px-4 md:px-16'>
              <Input
                type='text'
                placeholder='Form Đăng ký TNV (Nếu có)'
                register={register}
                name='registerLink'
                errors={errors.registerLink?.message}
                classNameWrapper='w-full'
              />
              <Input type='text' placeholder='Thời hạn đăng ký (Nếu có)' classNameWrapper='w-full' />
              <Input
                typeElement='textarea'
                rows={8}
                placeholder='Yêu cầu về hiện vật quyên góp (Nếu có)'
                register={register}
                name='donationRequirement'
                errors={errors.donationRequirement?.message}
                classNameWrapper='w-full'
              />
              <Input type='text' placeholder='Thời hạn nhận quyên góp (Nếu có)' classNameWrapper='w-full' />
              <Button loading={isLoading} type='primary' htmlType='submit' className='px-16 h-12'>
                {isEdit ? 'Cập nhật' : ' Hoàn Thành'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
