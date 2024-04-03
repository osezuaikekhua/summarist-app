import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';


import { RxMagnifyingGlass } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";
import { IoBookmarkOutline } from "react-icons/io5";
import { BsPen, BsArrowBarRight } from "react-icons/bs";
import { GoGear, GoQuestion } from "react-icons/go";


import { signOut } from 'firebase/auth';
import { database } from '../FireBaseConfig';

import { Context } from '../App';
import FontSize from './audio player/FontSize';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../redux/userSlice';
import { useSelector } from 'react-redux'

function Nav({logo}) {
  

  const { showModule } = useContext(Context)
  const { setLineHeight } = useContext(Context)
  const { setTextSize } = useContext(Context)

  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.testEmail)

  function Tabs () {
    const links = document.querySelectorAll(".access")
    
    links.forEach( tab =>{
      tab.addEventListener('click', () => {
        document.querySelector('.active')?.classList.remove('active')
        tab.classList.add('active')
      })
    })
  }
  
  useEffect(() => {
    Tabs()
    console.log(user)
  })

  async function handleSignOut (){
    await signOut(database)
    dispatch(signOutUser())
  }

  function changeFontSize16(){
    setTextSize('16px')
    setLineHeight('23px')
  }
  function changeFontSize21(){
      setTextSize('21px')
      setLineHeight('28px')
  }
  function changeFontSize26(){
      setTextSize('26px')
      setLineHeight('33px')
  }
  function changeFontSize30(){
      setTextSize('30px')
      setLineHeight('38px')
  }
  
  const closeNav = () => {
    document.getElementById("nav__container").style.display = "none"
  }

  return (
    <div id='nav__container'>
    <nav id='nav'>
      <div className='nav__logo'><img src={logo} alt="" /></div>
      <div className='nav__section'>
        <div className='nav__section__text'>

            <Link to={"/for-you"}>
              <div className='access active'>
                <div className='inactive'></div>
                <i><AiOutlineHome /></i> 
                <p>For You</p>
              </div>
            </Link>

            <Link to={"/library"} >
              <div className='access'>
                <div className='inactive'></div>
                <i><IoBookmarkOutline /></i> 
                <p>My Library</p>
              </div>
            </Link>

            <div className='No-access'><div className='never-active'></div><i><BsPen /></i> <p>Highlights</p></div>
            
            <div className='No-access'><div className='never-active'></div><i><RxMagnifyingGlass /></i> <p>Search</p></div>
            
            {location.pathname.includes("player") && <FontSize {...{changeFontSize16, changeFontSize21, changeFontSize26, changeFontSize30}} />}
            
        </div>
        <div className='nav__section__text'>
            <Link to={"/settings"}>
              <div className='access'>
                <div className='inactive'></div>
                <i><GoGear /></i>
                <p>Settings</p>
                </div>
            </Link>
            
            <div className='No-access'><div className='never-active'></div><i><GoQuestion /></i> <p>Help & Support</p></div>

            {
              user ?
              <div onClick={handleSignOut} className='extra-access'><div className='never-active'></div><i><BsArrowBarRight /></i> <p>Log out</p> </div>
              :
              <div onClick={showModule} className='extra-access'><div className='never-active'></div><i><BsArrowBarRight /></i> <p>Log in</p> </div>
            }
            
        </div>
      </div>
    </nav>
    <div className='nav__background' onClick={closeNav}>

    </div>
    </div>
  )
}

export default Nav