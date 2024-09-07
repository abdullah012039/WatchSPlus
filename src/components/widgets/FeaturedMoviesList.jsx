
import FeaturedListState from '../../features/hooks/useFeaturedList'; // عدّل المسار حسب مكان الملف
import styles from '../../styles/components/Movies.module.css';
import MovieCard from '../common/MovieCard';
import TrailerPage from '../../pages/TrailerPage';

const FeaturedMoviesList = ({ setMovies }) => {
  const {
    movies,
    loading,
    error,
    currentIndex,
    showTrailer,
    currentMovie,
    movetoLeft,
    movetoRight,
    handleCloseTrailer,
    setShowTrailer,
  } = FeaturedListState(setMovies);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const previousIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === movies.length - 1 ? 0 : currentIndex + 1;

  return (
    <div onMouseEnter={()=> setShowTrailer(true)} onMouseLeave={()=> setShowTrailer(false)} className={styles.slider}>
      <div className={styles.rows}>
          <>
            <MovieCard
              key={movies[previousIndex].id}
              movie={movies[previousIndex]}
              className={styles.previous}
              
            />
            <MovieCard
              key={movies[currentIndex].id}
              movie={movies[currentIndex]}
              isHidden={false}
              className={styles.current}
              
            />
            <MovieCard
              key={movies[nextIndex].id}
              movie={movies[nextIndex]}
              className={styles.next}
              
            />
          </>
      </div>
      <button onClick={movetoLeft} className={styles.leftButton}>{"<"}</button>
      <button onClick={movetoRight} className={styles.rightButton}>{">"}</button>
    </div>
  );
};

export default FeaturedMoviesList;
