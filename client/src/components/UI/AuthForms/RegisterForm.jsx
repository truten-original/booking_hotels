import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getSignUpError, signUp } from '../../../store/usersSlice'
import { schemaRegister } from '../../../utils/validationSchema'
import MyPassField from '../../common/MyPassField'
import MyTextField from '../../common/MyTextField'
import SexField from '../../common/SexField'
import SubmitField from '../../common/SubmitField'
import { registerFormFields } from './formsFields'
const RegisterForm = () => {
  const navigate = useNavigate()
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
    navigate('/rooms')
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
        } else if (form.name === 'password') {
          return (
            <MyPassField
              key={form.name}
              defaultValue=""
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
