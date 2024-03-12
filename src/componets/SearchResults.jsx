import React from 'react'
import { Link } from 'react-router-dom'

/*
* Testing reload --> Add back in if I get data saving working OR Delete if I figure out how to re-render bookInfo page

  const Reload = () => {
    setTimeout(() => {
    window.location.reload() 
    }, "300");
    
  }
*/
function SearchResults({data}) {
  return (
    <div className='Search__Results'>

      {data.length ?
        data.map(item => (
          <Link to={`/book/${item.id}`}>
            <div className='Search__Results--item'>
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