/* eslint-disable no-extra-boolean-cast */
import { Select } from 'antd'
import { useEffect, useState } from 'react'

const { Option } = Select

export interface AddressSelectProps {
  onChange?: (value: string) => void
  value?: string
  errorMessage?: string
}

export default function AddressSelect({ onChange, errorMessage }: AddressSelectProps) {
  const [city, setCity] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [ward, setWard] = useState<string>('')
  const handleOnChangeCity = (city: string) => {
    setCity(city)
  }
  const handleOnChangeDistrict = (district: string) => {
    setDistrict(district)
  }
  const handleOnChangeWard = (ward: string) => {
    setWard(ward)
  }
  useEffect(() => {
    if (city && district && ward) {
      const address = ward + ', ' + district + ', ' + city
      onChange && onChange(address)
    }
  }, [city, district, ward])
  return (
    <div className='flex flex-col w-full'>
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-2 w-full'>
        <Select placeholder='Tỉnh/Thành phố' size='large' onChange={handleOnChangeCity} className='w-full'>
          <Option value='Đà Nẵng'>Đà Nẵng</Option>
          <Option value='Thừa Thiên Huế'>Thừa Thiên Huế</Option>
        </Select>
        <Select
          disabled={!Boolean(city)}
          placeholder='Quận/Huyện'
          size='large'
          onChange={handleOnChangeDistrict}
          className='w-full'
        >
          <Option value='Ngũ Hành Sơn'>Ngũ Hành Sơn</Option>
          <Option value='Thanh Khê'>Thanh Khê</Option>
        </Select>
        <Select
          disabled={!Boolean(district)}
          placeholder='Phường'
          size='large'
          onChange={handleOnChangeWard}
          className='w-full'
        >
          <Option value='Mỹ Đa Tây 10'>Mỹ Đa Tây 10</Option>
          <Option value='Mỹ Đa Tây 9'>Mỹ Đa Tây 9</Option>
          <Option value='Mỹ Đa Tây 8'>Mỹ Đa Tây 8</Option>
          <Option value='Mỹ Đa Tây 7'>Mỹ Đa Tây 7</Option>
          <Option value='Mỹ Đa Tây 6'>Mỹ Đa Tây 6</Option>
          <Option value='Mỹ An'>Mỹ An</Option>
        </Select>
      </div>
      <div className='mt-1 min-h-[1.5rem] text-red-600 text-sm'>{errorMessage}</div>
    </div>
  )
}
