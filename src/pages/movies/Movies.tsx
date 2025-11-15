import { useState } from "react"
import { NavLink } from "react-router"
import { useEffect, useCallback } from "react"
import ApiClient from "../../utils/ApiClient"


interface Movie {
    _id : string,
    title : string,
    releaseDate : string,
    director : string,
    createdAt : string,
    updatedAt : string
}

function Movies(){
    const [movies, setMovies] = useState<Movie[]>([])

    const fetchMovies = useCallback(async () => {
        const response = await ApiClient.get("/movie")

        if(response.status === 200){
            setMovies(response.data.data)
        }
    }, [])

    useEffect(() => {
        fetchMovies()
    }, [fetchMovies])

        return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
            <h2>Movie Pages</h2>
            <NavLink to="/add-movie" className="btn btn-primary">Add Movie</NavLink>
        </div>
    </div>
}

export default Movies