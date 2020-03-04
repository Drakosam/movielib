const assert = require('assert');
const Movie = require('./../src/movies');

let movies = undefined;
let moviesArray = [];
let moviesGenres = [];

//genres

beforeEach(() => {
    movies = new Movie();
    moviesGenres = ['aaa', 'bbb', 'ccc', 'ddd'];
    moviesArray = [
        {
            id: 0, runtime: 100, "genres": ['aaa']
        },
        {
            id: 1, runtime: 80, "genres": ['aaa', 'bbb']
        },
        {
            id: 2, runtime: 75, "genres": ['aaa', 'bbb', 'ccc']
        },
        {
            id: 3, runtime: 70, "genres": ['aaa', 'bbb', 'ccc', 'ddd']
        }]
});

describe("test", () => {
    it("_ratingMovie", () => {

        const testArray = movies._ratingMovie(moviesArray, moviesGenres);
        assert.equal(testArray[0]['id'], 3);
        assert.equal(testArray[3]['id'], 0);
    });

    // random is random
    // it("_pickRandom", () => {
    //     assert.equal(true, movies);
    //     movies = false
    // });

    it("_isSearchMovie", () => {

        assert.equal(movies._isSearchMovie(moviesArray[3], ['ddd']), 1);
        assert.equal(movies._isSearchMovie(moviesArray[3], ['aaa', 'ddd']), 2);
        assert.equal(movies._isSearchMovie(moviesArray[3], ['zzz']), 0);

    });

    // is cover no need test filter
    // it("_getMovieMachGenres", () => {
    //     assert.equal(true, movies);
    //     movies = false
    // });

    it("_getMovieBetweenRuntime", () => {
        assert.equal(movies._getMovieBetweenRuntime(moviesArray, 100).length, 1);
        assert.equal(movies._getMovieBetweenRuntime(moviesArray, 100)[0]['id'], 0);
        assert.equal(movies._getMovieBetweenRuntime(moviesArray, 80).length, 2);
        assert.equal(movies._getMovieBetweenRuntime(moviesArray, 75).length, 3);
    });

});
