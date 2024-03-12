import React, { useState, useContext } from 'react'
import LogIn from './Modual UI/LogIn';
import SignIn from './Modual UI/SignIn';
import ResetPassword from './Modual UI/ResetPassword';

import { Context } from '../../App';

import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';



function Modual( ) {

  const { showModule } = useContext(Context)

  const [showLogIn, setShowLogIn] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showResetPass, setResetPass] = useState(false)



  function ShowSignIn(){
    if(!showSignIn){
      setShowSignIn(true)

      setShowLogIn(false)
      setResetPass(false)
    }
  }

  function ShowLogIn(){
    if(!showLogIn){
      setShowLogIn(true)

      setShowSignIn(false)
      setResetPass(false)
    }
  }

  function ResetPass(){
    if(!showResetPass){
      setResetPass(true)

      setShowSignIn(false)
      setShowLogIn(false)
    }
  }





  return (
    <div className='module__background'>
       <div className='module__login module__container'>
          <div className='module__close'><h1 onClick={showModule}><MdClose /></h1></div>
          
          { showLogIn && <LogIn showSignIn = {ShowSignIn} resetPass = {ResetPass} />}
          { showSignIn && <SignIn showLogIn = {ShowLogIn} />}
          { showResetPass && <ResetPassword showLogIn = {ShowLogIn} /> }

       </div>
    </div>
    
  )
}

export default Modual