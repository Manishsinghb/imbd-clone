import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

function Movies({ handleAddtoWatchList, handleRemoveFromWatchList, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo === 1) {
      setPageNo(pageNo);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=894d105349bdd1a8bd27eec96f39cc68&language=en-US&page=${pageNo}`)
      .then((res) => setMovies(res.data.results));
  }, [pageNo]);

  return (
    <div className='p-5'>
      <div className='text-2xl m-5 font-bold text-center bg-slate-400'>
        Trending Movies
      </div>
      <div className='flex flex-row flex-wrap justify-around'>
        {movies.map((movieObj) => (
          <MovieCard
            key={movieObj.id}
            movieObj={movieObj}
            poster_path={movieObj.poster_path}
            handleAddtoWatchList={handleAddtoWatchList}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
            watchlist={watchlist}
          />
        ))}
      </div>
      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
}

export default Movies;


