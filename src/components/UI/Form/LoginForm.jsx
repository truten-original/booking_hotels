import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaLogin } from '../../../utils/validationSchema'
import { loginFormFields } from './formsFields'
import SubmitField from '../SubmitField/SubmitField'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../../store/usersSlice'
const LoginForm = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schemaLogin),
  })
  const handlerFormSubmit = (data) => dispatch(signIn(data))
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
