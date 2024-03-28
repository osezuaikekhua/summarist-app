import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { Context } from '../../../App';


import { database } from '../FireBaseConfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { GiCharacter } from 'react-icons/gi';

function SignIn({showLogIn}) {

  const { setShowModal } = useContext(Context)
  const { setAccountInformation } = useContext(Context)
  const { setLoginState } = useContext(Context)

  const[error, setError] = useState("")
  const history = useNavigate()



  const handleSubmit =(e)=>{
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
   
    createUserWithEmailAndPassword(database,email,password).then(data => {
      console.log(data,"authData")
      history('/for-you')

      setShowModal(false)
      setAccountInformation(email)
      setLoginState(true)

    }).catch(err =>{

      setError(`Error: ${err.code}`)
      setTimeout(() => {  
        setError(" ")
      }, 4000);

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
            <h2>Sign up to Summarist</h2>
            <h4 style={{color: '#c71111', fontWeight:'400'}}>{error}</h4>
            <br />
            <button className='module__login__guest' onClick={handleGuestSignIn}>  <div className='guest-icon'><GiCharacter /></div> Sign In as a Guest</button>
            
            <div id='or'>
                <div></div>
                <h5>or</h5>
                <div></div>
              </div>
            
            <form onSubmit={(e)=>handleSubmit(e)}>
              <input type="text" placeholder='Email Address' name='email' />
              <input type="text" placeholder='Password' name='password'/>
              
              <button className='btn' >  Sign up </button>
           </form>

          </div>
          <br />
          <div className='signUp__link' onClick={showLogIn}>Already have an account</div>
    </>
  )
}

export default SignIn