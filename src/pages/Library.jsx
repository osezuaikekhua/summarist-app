import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Book from '../componets/Book'


function Library() {

  const[finishedBooks, setfinishedBooks] = useState([])

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
        <section className="Books__Section">
              <h2>Saved Books</h2>
              <p>0 items</p>

              <div className="Books__Section__Container">
                
              </div>
        </section>

        <section className="Books__Section">
              <h2>Finished</h2>
              <p>9 item</p>

              <div className="Books__Section__Container">
                
              </div>
        </section>


      </div>

      
    </>
  )
}

export default Library