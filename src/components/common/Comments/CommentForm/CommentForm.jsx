import { TextareaAutosize, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import SubmitField from '../../../UI/SubmitField/SubmitField'

const CommentForm = () => {
  return (
    <Box>
      <Typography variant="h6">оставить комментарий</Typography>
      <TextareaAutosize
        maxRows={6}
        minRows={4}
        aria-label="maximum height"
        placeholder="комментарий"
        style={{
          width: '100%',
          border: '1px solid grey',
          borderRadius: '10px',
        }}
      />
      <SubmitField value="опубликовать" type="submit" sixe="25%" />
    </Box>
  )
}

export default CommentForm
