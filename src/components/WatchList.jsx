import React from 'react';
import { useState, useEffect } from 'react';
import genreids from '../Utility/genre'
function WatchList({ watchlist, setWatchList ,hanleRemoveFromWatchList}) {
  const [search, setSearch] = useState('')
  const [genreList ,setGenreList] = useState(['All Genre'])
  const [currGenre,setCurrGenre] = useState('All Genre')
  let handleSearch = (e) => {
    setSearch(e.target.value)

  };

  let handleFilter = (genre)=>{
    setCurrGenre(genre)
  }

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average
    })
    setWatchList([...sortedIncreasing])

  }


  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average
    })
    setWatchList([...sortedDecreasing])
  }

  useEffect(()=>{
    let temp = watchlist.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]]
    })
    temp = new Set(temp)
     setGenreList(['All Genre', ...temp])
     console.log(temp);
  },[watchlist])
  return (
    <>
      <div className='flex justify-center items-center flex-wrap mx-4'>
        {genreList.map((genre)=>
        {return <div onClick={()=>handleFilter(genre)} className={currGenre==genre?'bg-blue-400 flex justify-center items-center h-[3rem] w-[9rem] rounded-xl font-bold text-white mx-4': 'bg-gray-400 flex justify-center items-center h-[3rem] w-[9rem] rounded-xl font-bold text-white mx-4'}>{genre}</div>})}
        
      
      </div>

      <div className='flex justify-center my-4'>
        <input onChange={handleSearch} value={search} type="text" placeholder='Search Movies' className='h-[3rem] w-[18rem] bg-gray-200 outline-none px-4' />
      </div>

      <div className='overflow-hidden rounded-lg border border-gray m-8'>
        <table className='w-full text-gray-500 text-center'>
          <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <th className='flex justify-center'>
                <div onClick={sortIncreasing} className='p-2'><i class="fa-solid fa-arrow-up"></i></div>
                <div className='p-2'>Rating</div>
                <div onClick={sortDecreasing} className='p-2'><i class="fa-solid fa-arrow-down"></i></div>
              </th>

              <th>Popularity</th>
              <th>genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter((movieObj)=>{
              if(currGenre=='All Genre'){
                return true;
              }else{
                return genreids[movieObj.genre_ids[0]]==currGenre;
              }
            }).filter((movieObj) => {
              return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())
            }).map((movieObj) => (
              <tr className='border-b-2' key={movieObj.id}>
                <td className='flex items-center px-6 py-4'>
                  <img className='h-[6rem] w-[10rem]' src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} alt={movieObj.title} />
                  <div className='mx-10'>{movieObj.title}</div>
                </td>
                <td>{movieObj.vote_average}</td>
                <td>{movieObj.popularity}</td>
                <td>{genreids[movieObj.genre_ids[0]]}</td>
                <td onClick={()=> hanleRemoveFromWatchList(movieObj)} className='text-red-700 cursor-pointer'>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;

