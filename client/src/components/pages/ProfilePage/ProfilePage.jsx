import { List, ListItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../../store/usersSlice'
import { getGender } from '../../../utils/getGender'
import { getStringDate } from '../../../utils/getStringDate'
import ContentLayout from '../../common/ContentLayout'
import EditUserForm from '../../UI/EditUserForm'
import MyModal from '../../common/MyModal'
import TextButton from '../../common/TextButton'
import { useToggle } from '../../../hooks/useToggle'
const ProfilePage = () => {
  const navigate = useNavigate()
  const user = useSelector(getCurrentUser)
  const [modalVisible, setModalVisible] = useToggle(false)
  const handleBookingClick = () => {
    navigate('/booking')
  }
  const handleFavouriteClick = () => {
    navigate('/favourite')
  }
  return (
    <ContentLayout>
      {user && (
        <>
          <MyModal visible={modalVisible} setVisible={setModalVisible}>
            <EditUserForm user={user} setModalVisible={setModalVisible} />
          </MyModal>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              pointerEvents: modalVisible ? 'none' : 'auto',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              rowGap: '1vh',
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
                    <TextButton
                      color="secondary"
                      onClick={handleFavouriteClick}
                    >
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
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
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
                  дата регистрации: {getStringDate(Date.parse(user.createdAt))}
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
        </>
      )}
    </ContentLayout>
  )
}

export default ProfilePage
