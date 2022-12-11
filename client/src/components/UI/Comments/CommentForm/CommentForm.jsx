import { toast } from 'react-toastify'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../../../store/commentsSlice'
import { getAuthId } from '../../../../store/usersSlice'
import ErrorWrapper from '../../../common/ErrorWrapper/ErrorWrapper'
import SvgButton from '../../../common/SvgButton/SvgButton'
import MailComponent from '../../../SvgComponents/MailComponent'

const CommentForm = ({ roomId }) => {
  const currentUserId = useSelector(getAuthId)

  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onSubmit',
  })
  const handlerSubmit = (data) => {
    if (currentUserId) {
      if (inputValue.trim().length === 0) return
      if (data.comment.errors) return
      const commentData = {
        ...data,
        roomId,
        userId: currentUserId,
      }
      setInputValue('')
      dispatch(createComment(commentData))
    } else {
      toast.warn(
        'комментарии могут оставлять только авторизованные пользователи'
      )
      setInputValue('')
    }
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handlerSubmit)}
      sx={{ mb: '2vh' }}
    >
      <Typography variant="h6">оставить комментарий</Typography>
      <TextField
        sx={{ mb: 1 }}
        value={inputValue}
        onChangeCapture={(e) => setInputValue(e.target.value)}
        fullWidth
        label="комментарий"
        multiline
        // rows="auto"
        {...register('comment', {
          required: {
            value: true,
            message: 'обязательное поле для отправки комментария',
          },
        })}
      />
      {errors.comment && <ErrorWrapper>{errors.comment.message}</ErrorWrapper>}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SvgButton type="submit" color="black">
          <MailComponent />
        </SvgButton>
      </Box>
    </Box>
  )
}

export default CommentForm
