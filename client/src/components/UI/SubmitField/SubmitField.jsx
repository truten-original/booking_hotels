import { TextField, Typography } from '@mui/material'
import ErrorWrapper from '../ErrorWrapper/ErrorWrapper'
const SubmitField = ({ type, value, size, error }) => {
  return (
    <>
      {error && <ErrorWrapper>{error}</ErrorWrapper>}
      <TextField
        size={size || 'small'}
        fullWidth
        className="form_textField_button"
        type={type}
        value={value}
      />
    </>
  )
}

export default SubmitField
