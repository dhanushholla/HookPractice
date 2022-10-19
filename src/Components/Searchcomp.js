import React,{useState,useEffect} from 'react'
import './Popularmovies.css'
import './Detailedview.css'
import {AiOutlineSearch,AiOutlineUser} from 'react-icons/ai'
import {AiOutlineBell} from 'react-icons/ai'
import './Landingpage.css'
import {Link} from "react-router-dom"


function Searchcomp() {
    const[searchstring,setsearchstring]= useState('')
    const[rsp,setrsp]=useState()
    const[localtitle,setlocaltitle]=useState('')
    const[localreleasedate,setlocalreleasedate]=useState('')
    const[localrating,setlocalrating]=useState('')
    const[localoverview,setlocaloverview]=useState('')
    const[localbackdrop,setlocalbackdrop]=useState('')
    const[selections,setselections]=useState()
    const setimagesselection =(result)=>{
      setrsp(result.results)
      setselections("")
    }
    const handleselection=(index)=>{
        setselections(true)
        setlocalbackdrop(`https://image.tmdb.org/t/p/w500/${rsp[index].backdrop_path }` )
        setlocalreleasedate(rsp[index].release_date)
        setlocaloverview(rsp[index].overview)
        setlocaltitle(rsp[index].original_title || rsp[index].original_name)
        setlocalrating(rsp[index].vote_average)
    }
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=bc15998854a31257b9edf602e4fb472e&language=en-US&query=${searchstring}&page=1&include_adult=true`)
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setimagesselection(result)
    })
        .catch(error=>console.log("error lae"))
    },[searchstring])

  return (
    <>
    <navbar>
        <div className="nav-left">
        <img
            src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F08%2Fmost-used-netflix-icon-boss-baby-info-tw.jpg?w=960&cbr=1&q=90&fit=max" alt="logo miss"
          width='80vw'/>
        <Link to='/'><div>Home</div></Link>
        <div>TV Shows</div>
        <div>Movies</div>
        <div>Latest</div>
        <div>My List</div>
        </div>
        <div className="nav-right">
             <Link to="/search"><div><AiOutlineSearch></AiOutlineSearch></div></Link>  
                <div><AiOutlineBell></AiOutlineBell></div>
                <div><AiOutlineUser/></div>
        </div>
      </navbar>
      <input type="text" placeholder="Search movie name" value={searchstring} onChange={(e)=>setsearchstring(e.target.value)}/>
      { selections? <div>
        <div className="selected-movie">
        <div className="Movie-details">
          <div className="selected-title"> {localtitle}</div>
          <div>
            <strong>Overview:</strong> {localoverview}
          </div>
          <div>
            <strong>Ratings:</strong> {localrating}
          </div>
          <div>
            <strong>Release date:</strong> {localreleasedate}
          </div>
          <div>
          </div>
        </div>
        <div className="movie-backdrop-pic">
            <img src={localbackdrop} alt="backdrop missing" />
        </div>
      </div>

        </div>:""
    }
 
         {rsp?<div><h4>Search Results 🕵🏻‍♂️ :</h4></div>:<h4>GO ON MAKE A MOVIE SEARCH!!</h4>}
        <div className='cards-wrapper'>
            {rsp && rsp.map((resp,index)=>(
                    resp.poster_path != null ? 
                    <div className="card">
                        <img src={`https://image.tmdb.org/t/p/w500/${resp.poster_path}` || `https://image.tmdb.org/t/p/w500/${resp.backdrop_path}`} alt="poster here" onClick={()=>handleselection(index)}  />    
                        <div className="desc">
                        <div className="footer">
                        <div className="Footer-moviename">{resp.original_title}</div>    
                        </div>
                        <div className="Footer-rating">Rating :{resp.vote_average}</div><br></br>
                        <p>Description:<br></br>{resp.overview}</p>
                        </div>
                    </div>:""
            ))
            }   
        </div>
   
       
    </>
  
  )
}

export default Searchcomp
