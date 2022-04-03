import React,{ useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);

  const fetchMoviesHandler = async() => {
    try{
      SetIsLoading(true);
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
      SetIsLoading(false);
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
        {isLoading  && <h2>Loading...</h2>}
        {!isLoading && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
