import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getSignUpError, signUp } from '../../../store/usersSlice'
import { schemaRegister } from '../../../utils/validationSchema'
import MyTextField from '../MyTextField/MyTextField'
import SexField from '../SexField/SexField'
import SubmitField from '../SubmitField/SubmitField'
import { registerFormFields } from './formsFields'
const RegisterForm = ({ isLoading }) => {
  const error = useSelector(getSignUpError)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaRegister),
  })
  const handlerFormSubmit = (data) => {
    dispatch(signUp({ ...data, registerDate: Date.now(), type: 'signUp' }))
  }
  return (
    <Box component="form" onSubmit={handleSubmit(handlerFormSubmit)}>
      {registerFormFields.map((form) => {
        if (form.type) {
          return (
            <SubmitField
              error={error}
              key={form.value}
              type={form.type}
              value={form.value}
            />
          )
        } else if (form.name === 'sex') {
          return <SexField key={form.name} register={register} />
        } else
          return (
            <MyTextField
              defaultValue=""
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

export default RegisterForm
