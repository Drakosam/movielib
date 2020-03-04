for random movie
    [GET]http://localhost:8080/movie
    
single random movie with a runtime between <duration - 10> and <duration + 10>
    [GET]http://localhost:8080/movie?uration=127

movies list with specific genres
    [GET]http://localhost:8080/movie?genres=["Drama","War","History"]

movies list with specific genres and with a runtime between <duration - 10> and <duration + 10> order by numbers hits in genres
    [GET]http://localhost:8080/movie?genres=["Drama","War","History"]&duration=127

add movie
    [POST]http://localhost:8080/movie

    exemple body:
    {
        "title": "Beetlejuice2",
        "year": "1988",
        "runtime": "92",
        "genres": [
            "Comedy",
            "Fantasy"
        ],
        "director": "Tim Burton",
        "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
        "plot": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg"
    }
