import React, { useContext,useState,forwardRef,useImperativeHandle } from "react";
import { selectedmoviedetailscontext } from "./LandingPage";
import "./Detailedview.css";
import YouTube from 'react-youtube'

// function Detailedview(forwardRef({ trendingmovies,overview,ratings,releasedate,backdrop,indexor,}),ref) 
// {
//   const[ylink,setylink]= useState('')
//   const contextvalue = useContext(selectedmoviedetailscontext);
//   const resetbackdrop=()=>{
//     setylink('')
//   }
//   useImperativeHandle(ref,()=>{
//     return {
//       resetbackdrop:resetbackdrop
//     }
//   })
//   const rendertrailer = (result )=>{
//     // console.log("whole result of particular play btn clicked video:",result ,`video link key:${result.videos.results[0].key}`) 
//     const trailerlink = result.videos.results.find(video=>video.name === 'Official Trailer')
//     console.log(trailerlink)
//     setylink(trailerlink.key)
//     // return (
//     // //  <YouTube videoId={trailerlink.key} opts={opts}/> 
//     // )
//   }



const  Detailedview= React.forwardRef((props,ref) =>
{
 const {trendingmovies,overview,ratings,releasedate,backdrop,indexor} =props
  const[ylink,setylink]= useState('')
  const contextvalue = useContext(selectedmoviedetailscontext);
  const resetbackdrop=()=>{
    setylink('')
  }
  useImperativeHandle(ref,()=>{
    return {
      resetbackdrop:resetbackdrop
    }
  })
  const rendertrailer = (result )=>{
    // console.log("whole result of particular play btn clicked video:",result ,`video link key:${result.videos.results[0].key}`) 
    const trailerlink = result.videos.results.find(video=>video.name === 'Official Trailer')
    console.log(trailerlink)
    setylink(trailerlink.key)
    // return (
    // //  <YouTube videoId={trailerlink.key} opts={opts}/> 
    // )
  }
  return (
    <>
      <div className="selected-movie">
        <div className="Movie-details">
          <div className="selected-title"> {contextvalue}</div>
          <div>
            <strong>Overview:</strong> {overview}
          </div>
          <div>
            <strong>Ratings:</strong> {ratings}
          </div>
          <div>
            <strong>Release date:</strong> {releasedate}
          </div>
          <div>
          <button
            onClick={() =>
              fetch(
                `https://api.themoviedb.org/3/movie/${trendingmovies[indexor].id}?api_key=bc15998854a31257b9edf602e4fb472e&append_to_response=videos`
              )
                .then((res) => res.json())
                .then((result) => (//<YouTube videoId={result.videos.results[0].key}/>
                                    //  console.log("whole result of particular play btn clicked video:",result ,`video link key:${result.videos.results[0].key}`)
                                    // <YouTube videoId={result.videos.results[0].key}></YouTube>)
                                    rendertrailer(result)
                     ))
                .catch((error) => console.log("error occured"))
          }
          >
            Play trailer
          </button>
          </div>
         
        </div>
        <div className="movie-backdrop-pic">
        {ylink?"":<img src={backdrop} alt="backdrop missing" />}
         {ylink ?<><YouTube videoId={ylink}/> <button onClick={()=>setylink()}> close trailer</button></> :""}
        </div>
      </div>
    </>
  )});


export default Detailedview;
