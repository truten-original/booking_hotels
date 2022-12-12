import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginError, signIn } from '../../../store/usersSlice'
import { schemaLogin } from '../../../utils/validationSchema'
import MyPassField from '../../common/MyPassField'
import MyTextField from '../../common/MyTextField'
import SubmitField from '../../common/SubmitField'
import { loginFormFields } from './formsFields'
const LoginForm = () => {
  const error = useSelector(getLoginError)
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
    dispatch(signIn({ ...data, type: 'login' }))
  }
  return (
    <Box component="form" onSubmit={handleSubmit(handlerFormSubmit)}>
      {loginFormFields.map((form) => {
        if (form.type) {
          return (
            <SubmitField
              error={error}
              key={form.value}
              type={form.type}
              value={form.value}
            />
          )
        } else if (form.name === 'password') {
          return (
            <MyPassField
              key={form.name}
              label={form.label}
              type={form.name}
              color="secondary"
              register={register}
              name={form.name}
              helperText={errors[form.name]?.message}
            />
          )
        } else
          return (
            <MyTextField
              key={form.name}
              label={form.label}
              type={form.name}
              color="secondary"
              register={register}
              name={form.name}
              helperText={errors[form.name]?.message}
            />
          )
      })}
    </Box>
  )
}

export default LoginForm
