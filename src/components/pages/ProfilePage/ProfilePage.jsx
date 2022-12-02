import { List, ListItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLoggedUser } from '../../../store/usersSlice'
import { getGender } from '../../../utils/getGender'
import { getStringDate } from '../../../utils/getStringDate'
import ContentLayout from '../../UI/ContentLayout/ContentLayout'
import EditUserForm from '../../UI/Form/EditUserForm'
import MyModal from '../../UI/MyModal/MyModal'
import TextButton from '../../UI/TextButton/TextButton'
const ProfilePage = () => {
  const navigate = useNavigate()
  const user = useSelector(getLoggedUser())
  const [modalVisible, setModalVisible] = useState(false)
  const handleBookingClick = () => {
    navigate('/booking')
  }
  const handleFavouriteClick = () => {
    navigate('/favourite')
  }
  return (
    <ContentLayout>
      <MyModal visible={modalVisible} setVisible={setModalVisible}>
        <EditUserForm user={user} setModalVisible={setModalVisible} />
      </MyModal>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          pointerEvents: modalVisible ? 'none' : 'auto',
        }}
      >
        <Box
          sx={{
            width: 'max-content',
            backgroundColor: '#eee',
            borderRadius: '10px',
            height: 'fit-content',
          }}
        >
          <Box>
            <List>
              <ListItem>
                <TextButton color="secondary" onClick={handleBookingClick}>
                  мои бронирования
                </TextButton>
              </ListItem>
              <ListItem>
                <TextButton color="secondary" onClick={handleFavouriteClick}>
                  избранное
                </TextButton>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box
          sx={{
            width: '60%',
            p: '2rem',
            backgroundColor: '#eee',
            borderRadius: '10px',
            height: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              alt={user.name}
              width="100px"
              height="100px"
              src={user.image}
            />
            <Typography>
              {user.name} {user.surname}
            </Typography>
          </Box>
          <Box>
            <Typography>пол: {getGender(user.sex)}</Typography>
            <Typography>
              дата регистрации: {getStringDate(user.registerDate)}
            </Typography>
          </Box>
          <TextButton
            onClick={() => {
              setModalVisible(true)
            }}
            color="secondary"
          >
            редактировать
          </TextButton>
        </Box>
      </Box>
    </ContentLayout>
  )
}

export default ProfilePage
