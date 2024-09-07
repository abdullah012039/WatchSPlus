import React from 'react';
import { useState } from 'react';
import FeaturedMoviesList from '../components/widgets/FeaturedMoviesList';
import  Layouts from '../styles/layout/MainLayout.module.css';
import MainLayout from '../components/layout/MainLayout';
import UpNextMovies from '../components/widgets/UpNextMovies';
import IncomingMoviesList from '../components/widgets/IncomingMoviesList';
import TopRatedMoviesList from '../components/widgets/TopRatedMoviesList';

const HomePage = () => {
  const [movies, setMovies] = useState([]); // لتخزين الأفلام القادمة
  const [currentIndex, setCurrentIndex] = useState(0); // لتتبع الفيلم الحالي

  const handleSetMovies = (moviesList, index) => {
    setMovies(moviesList);
    setCurrentIndex(index);
  };
  return (
    <MainLayout>
      <div className={Layouts.mainSlider}>
        <FeaturedMoviesList setMovies={handleSetMovies} />
      </div>
      <div className={Layouts.list}>
        <UpNextMovies movies={movies} currentIndex={currentIndex} />
      </div>
      <div className={Layouts.secondSlider}>
        <IncomingMoviesList />
      </div>
      <div className={Layouts.thirdSlider}>
        <TopRatedMoviesList />
      </div>
      <footer className={Layouts.footer}>Footer</footer>
    </MainLayout>
  );
};

export default HomePage;
