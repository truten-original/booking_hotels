import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/common/Header/Header'
import AppLoader from './layouts/AppLoader/AppLoader'
import AppRouter from './router/AppRouter'
const App = () => {
  return (
    <BrowserRouter>
      <AppLoader />
      <Header />
      <AppRouter />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
