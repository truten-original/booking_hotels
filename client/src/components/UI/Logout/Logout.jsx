import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../../../store/usersSlice'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(userLogout())
    navigate('/')
  }, [])
  return <div></div>
}

export default Logout
