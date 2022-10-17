import React, { useContext } from 'react'
import { selectedmoviedetailscontext } from './LandingPage'
import './Detailedview.css'
function Detailedview({overview,ratings,releasedate,backdrop}) {
    const contextvalue=useContext(selectedmoviedetailscontext)
  return (
    <>
    <div className='selected-movie'>
    <div className='Movie-details'>
      <div className='selected-title'> {contextvalue}</div>
      <div><strong>Overview:</strong> {overview}</div>
      <div><strong>Ratings:</strong> {ratings}</div>
      <div><strong>Release date:</strong> {releasedate}</div>
    </div>
    <div className='movie-backdrop-pic'>
        <img src={backdrop} alt="backdrop missing"/>
    </div>
    </div>
    
    </>
    
  )
}

export default Detailedview
