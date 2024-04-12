import * as React from 'react';
import {Link} from "@mui/material";
import {useAuth} from "../src/contexts/auth.context";

export default function NavBar() {
    const {user, logout} = useAuth();
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li>
                    <Link href="/ui/movies">Movies</Link>
                    <ul>
                        <li><Link href="/ui/movies/top_rated">Top rated</Link></li>
                        <li><Link href="/ui/movies/recommended">Recommendations</Link></li>
                    </ul>
                </li>
            </ul>
            {user ? (
                <Link href="/" onClick={logout}>Logout</Link>
            ) : (
                <Link href="/ui/sign-in">Sign In</Link>
            )}
        </nav>
    );
}
