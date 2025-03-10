import { useEffect, useState } from "react";
import "./App.css";
import {getMovieList, searchMovie} from '../src/api'

function App() {

  const [popular, setPopular] = useState([]);

  useEffect(()=>{
    getMovieList().then((result)=>{
      setPopular(result)
    })
  }, [])

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopular(query.results)
    }
    
  };

  const PopularMovies = () =>{
    return popular.map((movie, i) =>{
      return (
          <div className="Movie-Wrapper" key={i}>
              <div className="Movie-Title">{movie.title}</div>
              <img alt="" className="image" src={`${import.meta.env.VITE_BASEIMGURL}/${movie.poster_path}`} />
              <div className="Movie-Date">{movie.release_date}</div>
              <div className="Movie-Rate">{movie.vote_average}</div>
            </div>
      )
    })
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Movie</h1>
          <input
            placeholder="cari film..."
            className="Movie-Search"
            onChange={({ target }) => search(target.value)}
          />

          <div className="Movie-Container">
            <PopularMovies/>
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
