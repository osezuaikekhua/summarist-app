import React, { useContext } from 'react'
import login from '../images/login.png'
import { Context } from '../App'
import { Link } from 'react-router-dom'



function Settings() {

    const { accountInformation } = useContext(Context)
    const { loginState } = useContext(Context)
    const { showModule } = useContext(Context)
    
  return (

    <div className='Settings__Container'>
        <h1>Settings</h1>
        {loginState
            ?
            <div className='Account__Information'>
                <div className='Subscription__Plan'>
                    <h3>You Subscription Plan</h3>
                    <h4>Basic</h4>
                    <Link to={"/choose-plan"}><button>Upgrade to Premium</button></Link>
                    
                </div>
                <div className='Account__Email'>
                    <h3>Email</h3>
                    <h4>{accountInformation}</h4>
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
  )
}

export default Settings