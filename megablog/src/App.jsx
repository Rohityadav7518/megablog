import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/Auth'
import Header from './componant/header/Header'
import Footer from './componant/footer/Footer'
import './index.css'
import { Outlet } from 'react-router-dom'

import { login, logout } from './store/authSlice'





function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }))
      } else {
        dispatch(logout())

      }
    }).finally(() => setLoading(false))
  }, [])


  return !loading ? (<div className=" min-h-screen flex flex-wrap mx-auto justify-center bg-gray-400 ">
    <div className="w-full block">
      <Header />
      <main>  todo : <Outlet /> </main>


      <Footer />
    </div>
  </div>


  ) : null
}

export default App
