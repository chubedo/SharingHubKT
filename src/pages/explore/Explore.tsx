import { GrLocation, GrNext } from 'react-icons/gr'
import { AiOutlineMail } from 'react-icons/ai'
import { Select } from 'antd'
import Campaigns from 'src/components/campaigns'

export interface ExploreProps {}

const options: {
  label: string
  value: string
  key: string
}[] = [
  {
    label: 'Newest',
    value: 'new',
    key: 'new'
  },
  {
    label: 'Nearest',
    value: 'near',
    key: 'near'
  }
]

export default function Explore(props: ExploreProps) {
  return (
    <div>
      <header className='sticky z-10 top-0 left-0 flex justify-between items-center p-6 bg-[#D9FEFC] shadow-xl'>
        <div className='flex items-center gap-2'>
          <GrLocation className='text-2xl' />
          <h3 className='text-xl font-medium'>193 Nguyen Luong Bang</h3>
          <GrNext className='mt-1' />
        </div>
        <div>
          <AiOutlineMail className='text-3xl' />
        </div>
      </header>
      <div className='px-4 md:px-8'>
        <div className='relative mt-8 pb-4 border-b-2'>
          <span>Sort by: </span>
          <Select
            onChange={(value) => console.log(value)}
            defaultValue='new'
            style={{ width: 120 }}
            allowClear
            options={options}
          ></Select>
          <div>
            <Campaigns />
          </div>
        </div>
      </div>
    </div>
  )
}
