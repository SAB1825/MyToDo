"use client"
import { logOut } from '@/app/auth/auth.actions'
import { Button } from './ui/button'


const logOutButton = ({ children }) => {
    return (
      <Button 
      onClick = {() => logOut()}
      className = "bg-black text-white rounded-[50px] hover:text-black"
      >
          {children}
      </Button>
    )
  }
  export default logOutButton