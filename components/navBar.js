import * as React from 'react';
import {Link} from "@mui/material";

export default function NavBar() {
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
            <Link href="/ui/sign-in">Sign In</Link>
        </nav>
    );
}