import React from 'react'

function ResetPassword({showLogIn}) {
  return (
    <>
      <div className='module__input'>
            <h2>Reset your password</h2>
            <input id='signUp__email' type="text" placeholder='Email Address' />
            <button className='btn'>Send reset password link</button>
        </div>
          <br />
        <div className='signUp__link' onClick={showLogIn}>Go to login</div>
    </>
  )
}

export default ResetPassword