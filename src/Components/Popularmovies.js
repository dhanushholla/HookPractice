import React, { useState,useEffect } from "react";
import "./Popularmovies.css";
function Popularmovies({ popularmovies,handleclickonpopularlist }) {
  const [posters, setPosters] = useState([]);
  useEffect(()=>{setPosters(
    popularmovies.map(
      (movie) => `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    )
  )},[popularmovies])
  return (
    <>
      <h4 >All time popular ❤️‍🔥:</h4>
      <div className="cards-wrapper">
        {popularmovies.map((movie, index) => (
          <div className="card">
            <img src={posters[index]} alt="poster here" onClick={()=>handleclickonpopularlist(index)} />
            
            <div className="desc">
            <div className="footer">
              <div className="Footer-moviename">{movie.original_title}</div>    
            </div>
            <div className="Footer-rating">Rating :{movie.vote_average}</div><br></br>
              <p>Description:<br></br>{movie.overview}</p>
            </div>
           
          </div>
        ))}
      </div>
    </>
  );
}

export default Popularmovies;
