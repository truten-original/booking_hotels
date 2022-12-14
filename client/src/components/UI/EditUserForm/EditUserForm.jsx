import { Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../store/usersSlice'
import MyTextField from '../../common/MyTextField'
import SexField from '../../common/SexField'
import SubmitField from '../../common/SubmitField'

const EditUserForm = ({ user, setModalVisible }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const handlerFormSubmit = (data) => {
    setModalVisible()
    dispatch(updateUser({ ...user, ...data }))
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(handlerFormSubmit)}
        style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}
      >
        <Typography>редактировать</Typography>
        <MyTextField register={register} name="name" defaultValue={user.name} />
        <MyTextField
          register={register}
          name="surname"
          defaultValue={user.surname}
        />
        <SexField defaultValue={user.sex} register={register} />
        <SubmitField value="обновить" type="submit" />
      </form>
    </>
  )
}

export default EditUserForm
