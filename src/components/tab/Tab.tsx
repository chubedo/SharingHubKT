/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, theme } from 'antd'
import { useEffect } from 'react'
import StickyBox from 'react-sticky-box'

type Item = {
  name: string
  listItem: {
    content: string
    timer: string
  }[]
}

export interface TabProps {
  item1: Item
  item2: Item
}

export default function Tab({ item1, item2 }: TabProps) {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const items = [
    {
      label: <div>{item1.name}</div>,
      key: '1',
      children: (
        <ul className='px-6 flex flex-col gap-4'>
          {item1.listItem.map((item, index) => (
            <li key={index} className='p-4 bg-[#DEF5E5] odd:bg-[#D9FEFC] rounded-xl'>
              <p className='text-lg font-medium mb-2'>{item.content}</p>
              <span className='opacity-40'>{item.timer}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      label: item2.name,
      key: '2',
      children: (
        <ul className='px-6 flex flex-col gap-4'>
          {item2.listItem.map((item, index) => (
            <li key={index} className='p-4 bg-[#DEF5E5] odd:bg-[#D9FEFC] rounded-xl'>
              <p className='text-lg font-medium mb-2'>{item.content}</p>
              <span className='opacity-40'>{item.timer}</span>
            </li>
          ))}
        </ul>
      )
    }
  ]
  const renderTabBar = (props: any, DefaultTabBar: any) => (
    <StickyBox
      offsetTop={0}
      offsetBottom={20}
      style={{
        zIndex: 1
      }}
    >
      <DefaultTabBar
        {...props}
        style={{
          background: colorBgContainer
        }}
      />
    </StickyBox>
  )
  return <Tabs defaultActiveKey='1' renderTabBar={renderTabBar} items={items} />
}
