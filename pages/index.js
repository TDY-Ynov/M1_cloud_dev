import * as React from 'react';
import Container from '@mui/material/Container';
import NavBar from "../components/navBar";

export default function Index() {
    return (

        <Container maxWidth="sm">
            <NavBar/>
            <p>welcome</p>
        </Container>
    );
}