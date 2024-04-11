import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/api/movies');
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <Container maxWidth="sm">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" sx={{mb: 2}}>
                    List of Movies
                </Typography>
                <ul>
                    {Array.isArray(movies.data) && movies.data.map((movie) => (
                        <li key={movie.id}>
                            <Link href={`/ui/movies/${movie.id}`} passHref>
                                <p>{movie.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Box>
        </Container>
    );
}
