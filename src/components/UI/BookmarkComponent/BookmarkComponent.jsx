import { Rating } from '@mui/material'
import { useSelector } from 'react-redux'
import { getCurrentRoomBookmarkArr } from '../../../store/bookmarksSlice'
import { calculateRaiting } from '../../../utils/calculateRaiting'

const BookmarkComponent = ({ roomId }) => {
  const arr = useSelector(getCurrentRoomBookmarkArr(roomId))
  const value = calculateRaiting(arr)
  return <Rating sx={{ color: '#9c27b0' }} value={value} readOnly />
}

export default BookmarkComponent
