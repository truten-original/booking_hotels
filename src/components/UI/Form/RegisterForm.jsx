import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaRegister } from '../../../utils/validationSchema'
import { registerFormFields } from './formsFields'
import SubmitField from '../SubmitField/SubmitField'
import { useDispatch } from 'react-redux'
import { signUp } from '../../../store/usersSlice'
const RegisterForm = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schemaRegister),
  })
  const handlerFormSubmit = (data) => dispatch(signUp(data))
  return (
    <Box component="form" onSubmit={handleSubmit(handlerFormSubmit)}>
      {registerFormFields.map((form) => {
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

export default RegisterForm
