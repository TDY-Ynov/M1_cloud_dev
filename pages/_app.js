import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {AppCacheProvider} from '@mui/material-nextjs/v14-pagesRouter';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme/theme';
import NavBar from "../components/navBar";
import {AuthProvider} from "../src/contexts/auth.context";

export default function MyApp(props) {
    const {Component, pageProps} = props;
    return (
        <AuthProvider>
            <AppCacheProvider {...props}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <title>Développer pour le cloud - app</title>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <NavBar/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </AppCacheProvider>
        </AuthProvider>
    );
}
MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};