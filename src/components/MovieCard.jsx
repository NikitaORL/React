
import PropTypes from 'prop-types' // Добавить этот импорт

function MovieCard({ movie }) {
    // Защита от undefined на всякий случай
    if (!movie) {
        return null
    }

    // Получаем год из даты release_date (если есть)
    const releaseYear = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'Неизвестно'

    return (
        <div className="movie-card">
            <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Год: {releaseYear}</p>
            <p>Рейтинг: {movie.vote_average}</p>
        </div>
    )
}

// Добавить описание типов пропсов
MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number
    }).isRequired
}

export default MovieCard