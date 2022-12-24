import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import LoginForm from '../../components/UI/AuthForms/LoginForm'
import RegisterForm from '../../components/UI/AuthForms/RegisterForm'
import { getAuthLoadingStatus } from '../../store/usersSlice'

const Login = () => {
  const isLoading = useSelector(getAuthLoadingStatus)
  // const location = useLocation()
  const [formType, setFormType] = useState('login')
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    )
  }
  return (
    <Box className="form_container">
      <Typography
        sx={{
          color: '#eee',
          fontSize: { xs: '25px', md: '35px' },
          mb: 1,
          textAlign: 'center',
        }}
        variant="h2"
      >
        {formType === 'login' ? 'Вход' : 'Регистрация'}:
      </Typography>
      {formType === 'login' ? (
        <LoginForm isLoading={isLoading} />
      ) : (
        <RegisterForm isLoading={isLoading} />
      )}
      <Typography
        onClick={toggleFormType}
        sx={{
          color: '#eee',
          cursor: 'pointer',
          fontSize: { xs: '25px', md: '35px' },
          mt: 2,
        }}
      >
        {formType === 'login' ? 'Регистрация' : 'Войти'}
      </Typography>
    </Box>
  )
}

export default Login

// import { Navigate } from 'react-router-dom'
// import BookingsList from '../components/UI/Bookings/BookingsList'
// import FavouritesList from '../components/UI/Favourites/FavouritesList'
// import AdminPage from '../components/pages/AdminPage'
// import ProfilePage from '../components/pages/ProfilePage'
// import RoomPage from '../components/pages/RoomPage/RoomPage'
// import Logout from '../components/UI/Logout/Logout'
// import About from '../layouts/About/About'
// import Contacts from '../layouts/Contacts/Contacts'
// import Login from '../layouts/Login/Login'
// import Main from '../layouts/Main/Main'
// import RoomList from '../layouts/RoomList/RoomList'
// import AuthRequire from '../components/UI/HOC/AuthRequire'
// import AdminRequire from '../components/UI/HOC/AdminRequire'
// import NoAuth from '../components/UI/HOC/NoAuth'

// export const elements = [
//   { path: '', element: <Main /> },
//   {
//     path: 'rooms',
//     exact: true,
//     element: <RoomList />,
//     children: [{ path: ':roomId', element: <RoomPage /> }],
//   },
//   { path: 'contacts', element: <Contacts /> },
//   { path: 'about', element: <About /> },
//   { path: 'favourite', element: <FavouritesList />},
//   {
//     path: 'profile',
//     element: <AuthRequire><ProfilePage /></AuthRequire>,
//   },
//   { path: 'logout', element: <Logout /> },
//   { path: 'booking', element: <AuthRequire><BookingsList /></AuthRequire> },
//   { path: 'admin', element: <AdminRequire><AdminPage /></AdminRequire> },
//   { path: 'login', element: <NoAuth><Login /></NoAuth> },
//   { path: '*', element: <Main /> },
// ]
