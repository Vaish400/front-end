
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Forgot from './Forgot'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import Dashboard from './Dashboard'

function App() {
  

  return (
    <>
     <Routes>
      <Route path='/' Component={Login}/>
      <Route path='/register' Component={Register}/>
      <Route path='/forgot-password' Component={Forgot}/>
      <Route path='/dashboard' Component={Dashboard}/>
      <Route path='*' Component={NotFound}/>
     </Routes>
    </>
  )
}

export default App
