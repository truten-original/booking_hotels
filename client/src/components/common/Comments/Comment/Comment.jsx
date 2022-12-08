import { Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthId, getUserById } from '../../../../store/usersSlice'
import { displayDate } from '../../../../utils/getCommentDate'
import DeleteIcon from '@mui/icons-material/Delete'
import { removeComment } from '../../../../store/commentsSlice'
const Comment = ({ comment }) => {
  const dispatch = useDispatch()
  const authUserId = useSelector(getAuthId)
  const createdTime = displayDate(Date.parse(comment.createdAt))
  const currentUser = useSelector(getUserById(comment.userId))
  const handleClick = () => {
    dispatch(removeComment(comment._id))
  }
  return (
    <>
      {currentUser && (
        <li style={{ display: 'flex', flexDirection: 'column' }}>
          <Divider />
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1rem',
                }}
              >
                <img
                  width="65"
                  height="65"
                  src={currentUser.image}
                  alt="user"
                />
                <p>{currentUser.name}</p>
                <span>{createdTime}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {authUserId === comment.userId && (
                  <button
                    style={{ border: 'none', cursor: 'pointer' }}
                    onClick={handleClick}
                  >
                    <DeleteIcon color="secondary" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <p style={{ padding: '2rem' }}>{comment.comment}</p>
          <Divider />
        </li>
      )}
    </>
  )
}

export default Comment
