import { TextField, Typography } from '@mui/material'
import ErrorWrapper from '../ErrorWrapper/ErrorWrapper'
const SubmitField = ({ type, value, size, error, disabled }) => {
  return (
    <>
      {error && <ErrorWrapper>{error}</ErrorWrapper>}
      <TextField
        size={size || 'small'}
        fullWidth
        className="form_textField_button"
        type={type}
        value={value}
        disabled={disabled || false}
      />
    </>
  )
}

export default SubmitField
