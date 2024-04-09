import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../App';


import { auth, db } from '../../../FireBaseConfig';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { GiCharacter } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { setPremium, setUser } from '../../../redux/userSlice';
import { addDoc, collection } from 'firebase/firestore';


function SignIn({showLogIn}) {

  const { setShowModal } = useContext(Context)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const history = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = e =>{
    e.preventDefault()
    //setUpPremium()

    createUserWithEmailAndPassword(auth,email,password).then(data => {
      console.log(data,"authData")
      
      //Sending user to For you page or current page
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

      //Closing Modal
      setShowModal(false)

    }).catch(err =>{

      setError(`Error: ${err.code}`)
      setTimeout(() => {  
        setError(" ")
      }, 4000);

    })
  }

  //Signing up as Guest
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
    //Sending User's information to redux
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(!currentUser) return
      dispatch(
        setUser({
          email: currentUser.email,
          uid: currentUser.uid
        })
      )
      //Creating collection to send to firebase (Default prem state is set to false)
      const info = {
        email: currentUser.email,
        uid: currentUser.uid,
        premium: false 
      }
      addDoc(collection(db, "PremiumStatus"),info)

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
              <input type="password" placeholder='Password' name='password' onChange={e => setPassword(e.target.value)}/>
              
              <button className='btn' >  Sign up </button>
           </form>
          </div>
          <br />
          <div className='signUp__link' onClick={showLogIn}>Already have an account</div>
    </>
  )
}

export default SignIn