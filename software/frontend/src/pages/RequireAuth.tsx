import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'



const RequireAuth = ({children}: {children: JSX.Element}) => {
    const location = useLocation()
    const user = null

    if(!user) {
        return <Navigate to={"/login"} state={{from: location}} replace/>
    }
  return children
}

export default RequireAuth