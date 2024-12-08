import { Toaster } from 'react-hot-toast'
import './App.css'
import Login from './page/login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './page/Dashboard'
import ResetPassword from './page/ResetPassword'

function App() {
  
  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/reset-password/:id/:_id' element={<ResetPassword/>}/>
    </Routes>
    </>
  )
}

export default App
