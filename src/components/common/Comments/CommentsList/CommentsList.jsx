import { style } from '@mui/system'
import { useSelector } from 'react-redux'
import {
  getCommentsForCurrentRoom,
  getCommentsLoadingStatus,
} from '../../../../store/commentsSlice'
import Comment from '../Comment/Comment'
const CommentsList = ({ roomId }) => {
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getCommentsForCurrentRoom(roomId))
  return (
    !isLoading && (
      <ul style={{ listStyleType: 'none' }}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    )
  )
}
export default CommentsList
