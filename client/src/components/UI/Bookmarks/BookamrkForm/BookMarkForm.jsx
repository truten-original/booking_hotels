import { toast } from 'react-toastify'
import { Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createOrUpadateBookmark,
  getCurrentUserForCurrentRoomBookmark,
} from '../../../../store/bookmarksSlice'
import { getAuthId } from '../../../../store/usersSlice'
import SvgButton from '../../../common/SvgButton/SvgButton'
import SendBookmarkComponent from '../../../SvgComponents/SendBookmarkComponent'

const BookMarkForm = ({ roomId }) => {
  const dispatch = useDispatch()
  const userId = useSelector(getAuthId)
  const book = useSelector(
    getCurrentUserForCurrentRoomBookmark({ userId, roomId })
  )
  const [bookmarkData, setBookmarkData] = useState(() => {
    return {
      userId,
      roomId,
      bookmark: book ? book.bookmark : 0,
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    if (userId) {
      dispatch(createOrUpadateBookmark({ ...book, ...bookmarkData }))
      toast.success(`Оценка успешно добавлена`)
    } else {
      toast.warn('Оценивать могут только авторизованные пользователи')
      setBookmarkData((prev) => ({ ...prev, bookmark: 0 }))
    }
  }
  return (
    <Box
      className="bookmark_container"
      component="form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6">оценка:</Typography>
        <Rating
          size="medium"
          sx={{ color: '#1976d2', px: '10px' }}
          value={bookmarkData.bookmark}
          onChange={(e) => {
            setBookmarkData((prev) => ({
              ...prev,
              bookmark: Number(e.target.value),
            }))
          }}
        />
      </Box>

      <SvgButton
        disabled={bookmarkData.bookmark === 0}
        type="submit"
        color="black"
      >
        <SendBookmarkComponent />
      </SvgButton>
    </Box>
  )
}

export default BookMarkForm
