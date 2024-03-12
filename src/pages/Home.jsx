import React from 'react'


import Nav from '../componets/home/Nav'
import Landing from '../componets/home/Landing'
import Features from '../componets/home/Features'
import Reviews from '../componets/home/Reviews'
import Numbers from '../componets/home/Numbers'
import Footer from '../componets/home/Footer'

import logo from '../images/logo.png'
import landing from '../images/landing.png'


function Home({ showModule}) {
 
  return (
    <>
    <Nav LogoImg = {logo} showModule={showModule} />
    <Landing LandingImg = {landing} showModule = {showModule} />
    <Features />
    <Reviews showModule = {showModule} />
    <Numbers />
    <Footer />

    </>
  )
}

export default Home