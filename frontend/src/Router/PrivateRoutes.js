import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
const PrivateRoutes = () => {
  const token=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

  return (
    token?<Outlet/>:<Navigate to="/login"/>
  )
}

export default PrivateRoutes
