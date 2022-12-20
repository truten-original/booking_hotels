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
      <Typography variant="h6">Оставить комментарий</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: '10px',
          pb: '10px',
        }}
      >
        <TextField
          color="secondary"
          sx={{ width: '90%' }}
          value={inputValue}
          onChangeCapture={(e) => setInputValue(e.target.value)}
          label="комментарий"
          multiline
          {...register('comment', {
            required: {
              value: true,
              message: 'обязательное поле для отправки комментария',
            },
          })}
        />
        <SvgButton type="submit" color="black">
          <MailComponent />
        </SvgButton>
      </Box>
      {errors.comment && <ErrorWrapper>{errors.comment.message}</ErrorWrapper>}
    </Box>
  )
}

export default CommentForm
