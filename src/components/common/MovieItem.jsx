// MovieItem.jsx
import React from 'react';
import styles from '../../styles/components/MovieItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
const MovieItem = ({ movie, onPlayTrailer }) => {
  return (
    <div className={styles.movieItem}>
      <div className={styles.poster}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      </div>
      <div className={styles.info}>
        <button onClick={onPlayTrailer} className={styles.playButton}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <div className={styles.details}>
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
