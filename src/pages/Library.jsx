import React, { useState,useEffect, useContext } from 'react'
import axios from 'axios'
import Book from '../componets/Book'
import { Context } from '../App'
import { Link } from 'react-router-dom'


function Library() {

  const[finishedBooks, setfinishedBooks] = useState([])
  
  const { savedBooks } = useContext(Context)

  async function getBooks( api){
    const { data } = await axios.get(api)
    setfinishedBooks(data)
  }

  useEffect(() => {
    getBooks("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended")
    console.log(finishedBooks)
  },[])
  

  return (
    <>
      <div className="Library__Container">
        <div className="row">
          <section className="Books__Section">
                <h2>Saved Books</h2>
                <p>{`${savedBooks.length} items`}</p>
                {savedBooks.length ?
                  <div className="Books__Section__Container">
                  {
                    savedBooks.map(book => (
                      <Link to={`/book/${book.id}`} >
                        <Book key={book.id}
                              subscriptionRequire={book.subscriptionRequired}
                              imageLink={book.imageLink} 
                              title={book.title} 
                              author={book.author} 
                              subTitle={book.subTitle} 
                              averageRating = {book.averageRating}
                              removeBook = {"delete"}
                        />
                      </Link>
                    ))
                  }
                  
                </div>
                :
                <div className="Books__Section__Container--noContent">
                  <h1>Save you favorite Books!</h1>
                  <p>When you save a book, it will appear here.</p>
                </div>
                }
                
          </section>

          <section className="Books__Section">
                <h2>Finished</h2>
                <p>0 item</p>

                <div className="Books__Section__Container">
                  
                </div>
          </section>
        </div>
      </div>

      
    </>
  )
}

export default Library