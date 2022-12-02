import { Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createOrUpadateBookmark,
  getCurrentUserForCurrentRoomBookmark,
} from '../../../store/bookmarksSlice'
import { getAuthId } from '../../../store/usersSlice'
import { createId } from '../../../utils/createId'
import SubmitField from '../../UI/SubmitField/SubmitField'

const BookMarkForm = ({ roomId }) => {
  const dispatch = useDispatch()
  const userId = useSelector(getAuthId)
  const book = useSelector(
    getCurrentUserForCurrentRoomBookmark({ userId, roomId })
  )
  const [bookmarkData, setBookmarkData] = useState({
    userId,
    id: createId(),
    roomId: roomId,
    bookmark: book,
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createOrUpadateBookmark(bookmarkData))
  }
  return (
    <Box
      className="bookmark_container"
      component="form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Typography variant="h6">оценка:</Typography>
      <Rating
        size="large"
        sx={{ color: '#1976d2', px: '10px' }}
        value={bookmarkData.bookmark}
        onChange={(e) => {
          setBookmarkData((prev) => ({
            ...prev,
            bookmark: Number(e.target.value),
          }))
        }}
      />
      <SubmitField value="отправить" type="submit" />
    </Box>
  )
}

export default BookMarkForm
