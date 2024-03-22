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
            API_TOKEN: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjg1NGVlYTk3MjI0YWYxOTA3ZTEyNmFkOTA4YTIzOSIsInN1YiI6IjY1ZTliNzc3NmJlYWVhMDE4NjdhM2RjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aD2Z9pJ-9PdxzXJ8KLgDcU2H5winwCmH-dc64_y3SQQ",
            API_KEY: "06854eea97224af1907e126ad908a239"
        }
    },
    youtube: {
        urls: {
            getVideo: "https://www.youtube.com/watch"
        }
    }
}