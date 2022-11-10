import { TextField } from '@mui/material'
const SubmitField = ({ type, value, size }) => {
  return (
    <TextField
      size="small"
      fullWidth
      className="form_textField_button"
      type={type}
      value={value}
    />
  )
}

export default SubmitField
