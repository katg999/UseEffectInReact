import {useState, useEffect}  from 'react';


const KEY = 'cebb18f9'; 

export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

  useEffect( function() {

       
	  const controller = new AbortController();

       
		async function fetchMovies () {
			try{
			setIsLoading(true);
			setError("");
		const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});
		if(!res.ok) throw new Error("Somwthing went wrong with fetching movies")
       

		const data = await res.json();
		if(data.Response === 'False') throw new Error ('Movie not Found');
         
		setMovies(data.Search)
		console.log(data.Search);
		setError('');
		
		
	} catch (err) {
			console.error(err.message);

			if(err.name !== "AbortError"){
			setError(err.message);
			} 
		}  finally {
			setIsLoading(false);
 
		}
		
	
}
       if(query.length < 3){
		setMovies([]);
		setError('');

		// Cleanup function for UseEffect
		return function() {
			controller.abort();
		};

	   }
	   //handleCloseMovie();
	   fetchMovies();

		
	}, [query]);


return {movies, isLoading, error};
}