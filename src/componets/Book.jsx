import React from 'react'
import { CiClock2 } from "react-icons/ci";
import { IoIosStarOutline } from "react-icons/io";

function Book({key, imageLink, title, author, subTitle, averageRating, subscriptionRequire, removeBook}) {
  return (
    <div className="Book" key={key}>
        {subscriptionRequire ? <div className='subscriptionRequired'><h1>Premium</h1></div> : " "}
        
        
        <img className='Book__image' src={imageLink} alt=""/>
        <div className="Book__Title">{title}</div>
        <div className="Book__authorName">{author}</div>
        <div className="Book__Description">{subTitle}</div>
        <footer>
            <div className="Book__Length"> <CiClock2 /> 03:24</div>
            <div className="Book__Rating"> <IoIosStarOutline /> {averageRating}</div>
        </footer>
        <h2>{removeBook}</h2>
    </div>    
  )
}

export default Book