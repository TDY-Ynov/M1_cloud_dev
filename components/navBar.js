import * as React from 'react';
import {Link} from "@mui/material";
// import ProTip from '../src/ProTip';
// import Link from '../src/Link';
// import Copyright from '../src/Copyright';

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
            <Link href="/ui/signIn">Sign In</Link>
        </nav>
    );
}