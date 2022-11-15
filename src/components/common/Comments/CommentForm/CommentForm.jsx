import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../../../store/commentsSlice'
import { getAuthId } from '../../../../store/usersSlice'
import { createId } from '../../../../utils/createId'
import SubmitField from '../../../UI/SubmitField/SubmitField'

const CommentForm = ({ roomId }) => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onSubmit',
  })
  const currentUserId = useSelector(getAuthId())
  const handlerSubmit = (data) => {
    if (data.comment.trim().length === 0) return
    if (data.comment.errors) return
    const commentData = {
      ...data,
      roomId,
      userId: currentUserId,
      id: createId(),
      createdTime: Date.now(),
    }
    setInputValue('')
    dispatch(createComment(commentData))
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handlerSubmit)}
      sx={{ mb: '2rem' }}
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
      <Typography>{errors.comment && errors.comment.message}</Typography>
      <SubmitField value="опубликовать" type="submit" />
    </Box>
  )
}

export default CommentForm
