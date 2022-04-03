import React,{ useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies] = useState([]);

  const fetchMoviesHandler = async() => {
    try{
      console.log('Loading...');
      const movieFetchValue = await fetch('https://swapi.dev/api/films/');
      const movieJSONValue = await movieFetchValue.json();
      const transformedMovies = await movieJSONValue.results.map(movieData => {
        return{
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      });
      setMovies(transformedMovies)
    }
    catch(err){
      console.log(`Something went wrong...`);
      console.log(`Error: ${err}`);
    }
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
