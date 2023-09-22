import { ConfigProvider } from 'antd'
import type { ThemeConfig } from 'antd'

export interface ProviderConfigProps {
  children: React.ReactNode
}

const config: ThemeConfig = {
  token: {
    colorPrimary: '#14D0C3'
  }
}

export default function ProviderConfig({ children }: ProviderConfigProps) {
  return <ConfigProvider theme={config}>{children}</ConfigProvider>
}
