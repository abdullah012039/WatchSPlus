// TrailerPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/layout/MainLayout.module.css';
import style1 from '../styles/components/Movies.module.css';
import IncomingMoviesList from '../components/widgets/IncomingMoviesList';
const TrailerPage = () => {
  const location = useLocation();
  const { trailerUrl, movie } = location.state || {};

  return (
    <div className={styles.container}>
            <div className={styles.mainSlider}>
              {trailerUrl ? (
                <div className={style1.rows}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailerUrl.split('v=')[1]}`}
                  title={`Trailer for ${movie?.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                </div>
              ) : (
                <p>Trailer not available </p>
              )}
              </div>
              <div className={styles.list}>List</div>
              <div className={styles.secondSlider}>
              <IncomingMoviesList />
              </div>
              <div className={styles.thirdSlider}>Third Slider</div>
              <footer className={styles.footer}>Footer</footer>
          </div>
  );
};

export default TrailerPage;
