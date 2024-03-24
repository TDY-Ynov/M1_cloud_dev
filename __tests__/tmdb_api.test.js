const fetch = require("node-fetch");
const {ConfigService} = require("../src/services/config.service");
const handler = require("../pages/api/movies/discover/toprated");

describe('Remote API (TMDB)', () => {
    it('check server UP and credential working', async () => {
        const response = await fetch(ConfigService.themoviedb.urls.movies.discover, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
            }
        });
        expect(response.status).toBe(200);
    });
});
