import React from 'react'
import AppRouter from './router/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/common/Header/Header'
import { Container } from '@mui/system'
const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
