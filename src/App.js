import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/common/Header/Header'
import AppRouter from './router/AppRouter'
import { loadRooms } from './store/roomsSlice'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadRooms())
  }, [])
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
