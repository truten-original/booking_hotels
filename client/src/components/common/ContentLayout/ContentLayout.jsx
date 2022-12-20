import { Container } from '@mui/system'

const ContentLayout = ({ children }) => {
  return (
    <Container sx={{ mt: '15vh', mb: '5vh', minHeight: '85vh' }}>
      {children}
    </Container>
  )
}

export default ContentLayout
