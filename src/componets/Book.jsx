import React from 'react'
import { IoIosStarOutline } from "react-icons/io";

function Book({id, imageLink, title, author, subTitle, averageRating, subscriptionRequire}) {
  return (
    <div className="Book" key={id}>
        {subscriptionRequire ? <div className='subscriptionRequired'><h1>Premium</h1></div> : " "}
        
        
        <img className='Book__image' src={imageLink} alt=""/>
        <div className="Book__Title">{title}</div>
        <div className="Book__authorName">{author}</div>
        <div className="Book__Description">{subTitle}</div>
        <footer>
            <div className="Book__Rating"> <IoIosStarOutline /> {averageRating}</div>
        </footer>
    </div>    
  )
}

export default Book