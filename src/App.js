import logo from './logo.svg';
import './App.css';
import LandingPage from './Components/LandingPage';
import Searchcomp from './Components/Searchcomp';
import {Routes,Route, BrowserRouter} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage></LandingPage>}></Route>
        <Route path='/search' element= {<Searchcomp></Searchcomp>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
