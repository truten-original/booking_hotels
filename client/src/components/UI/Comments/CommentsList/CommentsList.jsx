import { Box, Pagination, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useToggle } from '../../../../hooks/useToggle'
import {
  getCommentsForCurrentRoom,
  getCommentsLoadingStatus,
} from '../../../../store/commentsSlice'
import { paginate } from '../../../../utils/paginate'
import Loader from '../../../common/Loader/Loader'
import TextButton from '../../../common/TextButton'
import Comment from '../Comment/Comment'
const CommentsList = ({ roomId }) => {
  const [page, setPage] = useState(1)
  const [show, setShow] = useToggle(true)
  const isLoading = useSelector(getCommentsLoadingStatus)
  const comments = useSelector(getCommentsForCurrentRoom(roomId))
  const paginateComments = paginate([...comments], 3, page)
  return !isLoading ? (
    <>
      <Box>
        <TextButton onClick={setShow} color="secondary">
          {show ? 'скрыть комментарии' : 'показать комментарии'}
        </TextButton>
      </Box>

      <Box sx={{ display: show ? 'block' : 'none' }}>
        {comments.length ? (
          <ul style={{ listStyleType: 'none' }}>
            {paginateComments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
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
        {!!comments.length && (
          <Pagination
            page={page}
            onChange={(_, page) => setPage(page)}
            sx={{ mt: '1rem', alignContent: 'center' }}
            count={Math.ceil(comments.length / 2)}
          />
        )}
      </Box>
    </>
  ) : (
    <Loader />
  )
}

export default CommentsList
