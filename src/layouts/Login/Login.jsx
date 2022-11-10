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
      <Typography
        sx={{
          color: '#eee',
          fontSize: { xs: '25px', md: '35px' },
          mb: 1,
          textAlign: 'center',
        }}
        variant="h2"
      >
        {formType === 'login' ? 'вход' : 'регистрация'}:
      </Typography>
      {formType === 'login' ? <LoginForm /> : <RegisterForm />}
      <Typography
        onClick={toggleFormType}
        sx={{
          color: '#eee',
          cursor: 'pointer',
          fontSize: { xs: '25px', md: '35px' },
          mt: 2,
        }}
      >
        {formType === 'login' ? 'зарегестрироваться' : 'войти'}
      </Typography>
    </Box>
  )
}

export default Login
