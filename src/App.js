import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import { Routes,Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {
    const [movies,setMovies] = useState();
      const [movie, setMovie] = useState();
      const [reviews, setReviews] = useState([]);

      const getMovies = async () =>{
    
    try
    {
      const response = await api.get("http://localhost:8080/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);
    } 
    catch(err)
    {
      console.log(err);
    }
  }
  
   const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`http://localhost:8080/api/v1/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }
    useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path = '/' element = {<Layout/>}>
          <Route path = '/' element = {<Home movies = {movies}/>}/>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
          <Route path="*" element = {<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;



// This defines a functional component named App.

// This line uses the useState hook to create a state variable called setMovies. The useState function returns an array where the first element is the current state value, and the second element is a function to update that value. In this case, it looks like the code is destructuring the array to get only the second element (the update function), and it's being named setMovies. However, it's important to note that setMovies is typically used as a function to update the state, not as the state itself.

  // const getMovies = async () => {
// This line declares an asynchronous function getMovies. Async functions are a way to work with asynchronous code using the async/await syntax.

  // useEffect(() => {
  //   getMovies();
  // }, [])
// This uses the useEffect hook, which is called after the component renders. In this case, it's used to trigger the getMovies function when the component mounts (due to the empty dependency array []). This ensures that the data fetching happens only once when the component is first rendered.

