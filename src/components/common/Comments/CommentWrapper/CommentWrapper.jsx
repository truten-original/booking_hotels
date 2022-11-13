import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadComments } from '../../../../store/commentsSlice'
import { loadUsers } from '../../../../store/usersSlice'
import CommentForm from '../CommentForm/CommentForm'
import CommentsList from '../CommentsList/CommentsList'

const CommentWrapper = ({ roomId }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadComments(roomId))
  }, [roomId, dispatch])
  useEffect(() => {
    dispatch(loadUsers())
  }, [])
  return (
    <Box className="comment_wrapper_container">
      <CommentForm roomId={roomId} />
      <CommentsList roomId={roomId} />
    </Box>
  )
}

export default CommentWrapper
