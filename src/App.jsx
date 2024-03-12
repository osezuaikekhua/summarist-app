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

import logo from './images/logo.png'




export const Context = createContext();


function App() {


  
  const[loginState, setLoginState] = useState(false)
  const[accountInformation, setAccountInformation] = useState(" ")
  const[showModal, setShowModal] = useState(false)

  const [ textSize, setTextSize ] = useState('16px')
  const [ lineHeight, setLineHeight ] = useState('23px')

  function showModule(){
    if(!showModal){
      setShowModal(true)
    }else if(showModal){
      setShowModal(false)
    }
  }


  const location = useLocation()
              
  return (
    <>
      <Context.Provider value={{setShowModal, showModule, setAccountInformation, accountInformation, loginState, setLoginState, textSize, setTextSize, lineHeight, setLineHeight}}>

        { showModal && <Modual /> } 

        

        <Routes>
          <Route index element={ <Home showModule={showModule} /> }/> 
          <Route path='/choose-plan' element={ <ChoosePlan/> } />
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
