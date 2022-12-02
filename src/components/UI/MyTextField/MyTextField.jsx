import { TextField } from '@mui/material'

const MyTextField = ({ name, register, ...props }) => {
  return <TextField className="form_textField" {...register(name)} {...props} />
}

export default MyTextField
