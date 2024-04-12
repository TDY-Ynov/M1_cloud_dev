import * as React from 'react';
import Container from '@mui/material/Container';
import {useEffect} from "react";
import {useAuth} from "../src/contexts/auth.context";
import {useRouter} from "next/router";

export default function Index() {

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/ui/sign-in');
        }
    }, [user, router]);

    return (

        <Container maxWidth="sm">
            <p>Welcome to you, registered user ! </p>
        </Container>
    );
}