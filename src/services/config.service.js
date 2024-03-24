export const ConfigService = {
    themoviedb: {
        urls: {
            movies: {
                discover: "https://api.themoviedb.org/3/discover/movie",
                search: "https://api.themoviedb.org/3/search/movie",
                movie: "https://api.themoviedb.org/3/movie"
            }
        },
        keys: {
            API_TOKEN: "changeMe",
            API_KEY: "changeMe"
        }
    },
    youtube: {
        urls: {
            getVideo: "https://www.youtube.com/watch"
        }
    }
}