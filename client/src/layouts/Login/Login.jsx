import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import LoginForm from '../../components/UI/AuthForms/LoginForm'
import RegisterForm from '../../components/UI/AuthForms/RegisterForm'
import { getAuthLoadingStatus } from '../../store/usersSlice'

const Login = () => {
  const isLoading = useSelector(getAuthLoadingStatus)
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
      {formType === 'login' ? (
        <LoginForm isLoading={isLoading} />
      ) : (
        <RegisterForm isLoading={isLoading} />
      )}
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
