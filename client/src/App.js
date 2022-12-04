import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { rooms } from './assets/mockData/mockData'
import Header from './components/common/Header/Header'
import AppRouter from './router/AppRouter'
import { loadBookings } from './store/bookingsSlice'
import { loadFacilities } from './store/facilitiesSlice'
import { loadRooms } from './store/roomsSlice'
import { loadTypes } from './store/typesSlice'
const App = () => {
  const dispatch = useDispatch()
  rooms.map((room => 
    axios.post('http://localhost:8080/api/room', {...room}, {headers: {cors: 'no-cors'}})
  ))
  useEffect(() => {
    dispatch(loadRooms())
    dispatch(loadTypes())
    dispatch(loadFacilities())
    dispatch(loadBookings())
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
