import { GrLocation, GrNext } from 'react-icons/gr'
import { AiOutlineMail } from 'react-icons/ai'
import { Select } from 'antd'
import imageCampaign from 'src/assets/img/campaigns.png'

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
            <ul className='flex flex-col gap-6 mt-6 px-2'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <li key={index}>
                    <div className='p-4 bg-[#F5F5F6] rounded-lg cursor-pointer'>
                      <div className='flex gap-8'>
                        <img
                          src={imageCampaign}
                          alt='img'
                          className='w-36 h-36 object-cover object-center rounded-lg'
                        />
                        <div className='flex flex-col gap-2 text-sm'>
                          <h2 className='font-bold text-xl text-[#3F3F3F]'>Xuân yêu thương</h2>
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
          </div>
        </div>
      </div>
    </div>
  )
}
