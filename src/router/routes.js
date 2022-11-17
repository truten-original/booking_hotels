import FavouritesList from '../components/common/FavouritesList/FavouritesList'
import AdminPage from '../components/pages/AdminPage/AdminPage'
import ProfilePage from '../components/pages/ProfilePage/ProfilePage'
import RoomPage from '../components/pages/RoomPage/RoomPage'
import Logout from '../components/UI/Logout/Logout'
import About from '../layouts/About/About'
import Login from '../layouts/Login/Login'
import Main from '../layouts/Main/Main'
import RoomList from '../layouts/RoomList/RoomList'
export const navRoutes = [
  { path: 'rooms', name: 'номера' },
  { path: 'contacts', name: 'контакты' },
  { path: 'about', name: 'о нас' },
]
export const profileRoutes = [
  { path: 'profile', name: 'профиль' },
  { path: 'booking', name: 'забронированные номера' },
  { path: 'favourites', name: 'избранное' },
  { path: 'logout', name: 'выйти'},
]

export const publicRoutes = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: 'rooms',
    nestedPath: ':roomId',
    element: <RoomList />,
    nestedElement: <RoomPage />,
  },
]

export const privateRoutes = [
  { path: '/profile/:profileId', element: <ProfilePage /> },
  { path: '/logout',  element: <Logout />},
  {path: '/favourite', element: <FavouritesList/>}
]

export const adminRoutes = [{ path: '/adminPage', element: <AdminPage /> }]
