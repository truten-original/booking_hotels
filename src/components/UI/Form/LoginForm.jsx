import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../../store/usersSlice'
import { schemaLogin } from '../../../utils/validationSchema'
import SubmitField from '../SubmitField/SubmitField'
import { loginFormFields } from './formsFields'
const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schemaLogin),
  })
  const handlerFormSubmit = (data) => {
    dispatch(signIn(data))
    navigate('/rooms')
  }
  return (
    <Box component="form" onSubmit={handleSubmit(handlerFormSubmit)}>
      {loginFormFields.map((form) => {
        if (form.type) {
          return (
            <SubmitField key={form.value} type={form.type} value={form.value} />
          )
        } else
          return (
            <TextField
              key={form.name}
              label={form.label}
              type={form.name}
              className="form_textField"
              color="secondary"
              {...register(`${form.name}`)}
              helperText={errors[form.name]?.message}
            />
          )
      })}
    </Box>
  )
}

export default LoginForm
