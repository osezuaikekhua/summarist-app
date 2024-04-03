import React, { useContext, useEffect } from 'react'
import login from '../images/login.png'
import { Context } from '../App'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'



function Settings() {
    const email = useSelector(state => state.user.testEmail)

    const { showModule } = useContext(Context)
    let { subscriptionStatus } = useContext(Context)

  return (

    <div className='Settings__Container'>
        <div className="row">
            <h1>Settings</h1>
            {email
                ?
                <div className='Account__Information'>
                    <div className='Subscription__Plan'>
                        <h3>You Subscription Plan</h3>
                        <h4>{subscriptionStatus}</h4>
                        {subscriptionStatus==="Premium" ? " " : <Link to={"/choose-plan"}><button>Upgrade to Premium</button></Link>}
                        
                    </div>
                    <div className='Account__Email'>
                        <h3>Email</h3>
                        <h4>{email}</h4>
                    </div>
                </div>
                    :
                <div className='Not__LoggedIn'>
                    <img src={login} alt="" />
                    <h2>Log in to your account to see your details</h2>
                    <button className='btn' onClick={showModule} >  Login </button>
                </div>
            }
        </div>
    </div>
  )
}

export default Settings