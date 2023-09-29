import useRoutElements from './hooks/useRouteElements'

function App() {
  const routeElements = useRoutElements()
  return <div className='min-h-screen'>{routeElements}</div>
}

export default App
