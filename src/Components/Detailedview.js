import React, { useContext,useState,forwardRef,useImperativeHandle,useReducer } from "react";
import { selectedmoviedetailscontext } from "./LandingPage";
import "./Detailedview.css";
import YouTube from 'react-youtube'
import {FaPlusCircle} from 'react-icons/fa'
import List from "./List";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

   


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
 const {popularmovies,trendingmovies,overview,ratings,releasedate,backdrop,indexor,viewlist} =props
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

  const initiallist=[]
  const reducer=(state,action)=>{
    switch(action){
      case "add":
        return [...state,contextvalue] 
      default:
        return state
    }
  }
  const[movielist,dispatch]=useReducer(reducer,initiallist)
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
            onClick={() =>( 
              trendingmovies.find(movie=>movie.original_title===contextvalue)?
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
            :
            (fetch(
              `https://api.themoviedb.org/3/movie/${popularmovies[indexor].id}?api_key=bc15998854a31257b9edf602e4fb472e&append_to_response=videos`
            )
              .then((res) => res.json())
              .then((result) => (//<YouTube videoId={result.videos.results[0].key}/>
                                  //  console.log("whole result of particular play btn clicked video:",result ,`video link key:${result.videos.results[0].key}`)
                                  // <YouTube videoId={result.videos.results[0].key}></YouTube>)
                                  rendertrailer(result)
                   ))
              .catch((error) => console.log("error occured")))
          )}
          >
            Play trailer
          </button> <nbsp></nbsp><nbsp></nbsp>    
        <button onClick={()=>{dispatch('add')
         toast.success('🥳new moviename added to list! achieved using usereducer with action as add', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    toast.info('click on MY list to view added movies', {
                      position: "top-right",
                      autoClose: 7000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      });
                    }}><FaPlusCircle  fill="red" ></FaPlusCircle></button>
          </div>
  
         
        </div>
        <div className="movie-backdrop-pic">
        {ylink?"":<img src={backdrop} alt="backdrop missing" />}
         {ylink ?<><YouTube videoId={ylink}/> <button  className="btn-closer" onClick={()=>setylink()}>X</button></> :""}
        </div>
      </div>
      <ToastContainer/>
      {viewlist?<List movielist={movielist}></List>:""}
    </>
  )});


export default Detailedview;
