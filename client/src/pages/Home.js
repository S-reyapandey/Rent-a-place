import React from 'react'
import Loading from '../components\'/Loading'
import Notification from '../components\'/Notification'
import Login from '../components\'/user/Login'
import Navbar from '../components\'/Navbar'
import BottomNav from '../components\'/BottomNav'
import Room from '../components\'/rooms/Room'

const Home = () => {
  return (
    <>
      <Loading/>
      <Notification/>
      <Login/>
      <Navbar/>
      <BottomNav/>
      <Room/>
    </>
  )
}

export default Home
