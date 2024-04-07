import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../App';

import { GiCharacter } from "react-icons/gi";

import { useNavigate } from 'react-router-dom';

import { auth } from '../../../FireBaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { setPremium, setUser } from '../../../redux/userSlice';
import { useDispatch } from 'react-redux';




function LogIn({showSignIn, resetPass}) {

  const { setShowModal } = useContext(Context)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const history = useNavigate()
  const dispatch = useDispatch()
  
  const handleSubmit = e => {
    e.preventDefault()
    
    signInWithEmailAndPassword(auth,email,password).then(data => { 

      if(window.location.pathname === '/'){
        history('/for-you')

        setTimeout(() => {
          window.location.reload()
        },100)
      }else{
        history(window.location.pathname)

        setTimeout(() => {
          window.location.reload()
        },100)
      }
      
      setShowModal(false)
      
      console.log(data,"authData") 
    }).catch(err =>{

      setError(`Error: ${err.code}`)
      setTimeout(() => {  

        setError(" ")
      }, 2000);
      
    })
  }

  async function handleGuestSignIn(){
    await signInWithEmailAndPassword(auth, "Guest655249@gmail.com", "GuestAccount")
    
      setShowModal(false)
    
    if(window.location.pathname === '/'){
      history('/for-you')
      setTimeout(() => {
        window.location.reload()
      },100)
    }else{
      history(window.location.pathname)
      setTimeout(() => {
        window.location.reload()
      },100)
    }
  }
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(!currentUser) return
      dispatch(setUser(
        {
          email: currentUser.email,
          uid: currentUser.uid
        }
      ))

      dispatch(
        setPremium({
          setPremium: false
        })
      )
    })

    return unsubscribe

  },[])

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
              <input type="text" placeholder='Email Address' name='email' onChange={e => setEmail(e.target.value)} />
              <input type="text" placeholder='Password' name='password' onChange={e => setPassword(e.target.value)}/>
              
            <button className='btn' >  Log In </button>
           </form>
        </div>
        
          <div className='forget__password' onClick={resetPass}>Forgot your password?</div>
          <div className='signUp__link' onClick={showSignIn}>Don't have an account</div>
    </>
  )
}

export default LogIn