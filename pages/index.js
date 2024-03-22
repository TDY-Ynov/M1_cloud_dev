import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Link} from "@mui/material";
import {Copyright} from "@mui/icons-material";
// import ProTip from '../src/ProTip';
// import Link from '../src/Link';
// import Copyright from '../src/Copyright';

export default function Index() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="./ui/movies">Movies</Link>
                    <ul>
                        <li><Link href="./ui/movies">All</Link></li>
                        <li><Link href="./ui/movies/top_rated">Top rated</Link></li>
                        <li><Link href="./ui/movies/recommended">Recommendations</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}