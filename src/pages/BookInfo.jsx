import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'

import { CiStar } from "react-icons/ci";
import { IoBookmark, IoMicOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { SlBookOpen } from "react-icons/sl";
import { ImBooks } from "react-icons/im";
import { FaTrash } from "react-icons/fa6";

import Skeleton from '../componets/Skeleton';
import { Context } from '../App';
import { useSelector } from 'react-redux';


function BookInfo() {
    const { id } = useParams()
    const [book, setBook] = useState({})

    const [savedStatus, setSavedStatus] = useState("Add title to My Library")
    const [isSaved, setIsSaved] = useState(false)

    const { showModule } = useContext(Context)
    const { savedBooks } = useContext(Context)

    const loggedIn = useSelector(state => state.user.User_Email)
    const premiumState = useSelector(state => state.user.User_Premium)

    //Fetching data from API
    async function fetchBook() {
        const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
        setBook(data)
    }

    useEffect(() => {
        fetchBook()
    }, [])

    var element = {};
    //Save book
    function SavedBooks() {
        element = {
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.subTitle,
            imageLink: book.imageLink,
            averageRating: book.averageRating,
            subscriptionRequired: book.subscriptionRequired
        }

        savedBooks.push(element)
    }
    
    function deleteBook(){

        for(let i = 0; i < savedBooks.length; i++){
            if(savedBooks[i].id === book.id){
                savedBooks.splice(i,1)
            }
        }
        
    }
    
    useEffect(() => {

        setTimeout(()=>{
         
        }, 1000)
    
      }, [])
        



    return (
        <>
            {!book.length ?
                <div className="Book__Info__Page">
                    <div className='Book__Info__Page--row'>
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
                                    </div>
                                    <div className='Book__Info-group_child'>
                                        <div> <IoMicOutline /> <h5>{book.type}</h5> </div>
                                    </div>
                                    <div className='Book__Info-group_child'>
                                        <div> <HiOutlineLightBulb /> <h5>{`${book.keyIdeas} Key ideas`}</h5> </div>
                                    </div>
                                </div>
                                {loggedIn ?
                                    book.subscriptionRequired ?
                                        !premiumState ?
                                            <div className='Book__Info-read'>
                                                <Link to={`/player/${book.id}`}>
                                                    <button>
                                                        <SlBookOpen />
                                                        <div>Read</div>
                                                    </button>
                                                </Link>
                                                <Link to={`/player/${book.id}`}>
                                                    <button>
                                                        <HiOutlineMicrophone />
                                                        <div>Listen</div>
                                                    </button>
                                                </Link>
                                            </div>
                                            :
                                            <div className='Book__Info-read'>
                                                <Link to={'/choose-plan'}>
                                                    <button>
                                                        <SlBookOpen />
                                                        <div>Read</div>
                                                    </button>
                                                </Link>
                                                <Link to={'/choose-plan'}>
                                                    <button>
                                                        <HiOutlineMicrophone />
                                                        <div>Listen</div>
                                                    </button>
                                                </Link>
                                            </div>
                                        :
                                        <div className='Book__Info-read'>
                                            <Link to={`/player/${book.id}`}>
                                                <button>
                                                    <SlBookOpen />
                                                    <div>Read</div>
                                                </button>
                                            </Link>
                                            <Link to={`/player/${book.id}`}>
                                                <button>
                                                    <HiOutlineMicrophone />
                                                    <div>Listen</div>
                                                </button>
                                            </Link>
                                        </div>
                                    :
                                    <div className='Book__Info-read'>
                                        <button onClick={showModule}>
                                            <SlBookOpen />
                                            <div>Read</div>
                                        </button>
                                        <button onClick={showModule}>
                                            <HiOutlineMicrophone />
                                            <div>Listen</div>
                                        </button>
                                    </div>
                                }
                                <div className='Book__Info-library'>
                                    <div className="Book__Info-library--btn unsaved" onClick={SavedBooks}>
                                        <i><ImBooks style={{ fontSize: 27 }} /></i>
                                        <h2 >Save</h2>
                                    </div>
                                    <div className="Book__Info-library--btn saved" onClick={deleteBook}>
                                        <i><FaTrash style={{ fontSize: 27, color: "#870000" }} /> </i>
                                        <h2 style={{ color: "#870000" }}>Delete</h2>
                                    </div> 
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
                </div>
                :
                <div className="Book__Info__Page">
                    <div className='Book__Info__Page--row'>
                        <div className="Book__Info">
                            <div className="Book__Info">
                                <div className='Book__Info-title'>
                                    <Skeleton width={"550px"} height={"20px"} borderRadius={"15px"} />
                                </div>
                                <h4 className='Book__Info-author'><Skeleton width={"150px"} height={"20px"} borderRadius={"15px"} /></h4>
                                <h2 className='Book__Info-subTitle'><Skeleton width={"250px"} height={"20px"} borderRadius={"15px"} /></h2>
                                <div className='Book__Info-group'>
                                    <div className='Book__Info-group_child'>
                                        <Skeleton width={"100px"} height={"20px"} borderRadius={"15px"} />
                                    </div>
                                    <div className='Book__Info-group_child'>
                                        <Skeleton width={"100px"} height={"20px"} borderRadius={"15px"} />
                                    </div>
                                    <div className='Book__Info-group_child'>
                                        <Skeleton width={"100px"} height={"20px"} borderRadius={"15px"} />
                                    </div>
                                </div>

                                <div className='Book__Info-read'>
                                    <Skeleton width={"100px"} height={"40px"} borderRadius={"15px"} />
                                    <Skeleton width={"100px"} height={"40px"} borderRadius={"15px"} />
                                </div>

                                <div className="Book__Info-library" onClick={SavedBooks}>
                                    <Skeleton width={"100px"} height={"20px"} borderRadius={"15px"} />
                                </div>
                                <header><Skeleton width={"125px"} height={"20px"} borderRadius={"15px"} /></header>

                                <div className="Book__Info-tags">
                                    <Skeleton width={"100px"} height={"40px"} borderRadius={"15px"} />
                                    <Skeleton width={"100px"} height={"40px"} borderRadius={"15px"} />
                                </div>

                                <h3><Skeleton width={"500px"} height={"300px"} borderRadius={"15px"} /></h3>

                                <header><Skeleton width={"125px"} height={"20px"} borderRadius={"15px"} /></header>
                                <h3><Skeleton width={"500px"} height={"300px"} borderRadius={"15px"} /></h3>
                            </div>
                        </div>
                        <div className="Book__Image"><Skeleton width={"250px"} height={"300px"} borderRadius={"15px"} /></div>
                    </div>
                </div>
            }
        </>
    )
}

export default BookInfo

