import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Skeleton, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import styles from '../styles/pages/SearchPage.module.css';

function SearchPage() {
    const API_KEY = '1f9419b0c6c524a637ea725cbdd45857';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const category = queryParams.get('category');

    useEffect(() => {
        if (query && category) {
            setLoading(true);
            fetch(`https://api.themoviedb.org/3/search/${category}?api_key=${API_KEY}&query=${query}`)
                .then(response => response.json())
                .then(data => {
                    setResults(data.results || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [query, category]);

    const getImageUrl = (result) => {
        switch (category) {
            case 'movie':
            case 'tv':
                return result.poster_path
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image';
            case 'person':
                return result.profile_path
                    ? `https://image.tmdb.org/t/p/w500${result.profile_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image';
            case 'company':
                return result.logo_path
                    ? `https://image.tmdb.org/t/p/w500${result.logo_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image';
            case 'collection':
                return result.poster_path
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image';
            case 'network':
                return result.logo_path
                    ? `https://image.tmdb.org/t/p/w500${result.logo_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image';
            default:
                return 'https://via.placeholder.com/500x750?text=No+Image';
        }
    };

    const getTitle = (result) => {
        switch (category) {
            case 'movie':
            case 'collection':
                return result.title || result.name;
            case 'tv':
            case 'person':
            case 'company':
            case 'network':
                return result.name;
            case 'keyword':
                return 'Keyword Result';
            default:
                return 'No Title';
        }
    };

    const renderSkeletons = () => (
        <Grid container spacing={3}>
            {Array.from(new Array(8)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card className={styles.resultCard} sx={{ backgroundColor: '#424242', color: '#ffffff' }} >
                        <Skeleton variant="rectangular" width="100%" height={300} />
                        <CardContent>
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="text" width="40%" />
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <div className={styles.searchPage}>
            <Typography variant="h4" component="h2" className={styles.title}>
                Search Results for "{query}" in {category}
            </Typography>
            {loading ? (
                renderSkeletons()
            ) : (
                <Grid container spacing={3}>
                    {results.length === 0 && category === 'keyword' ? (
                        <Typography variant="h6" component="p" className={styles.noResults}>
                            No results for the keyword "{query}"
                        </Typography>
                    ) : (
                        results.map((result) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={result.id}>
                                <Card className={styles.resultCard} sx={{ backgroundColor: '#424242', color: '#ffffff' }} >
                                    {category !== 'keyword' && (
                                        <CardMedia
                                            component="img"
                                            alt={getTitle(result)}
                                            image={getImageUrl(result)}
                                            className={styles.media}
                                        />
                                    )}
                                    <CardContent>
                                        <Typography variant="h6" component="h3" className={styles.titleText}>
                                            {getTitle(result) + " " + (result.adult ? "🔞" : "")}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            )}
        </div>
    );
}

export default SearchPage;
