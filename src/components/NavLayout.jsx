import React from 'react'
import {
  Link, Outlet
} from "react-router-dom";


export const NavLayout = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/prices">prices</Link>
      <Link to="/dashboard">dashboard</Link>
      <Outlet />
    </>
  )
}
