import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import Form from "./components/Form/Form";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [checkError, setError] = useState(null);
  const [reload, setReload] = useState(true);


  const fetchMoviesHandler = useCallback(async () => {
    setError(null);
    try {
      SetIsLoading(true);
      const response = await fetch(
        "https://movie-reactapp-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong...Retrying...");
      }
      const data = await response.json();
      console.log(data);
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      SetIsLoading(false);
      setMovies(loadedMovies);
    } catch (error) {
      SetIsLoading(false);
      setError(error.message);
    }
  }, []);


  const formHandler = useCallback(async (movie) => {
    try {
      const response = await fetch(
        "https://movie-reactapp-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log("Something Went wrong!!!!");
    }
  }, []);


  const deleteHandler = useCallback( async (id) => {
    try {
    console.log(id);
    await  fetch(`https://movie-reactapp-default-rtdb.firebaseio.com/movies/${id}.json`, {
        method: "DELETE",
      });
    } catch (err) {
      console.log('Delete UnSuccessful!!')
    }
  },[]);


  useEffect(fetchMoviesHandler, [fetchMoviesHandler]);
 useEffect(fetchMoviesHandler,[deleteHandler])

  return (
    <React.Fragment>
      <section>
        <Form onClick={formHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <h2>Loading...</h2>}
        {!isLoading && checkError && <h2> {checkError} </h2>}
        {!isLoading && checkError && <button>Cancel</button>}
        {!isLoading && <MoviesList movies={movies} onDelete={deleteHandler} />}
      </section>
    </React.Fragment>
  );
}

export default App;
