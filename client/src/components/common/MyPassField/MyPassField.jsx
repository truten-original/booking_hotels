import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
const MyPassField = ({ name, register, type, ...props }) => {
  const [passType, setPassType] = useState(() => type)
  const changePassVisible = () => {
    passType === 'password' ? setPassType('text') : setPassType('password')
  }
  return (
    <>
      <TextField
        id="standard-adornment-password"
        type={passType || type}
        className="form_textField"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={changePassVisible}
              >
                {passType === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register(name)}
        {...props}
      />
    </>
  )
}
export default MyPassField
