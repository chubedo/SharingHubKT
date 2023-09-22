import useRoutElements from './hooks/useRouteElements'

function App() {
  const routeElements = useRoutElements()
  return <div>{routeElements}</div>
}

export default App
