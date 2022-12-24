import { Box } from '@mui/material'
import CommentForm from '../CommentForm/CommentForm'
import CommentsList from '../CommentsList/CommentsList'

const CommentWrapper = ({ roomId }) => {
  return (
    <Box className="comment_wrapper_container">
      <CommentForm roomId={roomId} />
      <CommentsList roomId={roomId} />
    </Box>
  )
}

export default CommentWrapper
