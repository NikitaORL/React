import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import './Home.css'

function Home() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const API_KEY = import.meta.env.VITE_API_KEY
                console.log('API Key:', API_KEY) // Проверяем ключ

                if (!API_KEY) {
                    throw new Error('API ключ не найден! Проверьте .env файл')
                }

                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU`
                )

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`)
                }

                const data = await response.json()
                console.log('Фильмы загружены:', data.results.length)
                setMovies(data.results)
                setLoading(false)
            } catch (err) {
                console.error('Ошибка загрузки:', err)
                setError(err.message)
                setLoading(false)
            }
        }

        fetchMovies()
    }, [])

    if (loading) {
        return <div className="loading">Загрузка фильмов...</div>
    }

    if (error) {
        return (
            <div className="error">
                <h2>Ошибка: {error}</h2>
                <p>Проверьте API ключ в файле .env</p>
                <p>Ключ должен быть: VITE_API_KEY=ваш_ключ_здесь</p>
            </div>
        )
    }

    return (
        <div className="home">
            <h1>Популярные фильмы</h1>
            <div className="movies-grid">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Home