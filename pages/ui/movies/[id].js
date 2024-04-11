import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from "@mui/material/Container";

const MovieDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`/api/movies/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const data = await response.json();
                setMovie(data.data.movie);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        if (id) {
            fetchMovie();
        }
    }, [id]);

    if (!id) {
        return null;
    }

    return (
        <Container maxWidth="sm">
            <div>
            {movie ? (
                <h1>{movie.title}</h1>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        </Container>
    );
};

export default MovieDetails;
