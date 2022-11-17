import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/common/Header/Header'
import AppRouter from './router/AppRouter'
import { loadBookings } from './store/bookingsSlice'
import { loadFacilities } from './store/facilitiesSlice'
import { loadRooms } from './store/roomsSlice'
import { loadTypes } from './store/typesSlice'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadRooms())
    dispatch(loadTypes())
    dispatch(loadFacilities())
  }, [])
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
