import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../FireBaseConfig'


function ResetPassword({showLogIn}) {

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setError(`Password reset! Check email`)
      setTimeout(() => {  
        setError(" ")
      }, 2000);
    })
    .catch((error) => {
      setError(`Error: ${error.message}`)
      setTimeout(() => {  
        setError(" ")
      }, 2000);
      
    });
  }

  return (
    <>
      <div className='module__input'>
            <h2>Reset your password</h2>
            <h4 style={{color: '#c71111', fontWeight:'400'}}>{error}</h4>
            <input id='signUp__email' type="text" placeholder='Email Address' onChange={e => setEmail(e.target.value)}/>
            <button className='btn' onClick={resetPassword}>Send reset password link</button>
        </div>
          <br />
        <div className='signUp__link' onClick={showLogIn}>Go to login</div>
    </>
  )
}

export default ResetPassword