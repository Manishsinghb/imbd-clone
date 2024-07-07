import React from 'react';
import WatchList from './WatchList';
function MovieCard({ movieObj, poster_path, handleAddtoWatchList, handleRemoveFromWatchList, watchlist }) {

  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true
      }
    }
    return false
  }


  return (
    <div className='h-[40vh]  w-[250px]  bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer'
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})` }}>

      {doesContain(movieObj) ? (
        <div onClick={() => handleRemoveFromWatchList(movieObj)} className='m-4 flex justify h-8 w-8 items-center rounded-lg bg-gray-900/60'>&#10060;</div>
      ) : (
        <div onClick={() => handleAddtoWatchList(movieObj)} className='m-4 flex justify h-8 w-8 items-center rounded-lg bg-gray-900/60'>
          &#128525;
        </div>
      )}

    </div>
  );
}

export default MovieCard;








