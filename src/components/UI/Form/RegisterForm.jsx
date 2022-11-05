import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../utils/validationSchema'
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const handlerFormSubmit = (data) => console.log(data)
  const inputStyles = { backgroundColor: '#eee', borderRadius: '10px' }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { mb: 1, width: '100%', color: 'white' },
      }}
      onSubmit={handleSubmit(handlerFormSubmit)}
    >
      <TextField
        sx={inputStyles}
        label="Email"
        type="email"
        className="form_textField"
        color="secondary"
        {...register('email')}
        helperText={errors.email?.message}
      />
      <TextField
        sx={inputStyles}
        label="Password"
        type="password"
        color="secondary"
        helperText={errors.password?.message}
        {...register('password')}
      />
      <TextField
        sx={inputStyles}
        label="Name"
        color="secondary"
        helperText={errors.name?.message}
        {...register('name')}
      />
      <TextField
        type="submit"
        sx={{ ...inputStyles, backgroundColor: 'blanchedalmond' }}
        value="Войти"
      />
    </Box>
  )
}

export default RegisterForm
