import { Box, Button } from '@mui/material'
import { initialize } from '../../../utils/initializeMockData'

const AdminPage = () => {
  return (
    <Box sx={{ mt: '80px' }}>
      <Button color="warning" onClick={initialize}>
        Инициализировать данные по умолчанию
      </Button>
    </Box>
  )
}

export default AdminPage
