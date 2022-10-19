import React from 'react'
import './Popularmovies.css'
function List({movielist}) {
  return (
    <>
    <h4>Added movies in the list:</h4>
    <ol>{movielist.map(movie=><li>{movie}</li>)}</ol>
    </>
  )
}

export default List
