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
      history('/for-you')
      setShowModal(false)
      setAccountInformation(email)
      setLoginState(true)
      
     console.log(data,"authData") 
    }).catch(err =>{

      setError(`Error: ${err.code}`)
      setTimeout(() => {  
        setError(" Error! ")
      }, 4000);
      
    })
  }

  


  return (
    <>
        <div className='module__input'>
            <h2>Log in to Summarist</h2>
            <h4 style={{color: '#c71111', fontWeight:'400'}}>{error}</h4>
            <br />
           <button className='module__login__guest'> <Link to={"/for-you"}> <div className='guest-icon'><GiCharacter /></div> Login as a Guest</Link></button>            
            <button className='module__login__google'> <div className='google-icon'><FcGoogle /></div> Login with Google</button>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <input type="text" placeholder='Email Address' name='email' />
              <input type="text" placeholder='Password' name='password'/>
              
            <button className='btn' >  Login </button>
           </form>
        </div>
        
          <div className='forget__password' onClick={resetPass}>Forgot your password?</div>
          <div className='signUp__link' onClick={showSignIn}>Don't have an account</div>
    </>
  )
}

export default LogIn