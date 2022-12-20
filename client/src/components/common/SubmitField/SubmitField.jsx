import { TextField } from '@mui/material'
import ErrorWrapper from '../ErrorWrapper/ErrorWrapper'
const SubmitField = ({ type, value, size, error, disabled, fullWidth }) => {
  return (
    <>
      {error && <ErrorWrapper>{error}</ErrorWrapper>}
      <TextField
        sx={{ cursor: 'pointer' }}
        size={size || 'small'}
        fullWidth={fullWidth ? fullWidth : false}
        className="form_textField_button"
        type={type}
        value={value}
        disabled={disabled || false}
      />
    </>
  )
}

export default SubmitField
