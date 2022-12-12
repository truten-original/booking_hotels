import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/UI/Footer/Footer'
import Header from './components/UI/Header'
import AppLoader from './layouts/AppLoader/AppLoader'
import AppRouter from './router/AppRouter'
const App = () => {
  return (
    <BrowserRouter>
      <AppLoader />
      <Header />
      <AppRouter />
      <ToastContainer autoClose={2000} closeOnClick={false}/>
      <Footer position="sticky" />
    </BrowserRouter>
  )
}

export default App
