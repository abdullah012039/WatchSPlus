// MovieCard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/components/Movies.module.css';
import { getMovieTrailer } from '../../services/tmdbApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie }) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const trailerData = await getMovieTrailer(movie.id); // Replace with your method to fetch trailer
        if (trailerData && trailerData.results && trailerData.results.length > 0) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailerData.results[0].key}`);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  const handlePlayTrailer = () => {
    if (trailerUrl) {
      navigate(`/trailer/${movie.id}`, { state: { trailerUrl } });
    } else {
      alert('Trailer not available');
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handlePlayTrailer}
    >
      <div className={styles.image} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }} ></div>
      <div className={styles.cardBody}>
        <div className={styles.poster}>
          <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
        </div>
        <button className={styles.playButton}>
            {/* icon play */}
            <FontAwesomeIcon icon={faPlay} />
          </button>
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
