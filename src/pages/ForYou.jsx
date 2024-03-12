import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IoMdPlayCircle } from "react-icons/io";
import { Link } from 'react-router-dom'
import Book from '../componets/Book';
import Skeleton from '../componets/Skeleton';



function ForYouPage( ) {





    const[selectedBooks, setSelectedBooks] = useState([])
    const[recommendedBooks, setrecommendedBooks] = useState([])
    const[suggestedBooks, setSuggestedBooks] = useState([])

    async function getBooks(constVal, api){
      const { data } = await axios.get(api)
      constVal(data)
    }


    useEffect(() => {
      getBooks(setSelectedBooks, 'https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected')
      getBooks(setrecommendedBooks, "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended")
      getBooks(setSuggestedBooks, "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested")
    },[])
    
  return (
    <> 
      <div className='ForYou__Container'>

        <section>
            <h2>Selected just for you</h2>
            
            {selectedBooks.length ?
              selectedBooks.map(book => (
                <div className='Selected__Book__Section' key={book.id} >
                  <p>{book.subTitle}</p>
                  <div className='line'></div>
                  <div className='Selected__Book__area'>
                      <img className='Selected__Book' src={book.imageLink} alt="" />
                      <div className="Selected__Book__Info">
                          <h1>{book.title}</h1>
                          <h2>{book.author}</h2>
                          <div><IoMdPlayCircle /> <h3>3mins 23secs</h3> </div>
                      </div>
                  </div>
                </div>
              )) 
              :
                <Skeleton width = {"100%"} maxWidth = {"700px"} height = {"175px"} marginBottom = {"15px"}/>
              }
        </section>

        <section className="Books__Section">
            <h2>Recommended For You</h2>
            <p>We think you'll like these</p>

            <div className="Books__Section__Container">
                {recommendedBooks.length ?
                  recommendedBooks.slice(0,4).map(book => (
                    <Link to={`/book/${book.id}`} >
                    <Book key={book.id}
                          subscriptionRequire={book.subscriptionRequired}
                          imageLink={book.imageLink} 
                          title={book.title} 
                          author={book.author} 
                          subTitle={book.subTitle} 
                          averageRating = {book.averageRating}
                    />
                    </Link>
                   )) 
                :    
                Array(4).fill(0).map(() => (
                  <div className="Book">
                    <Skeleton width = {"150px"} height = {"175px"} marginBottom = {"15px"}/>
                    <Skeleton width = {"150px"} height = {"15px"}  marginBottom = {"15px"}/>
                    <Skeleton width = {"75px"}  height = {"15px"}  marginBottom = {"15px"}/>
                    <Skeleton width = {"150px"} height = {"15px"}  marginBottom = {"5px"}/>
                    <Skeleton width = {"150px"} height = {"15px"}  marginBottom = {"5px"}/>
                    <Skeleton width = {"150px"} height = {"15px"}  marginBottom = {"5px"}/>
                </div>    
                ))
              
              
                }
                
                

            </div>
        </section>

        <section className="Books__Section">
            <h2>Suggested Books</h2>
            <p>We think you'll like these</p>

            <div className="Books__Section__Container">
                {suggestedBooks.length ?
                  suggestedBooks.slice(0,4).map(book => (
                    <Link to={`/book/${book.id}`}  >
                    <Book key={book.id}
                          subscriptionRequire={book.subscriptionRequired}
                          imageLink={book.imageLink} 
                          title={book.title} 
                          author={book.author} 
                          subTitle={book.subTitle} 
                          averageRating = {book.averageRating}
                    />
                    </Link>
                )) :
                Array(4).fill(0).map(() => (
                  <div className="Book">
                    <Skeleton width = {"150px"} height = {"175px"} marginBottom = {"15px"}/>
                    <Skeleton width = {"150px"} height = {"15px"}  marginBottom = {"15px"}/>
                    <Skeleton width = {"75px"}  height = {"15px"}  marginBottom = {"15px"}/>
                    <Skeleton width = {"150px"} height = {"15px"}  marginBottom = {"5px"}/>
                    <Skeleton width = {"150px"} height = {"15px"}  marginBottom = {"5px"}/>
                    <Skeleton width = {"150px"} height = {"15px"}  marginBottom = {"5px"}/>
                </div>    
                ))
              }
              </div>
        </section>


      </div>
    
    </>
  )
}

export default ForYouPage