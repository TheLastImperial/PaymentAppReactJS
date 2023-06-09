import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from './app/commons/NavBar'

export const App = () => {
  return (
    <>
      <NavBar/>
      <div className="container mt-5 col-6">
        <Outlet/>
      </div>
    </>
  )
}
