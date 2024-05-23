import './App.css';
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect, createContext } from 'react'
import {useLocation } from 'react-router-dom';


import Home from './pages/Home';
import BookInfo from './pages/BookInfo';
import ForYou from './pages/ForYou';
import Library from './pages/Library';
import Nav from './componets/Nav';
import SearchBar from './componets/SearchBar';
import Settings from './pages/Settings';
import Modual from './componets/Modules/Modual';
import BookSummary from './pages/BookSummary';
import ChoosePlan from './pages/ChoosePlan';
import Purchase from './pages/Purchase';
import ErrorPage from './pages/Error';

import logo from './images/logo.png'


import {Helmet} from "react-helmet";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './FireBaseConfig';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/userSlice';




export const Context = createContext();


function App() {


  //Global Variables
  const[showModal, setShowModal] = useState(false)
  const[subscriptionType, setSubscriptionType] = useState("Yearly")
  const[savedBooks, setSavedBooks] = useState([])
  

  const [ textSize, setTextSize ] = useState('16px')
  const [ lineHeight, setLineHeight ] = useState('23px')

  function showModule(){
    if(!showModal){
      setShowModal(true)
    }else if(showModal){
      setShowModal(false)
    }
  }

  //Making sure user stays logged in
  let dispatch = useDispatch()

  React.useState(() => {
    onAuthStateChanged(auth, (user) => {
      if( user ){
        dispatch(setUser(
          {
            email: user.email,
            uid: user.uid
          }
        ))
      }
    })
  })


  const location = useLocation()
              
  return (
    <>
      <Context.Provider value={{setShowModal, showModule, textSize, setTextSize, lineHeight, setLineHeight, subscriptionType, setSubscriptionType, savedBooks, setSavedBooks}}>

        { showModal && <Modual /> } 

        <Helmet>
            <title>Summarist</title>
            <meta name="description" content="Helmet application" />
        </Helmet>

        <Routes>
          <Route index element={ <Home showModule={showModule} /> }/> 
          <Route path='/choose-plan' element={ <ChoosePlan/> } />
          <Route path='/purchase' element={ <Purchase/> } />
        </Routes>


        { location.pathname.includes("for-you") || 
          location.pathname.includes("library") || 
          location.pathname.includes("book")    || 
          location.pathname.includes("settings")|| 
          location.pathname.includes("player") 
        ?
          <div className='Container'>
            <Nav logo={logo} />
            <section>
              <SearchBar/>
              <div className='content__container'>
                <Routes>
                  <Route path="/for-you" element={<ForYou />} />
                  <Route path="/library" element={<Library/>} />
                  <Route path='/book/:id' element={<BookInfo/>}/>
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/player/:id' element={<BookSummary {...{textSize, lineHeight}} />} />
                  <Route path='*' element={ <ErrorPage/> }/>
                </Routes>
              </div>
            </section>
          </div>
        :
          <h1> </h1>
        }
        
      </Context.Provider>
    </>
  );
}

export default App;
