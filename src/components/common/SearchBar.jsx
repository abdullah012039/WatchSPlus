import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, CircularProgress, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/components/SearchBar.module.css';

function SearchBar() {
    const API_KEY = '1f9419b0c6c524a637ea725cbdd45857';
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('movie'); // Default category
    const navigate = useNavigate();

    useEffect(() => {
        if (search.length > 0) {
            setLoading(true);
            fetch(`https://api.themoviedb.org/3/search/${category}?api_key=${API_KEY}&query=${search}`)
                .then(response => response.json())
                .then(data => {
                    setOptions(data.results || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [search, category]);

    const handleSearch = () => {
        if (search) {
            navigate(`/search?query=${search}&category=${category}`);
        } else {
            navigate('/');
        }
    };

    const handleCategoryChange = (event) => {
        const newCategory = event.target.value;
        setCategory(newCategory);
        if (search.length > 0) {
            navigate(`/search?query=${search}&category=${newCategory}`);
        }
    };

    return (
        <div className={styles.searchBar}>
            <FormControl variant="outlined" className={styles.categorySelect}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category-select"
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                >
                    <MenuItem value="movie">Movies</MenuItem>
                    <MenuItem value="person">People</MenuItem>
                    <MenuItem value="tv">TV Shows</MenuItem>
                    <MenuItem value="company">Companies</MenuItem>
                    <MenuItem value="keyword">Keywords</MenuItem>
                    <MenuItem value="collection">Collections</MenuItem>
                    <MenuItem value="network">Networks</MenuItem>
                </Select>
            </FormControl>
            <Autocomplete
                freeSolo
                options={options.map(option => option.title || option.name)} // Adjusted for different categories
                onInputChange={(event, value) => {
                    setSearch(value);
                    if (value.length > 0) navigate(`/search?query=${value}&category=${category}`);
                    else navigate('/');
                }}
                className={styles.searchInput}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    <FontAwesomeIcon icon={faSearch} />
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                onChange={(event, newValue) => {
                    if (newValue) {
                        navigate(`/search?query=${newValue}&category=${category}`);
                    }
                }}
            />
        </div>
    );
}

export default SearchBar;
