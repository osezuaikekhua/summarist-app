import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { Context } from '../../../App';


import { database } from '../FireBaseConfig';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

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




  return (
    <>
        <div className='module__input'>
            <h2>Sign up to Summarist</h2>
            <h4 style={{color: '#c71111', fontWeight:'400'}}>{error}</h4>
            <br />
            <button className='module__login__google'> <div className='google-icon'><FcGoogle /></div> Sign up with Google</button>
            
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