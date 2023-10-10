import useRoutElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRoutElements()
  return (
    <div className='min-h-screen'>
      {routeElements} <ToastContainer />
    </div>
  )
}

export default App
