import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import { getAdminMeaning, getLoggedStatus } from '../store/usersSlice'
import elements from './elements'
const AppRouter = () => {
  const isLoggedIn = useSelector(getLoggedStatus())
  const isAdmin = useSelector(getAdminMeaning)
  const routes = useRoutes(elements(isLoggedIn, isAdmin))
  return routes
}

export default AppRouter
