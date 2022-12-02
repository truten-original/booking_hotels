import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getCommentsForCurrentRoom,
  getCommentsLoadingStatus,
} from '../../../../store/commentsSlice'
import TextButton from '../../../UI/TextButton/TextButton'
import Comment from '../Comment/Comment'
const CommentsList = ({ roomId }) => {
  const [show, setShow] = useState(true)
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getCommentsForCurrentRoom(roomId))
  const buttonHandleClick = () => {
    setShow((prev) => !prev)
  }
  return (
    !isLoading && (
      <>
        <TextButton onClick={buttonHandleClick} color="secondary">
          {show ? 'скрыть комментарии' : 'показать комментарии'}
        </TextButton>

        <Box sx={{ display: show ? 'block' : 'none' }}>
          {comments.length ? (
            <ul style={{ listStyleType: 'none' }}>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ul>
          ) : (
            <Typography
              align="center"
              variant="body2"
              color="text.secondary"
              component="p"
            >
              список комментариев пуст, будьте первым!
            </Typography>
          )}
        </Box>
      </>
    )
  )
}
export default CommentsList
