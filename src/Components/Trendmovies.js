import React, { useEffect, useState } from "react";
import "./Popularmovies.css";
function Trendmovies({ trendingmovies,handleclickontrendlist }) {
  const [posters, setPosters] = useState([]);
  useEffect(() => {
    setPosters(
      trendingmovies.map(
        (movie) => `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      )
    );
  }, [trendingmovies]);

  return (
    <>
      <h4>Trending this week🔥:</h4>
      <div className="cards-wrapper">
        {trendingmovies.map((movie, index) => (
          <div className="card">
            <img src={posters[index]} alt="poster here" onClick={()=>handleclickontrendlist(index)} />
           
            <div className="desc">
            <div className="footer">
              <div className="Footer-moviename">{movie.original_title}</div>
            </div>
              Rating :<div className="Footer-rating">{movie.vote_average}</div>
              <br></br>
              <p>
                Description:<br></br>
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Trendmovies;
