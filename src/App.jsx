import './App.css';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import WatchList from './components/WatchList';
import Banner from './components/Banner';
import { BrowserRouter, Routes, Route, json } from 'react-router-dom';
import { useState ,useEffect } from 'react';

function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddtoWatchList = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem('moviesApp',JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

  let hanleRemoveFromWatchList = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id
    })
    

    setWatchList(filteredWatchlist)
    localStorage.setItem('moviesApp', JSON.stringify(filteredWatchlist))
  }

  useEffect(()=>{
    let moviesFromLocalStroage = localStorage.getItem('moviesApp')
    if(!moviesFromLocalStroage){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStroage))
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<><Banner /><Movies watchlist={watchlist} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={hanleRemoveFromWatchList} /></>} />
          <Route path='/watchlist' element={<WatchList watchlist={watchlist} setWatchList={setWatchList} hanleRemoveFromWatchList={hanleRemoveFromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

