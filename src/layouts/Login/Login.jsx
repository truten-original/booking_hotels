import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import LoginForm from '../../components/UI/Form/LoginForm'
import RegisterForm from '../../components/UI/Form/RegisterForm'

const Login = () => {
  const [formType, setFormType] = useState('login')
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    )
  }
  return (
    <Box className="form_container">
      <Typography sx={{ color: '#eee' }} allign="center" variant="h2">
        {formType === 'login' ? 'вход' : 'регистрация'}:
      </Typography>
      {formType === 'login' ? <LoginForm /> : <RegisterForm />}
      <a onClick={toggleFormType}>
        <Typography variant="h4" sx={{ color: '#eee', cursor: 'pointer' }}>
          {formType === 'login' ? 'зарегестрироваться' : 'войти'}
        </Typography>
      </a>
    </Box>
  )
}

export default Login
