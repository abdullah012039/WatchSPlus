// CastSlider.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getMovieCredits } from '../../services/tmdbApi';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/components/CastSlider.module.css'; // Assuming you're using CSS modules

const CastSlider = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await getMovieCredits(movieId);
        setCast(response.cast);
      } catch (error) {
        console.error('Failed to fetch cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box className={styles.castSliderContainer}>
      <Slider {...settings}>
        {cast.map((member) => (
          <Card key={member.id} className={styles.castCard}>
            <CardMedia
              component="img"
              height="140"
              image={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
              alt={member.name}
            />
            <CardContent>
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {member.character}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default CastSlider;
