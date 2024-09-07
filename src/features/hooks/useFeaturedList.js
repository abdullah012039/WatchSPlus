// useFeaturedList.js
import { useState, useEffect } from "react";
import { getPopularMovies } from "../../services/tmdbApi";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
const useFeaturedMovies = (setMovies) => {
  const [movies, setLocalMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [isTranslate, setIsTranslate] = useState(false);
  const intervalIdRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setLocalMovies(data.results);
        setMovies(data.results, currentIndex);
      } catch (error) {
        setError('Failed to load popular movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [setMovies, currentIndex]);

  useEffect(() => {
    const startInterval = setInterval(() => {
      if (!showTrailer) {
        setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
        setIsTranslate(true);
      }
    }, 5000);
    intervalIdRef.current = startInterval ;

    return () => clearInterval(intervalIdRef.current);
  }, [movies.length, showTrailer]);
  
  const movetoLeft = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const movetoRight = () => {
      setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };



  const handleCloseTrailer = () => {
    setShowTrailer(false);
    navigate('/');
  };

  return {
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
  };
};

export default useFeaturedMovies;
