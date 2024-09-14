"use client"
import { logOut } from '@/app/auth/auth.actions'
import { Button } from './ui/button'


const logOutButton = ({ children }) => {
    return (
      <Button 
      onClick = {() => logOut()}
      className = "bg-black text-white w-full"
      >
          {children}
      </Button>
    )
  }
  export default logOutButton