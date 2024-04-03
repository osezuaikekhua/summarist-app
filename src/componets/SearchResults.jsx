import React from 'react'
import { Link, useLocation } from 'react-router-dom'



  

function SearchResults({data}) {
  const location = useLocation()

  const Reload = () => {
      
      setTimeout(() => {
        if(location.pathname.includes("book"))
          window.location.reload() 
      }, 100);
      
    }

  return (
    <div className='Search__Results'>

      {data.length ?
        data.map(item => (
          <Link to={`/book/${item.id}`}>
            <div className='Search__Results--item' onClick={Reload}>
              <img src={item.imageLink} alt="" />
              <div>
                <h3>{item.title}</h3>
                <h4>{item.author}</h4>
              </div>
            </div>
          </Link>
        ))
        :
        <div>No results found</div>
      }
    </div>
  )
}

export default SearchResults