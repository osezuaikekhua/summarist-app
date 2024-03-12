import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'

import { CiBookmark, CiStar } from "react-icons/ci";
import { IoBookmark, IoMicOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { SlBookOpen } from "react-icons/sl";

import Skeleton from '../componets/Skeleton';
import { Context } from '../App';


function BookInfo() {
    const { id } = useParams()
    const [ book, setBook ] = useState({})

    const [ savedStatus, setSavedStatus ] = useState("Add title to My Library")
    const [ isSaved, setIsSaved ] = useState(false)

    const { loginState } = useContext(Context)
    const { showModule } = useContext(Context)

    async function fetchBook(){
        const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
        setBook(data)
    }

    useEffect(() => {
        fetchBook()
        console.log(book)
    }, [])


    //Save book
    function SavedBooks (){
        if(!isSaved){
            setSavedStatus("Saved in My Library")
            setIsSaved(true)
        }else if(isSaved){
            setSavedStatus("Add title to My Library")
            setIsSaved(false)
        }
    }


  return (
    <>
    <div className="Book__Info__Page">
        <div className="Book__Info">
            <div className="Book__Info">
                <div className='Book__Info-title'>
                    <h1>{book.title}</h1>
                    {book.subscriptionRequired ? <h4 className='Book__Info-subscription'>(Premium)</h4> : " "}
                </div>
                
                <h4 className='Book__Info-author'>{book.author}</h4>
                <h2 className='Book__Info-subTitle'>{book.subTitle}</h2>
                <div className='Book__Info-group'>
                    <div className='Book__Info-group_child'>
                        <div> <CiStar /> <h5>{`${book.averageRating} (${book.totalRating} ratings)`}</h5></div>
                        <div> <IoMicOutline /> <h5>{book.type}</h5> </div>
                    </div>
                    <div className='Book__Info-group_child'>
                        <div> <BsClock /> <h5> 05:38</h5></div>
                        <div> <HiOutlineLightBulb /> <h5>{`${book.keyIdeas} Key ideas`}</h5> </div>
                    </div>
                </div>
                {loginState ?
                    <div className='Book__Info-read'>
                        <Link to={`/player/${book.id}`}>
                            <button>
                                <SlBookOpen/>
                                <div>Read</div>
                            </button>
                        </Link>
                        <Link to={`/player/${book.id}`}>
                            <button>
                                <HiOutlineMicrophone/>
                                <div>Listen</div>
                            </button>
                        </Link>
                    </div>
                    :
                    <div className='Book__Info-read'>
                        <button onClick={showModule}>
                            <SlBookOpen/>
                            <div>Read</div>
                        </button>
                        <button onClick={showModule}>
                            <HiOutlineMicrophone/>
                            <div>Listen</div>
                        </button>
                    </div>
                }
                <div className="Book__Info-library" onClick={SavedBooks}>
                    {isSaved ? <IoBookmark style={{fontSize: 27}}/> : <CiBookmark style={{fontSize: 27}}/>}
                    <h2 >{savedStatus}</h2>
                </div>
                <header>What's it about?</header>
                
                <div className="Book__Info-tags">
                    <button>Biography</button>
                    <button>Personal Developement</button>
                </div>
                
                <h3>{book.bookDescription}</h3>

                <header>About the author</header>
                <h3>{book.authorDescription}</h3>           
            </div>
        </div>
        
        <div className="Book__Image"><img src={book.imageLink} alt="" /></div>        
    </div>
    </>

  )
}

export default BookInfo