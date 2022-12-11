import { Navigate } from 'react-router-dom'
import BookingsList from '../components/UI/Bookings/BookingsList'
import FavouritesList from '../components/UI/Favourites/FavouritesList'
import AdminPage from '../components/pages/AdminPage'
import ProfilePage from '../components/pages/ProfilePage'
import RoomPage from '../components/pages/RoomPage/RoomPage'
import Logout from '../components/UI/Logout/Logout'
import About from '../layouts/About/About'
import Contacts from '../layouts/Contacts/Contacts'
import Login from '../layouts/Login/Login'
import Main from '../layouts/Main/Main'
import RoomList from '../layouts/RoomList/RoomList'

const elements = (isLoggedIn, isAdmin) => {
  const localRoutes = [
    { path: '/', element: <Main /> },
    {
      path: 'rooms',
      element: <RoomList />,
      children: [{ path: ':roomId', element: <RoomPage /> }],
    },
    { path: 'contacts', element: <Contacts /> },
    { path: 'about', element: <About /> },
    { path: 'favourite', element: <FavouritesList />},
    { path: '*', element: <Navigate to="/" /> },
  ]
  if (isLoggedIn) {
    if (isAdmin) {
      localRoutes.push({ path: 'admin', element: <AdminPage /> })
    } 
    localRoutes.push(
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      { path: 'booking', element: <BookingsList /> },
    )
    localRoutes.push({ path: 'logout', element: <Logout /> })
  } else {
    localRoutes.push({ path: 'login', element: <Login /> })
  }
  
  return localRoutes
}
export default elements
