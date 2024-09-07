import React, { useEffect, useState } from 'react';
import { getTopRatedMovies } from '../../services/tmdbApi';
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/components/IncomingMoviesList.module.css'; // Import CSS module

function TopRatedMoviesList() {
    const [movies, setLocalMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await getTopRatedMovies();
            setLocalMovies(response.results);
        };
        fetchMovies();
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,  // Number of cards to show at once
        slidesToScroll: 7,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const currentDate = new Date();
    
    return (
        <Box sx={{ padding: '20px' }}>
            <Slider {...sliderSettings}>
                {movies.map(movie => {
                    const movieDate = new Date(movie.release_date);
                    const isRecent = (currentDate - movieDate) < (365 * 24 * 60 * 60 * 1000); // Released within the past year
                    const isTrained = movie.vote_average >= 8 && isRecent;

                    return (
                        <Card
                            key={movie.id}
                            className={isTrained ? `${styles.card} ${styles.trained}` : styles.card}
                        >
                            <CardMedia
                                component="img"
                                className={styles.cardMedia}  // Use CSS module class
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <CardContent className={styles.movieDetails}>
                                <Typography gutterBottom variant="h6" component="div">
                                    <div className={styles.movieTitle}>{movie.title}</div> 
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    {movie.overview.length > 20
                                        ? movie.overview.substring(0, 20) + "..."
                                        : movie.overview}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </Slider>
        </Box>
    );
}

export default TopRatedMoviesList;
