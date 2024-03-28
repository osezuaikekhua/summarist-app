import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../App';

import { GiCharacter } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from 'react-router-dom';

import { database } from '../FireBaseConfig';
import { signInWithEmailAndPassword} from "firebase/auth";




function LogIn({showSignIn, resetPass}) {

  //const { setIsFYvisible } = useContext(Context)
  const { setShowModal } = useContext(Context)
  const { setAccountInformation } = useContext(Context)
  const { setLoginState } = useContext(Context)


  const[error, setError] = useState("")

  const history = useNavigate()

  
  const handleSubmit =(e,type)=>{
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    
    signInWithEmailAndPassword(database,email,password).then(data => { 

      if(window.location.pathname === '/'){
        history('/for-you')
      }else{
        history(window.location.pathname)
      }

      
      setShowModal(false)
      setAccountInformation(email)
      setLoginState(true)
      
     console.log(data,"authData") 
    }).catch(err =>{

      setError(`Error: ${err.code}`)
      setTimeout(() => {  

        setError(" ")
      }, 2000);
      
    })
  }

  async function handleGuestSignIn(){
    await signInWithEmailAndPassword(database, "Guest655249@gmail.com", "GuestAccount")
    
      setShowModal(false)
      setAccountInformation("Guest655249@gmail.com")
      setLoginState(true)
    
    if(window.location.pathname === '/'){
      history('/for-you')
    }else{
      history(window.location.pathname)
    }
  }
  


  return (
    <>
        <div className='module__input'>
            <h2>Log in to Summarist</h2>
            <h4 style={{color: '#c71111', fontWeight:'400'}}>{error}</h4>
            <br />
            <button className='module__login__guest' onClick={handleGuestSignIn}>  <div className='guest-icon'><GiCharacter /></div> Log In as a Guest</button>            
            
              <div id='or'>
                <div></div>
                <h5>or</h5>
                <div></div>
              </div>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <input type="text" placeholder='Email Address' name='email' />
              <input type="text" placeholder='Password' name='password'/>
              
            <button className='btn' >  Log In </button>
           </form>
        </div>
        
          <div className='forget__password' onClick={resetPass}>Forgot your password?</div>
          <div className='signUp__link' onClick={showSignIn}>Don't have an account</div>
    </>
  )
}

export default LogIn