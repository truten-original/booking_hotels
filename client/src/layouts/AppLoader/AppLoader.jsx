import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBookings } from '../../store/bookingsSlice'
import { loadFacilities } from '../../store/facilitiesSlice'
import { loadRooms } from '../../store/roomsSlice'
import { loadTypes } from '../../store/typesSlice'
import {
  getAuthId,
  getCurrentUserData,
  loadUsers,
} from '../../store/usersSlice'

const AppLoader = () => {
  const dispatch = useDispatch()
  const authId = useSelector(getAuthId)
  useEffect(() => {
    dispatch(loadRooms())
    dispatch(loadTypes())
    dispatch(loadFacilities())
    dispatch(loadBookings())
    dispatch(loadUsers())
  }, [dispatch])
  useEffect(() => {
    if (authId) {
      dispatch(getCurrentUserData(authId))
    }
  }, [dispatch, authId])
  return <></>
}

export default AppLoader
