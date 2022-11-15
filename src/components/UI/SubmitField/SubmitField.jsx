import { TextField } from '@mui/material'
const SubmitField = ({ type, value, size, disabled }) => {
  return (
    <TextField
      size={size || 'small'}
      fullWidth
      className="form_textField_button"
      type={type}
      value={value}
      disabled={disabled}
    />
  )
}

export default SubmitField
