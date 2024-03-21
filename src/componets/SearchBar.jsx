import React, { useEffect, useState } from 'react'
import { RxMagnifyingGlass } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import { HiOutlineBars3 } from "react-icons/hi2";
import SearchResults from './SearchResults';
import axios from 'axios';
import debounce from 'lodash.debounce';


function SearchBar() {
  
  //Initilzing variables
  const [Data, setData] = useState([])
  const [filterData, setFilterData] = useState("")
  const [openSearch, setOpenSearch] = useState(false)
  const [openNav, setOpenNav] = useState(false)

  //Api request
  const GetData = (value) => {
    fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${value}`)
    .then(res => res.json())
    .then(data => {
      setData(data)
      
    })
    .catch(err => console.log(err))
  }

  //Open Search results
  const OpenSearchResult = () => {
    document.querySelector(".search").value ? setOpenSearch(true) : setOpenSearch(false)
  }
  //Close Search  results
  const CloseSearchResult = () => {
    setOpenSearch(false)
  }



  
  //Calling Api function
  const handleFilter = (value) => { 
    GetData(value)
    setFilterData(value)
    OpenSearchResult()
  }

  //debounce funciton
  const updateQuery = e => handleFilter(e.target.value)
  const debounceOnChnage = debounce(updateQuery, 500)
  
  //Opening navigation
  const openNavigation = () => {
    document.getElementById("nav__container").style.display = "flex"
  }


  return (
    <div className='search__container'>
      <div className='blank'></div>
      <div className='search__bar'>
        <input className='search' type="text" placeholder='Search for books' onChange={debounceOnChnage}/>
        { openSearch ? <button onClick={CloseSearchResult}><TfiClose /> </button> : <button> <RxMagnifyingGlass /> </button> }       
      </div>
      <i onClick={openNavigation} style={{cursor: "pointer", marginLeft: "15px"}}> <HiOutlineBars3/> </i>
      { openSearch && <SearchResults data = {Data} />}
    </div>
  )
}

export default SearchBar