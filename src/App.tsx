import useRoutElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProviderConfig from './config/ProviderConfig.tsx'
import AppProvider from './context/app.context.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

function App() {
  const routeElements = useRoutElements()
  return (
    <QueryClientProvider client={queryClient}>
      <ProviderConfig>
        <AppProvider>
          <div className='min-h-screen'>
            {routeElements} <ToastContainer />
          </div>
        </AppProvider>
      </ProviderConfig>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
