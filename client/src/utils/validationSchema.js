import * as yup from 'yup'
export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required('для входа требуется email')
    .email('введите корректный email'),
  password: yup
    .string('введите корректный пароль')
    .required('для входа требуется пароль')
    .min(8, 'длина пароля должна быть не менее 8 символов'),
})
export const schemaRegister = yup.object().shape({
  email: yup
    .string()
    .required('для входа требуется email')
    .email('введите корректный email'),
  password: yup
    .string('введите корректный пароль')
    .required('для входа требуется пароль')
    .min(8, 'длина пароля должна быть не менее 8 символов'),
  name: yup
    .string('введите корректное имя пользователя')
    .required('имя-обязательное поле для регистрации'),
  surname: yup
    .string('введите корректное имя пользователя')
    .required('фамилия-обязательное поле для регистрации'),
})

