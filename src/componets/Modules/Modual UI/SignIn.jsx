import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../App';


import { database } from '../../../FireBaseConfig';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { GiCharacter } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/userSlice';

function SignIn({showLogIn}) {

  const { setShowModal } = useContext(Context)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const[error, setError] = useState("")

  const history = useNavigate()
  const dispatch = useDispatch()
  


  const handleSubmit = e =>{
    e.preventDefault()
   
    createUserWithEmailAndPassword(database,email,password).then(data => {
      console.log(data,"authData")


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
    const unsubscribe = onAuthStateChanged(database, (currentUser) => {
      if(!currentUser) return
      dispatch(
        setUser({
        
          email: currentUser.email,
          uid: currentUser.uid
        })
      )
    })

    return unsubscribe

  },[])


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
              <input type="text" placeholder='Email Address' name='email' onChange={e => setEmail(e.target.value)} />
              <input type="text" placeholder='Password' name='password' onChange={e => setPassword(e.target.value)}/>
              
              <button className='btn' >  Sign up </button>
           </form>

          </div>
          <br />
          <div className='signUp__link' onClick={showLogIn}>Already have an account</div>
    </>
  )
}

export default SignIn