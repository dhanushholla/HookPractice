import React, { useState, useEffect,useRef } from "react";
import Popularmovies from "./Popularmovies";
import {AiOutlineSearch,AiOutlineUser} from 'react-icons/ai'
import {AiOutlineBell} from 'react-icons/ai'
import Trendmovies from "./Trendmovies";
import './Landingpage.css'
import Detailedview from "./Detailedview";

export const selectedmoviedetailscontext=React.createContext()

function LandingPage() {
  const [trendingmovies, setTrendingmovies] = useState([]);
  const [popularmovies, setPopularmovies] = useState([]);
//   here selected prefixed things are nothing but the thing to displayed under detailedview comp whenever either a movie is selected from trending/popular list
  const[selectedmovie, setSelectedmovie] = useState('');
  const[selectedbackdrop, setSelectedbackdrop] = useState('')
  const[selectedrating, setSelectedrating] = useState('')
  const[selectedoverview, setSelectedoverview] = useState('')
  const[selectedreleasedate,setselectedreleasedate] = useState('')
  const[selector,setselector]=useState(false)
  const [indexor,setindexor] = useState('')

  const resetbackdropref=useRef(null)

  const handleclickontrendlist=(index)=>{
        
        setselector(true) 
        setSelectedmovie(trendingmovies[index].original_title ||trendingmovies[index].original_name  );
        setselectedreleasedate(trendingmovies[index].release_date);
        setSelectedbackdrop(`https://image.tmdb.org/t/p/w500/${trendingmovies[index].backdrop_path}`);
        setSelectedrating(trendingmovies[index].vote_average);
        setSelectedoverview(trendingmovies[index].overview);
        setindexor(index)
        resetbackdropref.current.resetbackdrop();
        
  }
  const handleclickonpopularlist=(index)=>{
    setselector(true)
    setSelectedmovie(popularmovies[index].original_title || popularmovies[index].original_name);
    setselectedreleasedate(popularmovies[index].release_date);
    setSelectedbackdrop(`https://image.tmdb.org/t/p/w500/${popularmovies[index].backdrop_path}`);
    setSelectedrating(popularmovies[index].vote_average);
    setSelectedoverview(popularmovies[index].overview);
    setindexor(index)
    resetbackdropref.current.resetbackdrop();
}


  useEffect(() => {
    Promise.all([
      fetch(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=bc15998854a31257b9edf602e4fb472e"
      ).then((response) => response.json()),
      fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=bc15998854a31257b9edf602e4fb472e"
      ).then((response) => response.json()),
    ])
      .then((data) => {
        console.log(data);
        setTrendingmovies(data[0].results);
        setPopularmovies(data[1].results);
        // handleclickonpopularlist(0);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {/* <h1>Landing page</h1> */}
      <navbar>
        <div className="nav-left">
        <img
            src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F08%2Fmost-used-netflix-icon-boss-baby-info-tw.jpg?w=960&cbr=1&q=90&fit=max" alt="logo miss"
          width='80vw'/>
        <div>Home</div>
        <div>TV Shows</div>
        <div>Movies</div>
        <div>Latest</div>
        <div>My List</div>
        </div>
        <div className="nav-right">
                <div><AiOutlineSearch></AiOutlineSearch></div>
                <div><AiOutlineBell></AiOutlineBell></div>
                <div><AiOutlineUser/></div>
        </div>
      </navbar>
      {selector ?<selectedmoviedetailscontext.Provider value={selectedmovie}>
            <Detailedview trendingmovies={trendingmovies} ratings={selectedrating} overview={selectedoverview} backdrop={selectedbackdrop} releasedate={selectedreleasedate} indexor={indexor} ref={resetbackdropref}/>
       </selectedmoviedetailscontext.Provider> : ""}
       
      <Trendmovies trendingmovies={trendingmovies} handleclickontrendlist={handleclickontrendlist}></Trendmovies>
      <Popularmovies popularmovies={popularmovies} handleclickonpopularlist={handleclickonpopularlist}></Popularmovies>
      
      
    </>
  );
}

export default LandingPage;
