import * as types from '../constants/ActionTypes';
import { getIdToken }from '../utils/helper';

function requestLogin(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuth: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuth: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuth: false,
    message
  }
}

export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return Promise.resolve(setTimeout(() => {
      localStorage.setItem('id_token', 'aaaaaaaaaa');
      localStorage.setItem('access_token', 'bbbbbbbbbb');
      dispatch(receiveLogin({ id_token: 'aaaaaaaaaa' }));
    }, 500));

    // return fetch('http://localhost:3001/sessions/create', config)
    //   .then(response =>
    //     response.json().then(user => ({ user, response }))
    //         ).then(({ user, response }) =>  {
    //     if (!response.ok) {
    //       // If there was a problem, we want to
    //       // dispatch the error condition
    //       dispatch(loginError(user.message))
    //       return Promise.reject(user)
    //     } else {
    //       // If login was successful, set the token in local storage
    //       localStorage.setItem('id_token', user.id_token)
    //       localStorage.setItem('access_token', user.access_token)
    //       // Dispatch the success action
    //       dispatch(receiveLogin(user))
    //     }
    //   }).catch(err => console.log("Error: ", err))
  }
}


function requestLogout() {
  return {
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuth: true
  }
}

function receiveLogout() {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuth: false
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    dispatch(receiveLogout())
  }
}

function receiveWatchMovie(movieId) {
  return {
    type: types.WATCH_MOVIE,
    movieId
  };
}

export function watchMovie(movieId) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `movieId=${movieId}&idToken=${getIdToken()}`
  }

  return dispatch => {
    return Promise.resolve(setTimeout(() => {
      dispatch(receiveWatchMovie(movieId));
    }, 300));

    // return fetch('http://localhost:3001/sessions/create', config)
    //   .then(response =>
    //     response.json().then(user => ({ user, response }))
    //         ).then(({ user, response }) =>  {
    //     if (!response.ok) {
    //       // If there was a problem, we want to
    //       // dispatch the error condition
    //       dispatch(loginError(user.message))
    //       return Promise.reject(user)
    //     } else {
    //       // If login was successful, set the token in local storage
    //       localStorage.setItem('id_token', user.id_token)
    //       localStorage.setItem('access_token', user.access_token)
    //       // Dispatch the success action
    //       dispatch(receiveLogin(user))
    //     }
    //   }).catch(err => console.log("Error: ", err))
  }
}

function receiveBookmarkMovie(movieId) {
  return {
    type: types.BOOKMARK_MOVIE,
    movieId
  }
}

export function bookmarkMovie(movieId) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `movieId=${movieId}&idToken=${getIdToken()}`
  }

  return dispatch => {
    return Promise.resolve(setTimeout(() => {
      dispatch(receiveBookmarkMovie(movieId));
    }, 300));

    // return fetch('http://localhost:3001/sessions/create', config)
    //   .then(response =>
    //     response.json().then(user => ({ user, response }))
    //         ).then(({ user, response }) =>  {
    //     if (!response.ok) {
    //       // If there was a problem, we want to
    //       // dispatch the error condition
    //       dispatch(loginError(user.message))
    //       return Promise.reject(user)
    //     } else {
    //       // If login was successful, set the token in local storage
    //       localStorage.setItem('id_token', user.id_token)
    //       localStorage.setItem('access_token', user.access_token)
    //       // Dispatch the success action
    //       dispatch(receiveLogin(user))
    //     }
    //   }).catch(err => console.log("Error: ", err))
  }
}

function receiveUnBookmarkMovie(movieId) {
  return {
    type: types.REMOVE_FROM_BOOKMARKS_MOVIE,
    movieId
  }
}

export function unBookmarkMovie(movieId) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `movieId=${movieId}&idToken=${getIdToken()}`
  }

  return dispatch => {
    return Promise.resolve(setTimeout(() => {
      dispatch(receiveUnBookmarkMovie(movieId));
    }, 300));

    // return fetch('http://localhost:3001/sessions/create', config)
    //   .then(response =>
    //     response.json().then(user => ({ user, response }))
    //         ).then(({ user, response }) =>  {
    //     if (!response.ok) {
    //       // If there was a problem, we want to
    //       // dispatch the error condition
    //       dispatch(loginError(user.message))
    //       return Promise.reject(user)
    //     } else {
    //       // If login was successful, set the token in local storage
    //       localStorage.setItem('id_token', user.id_token)
    //       localStorage.setItem('access_token', user.access_token)
    //       // Dispatch the success action
    //       dispatch(receiveLogin(user))
    //     }
    //   }).catch(err => console.log("Error: ", err))
  }
}

function requestBrowseMovies() {
  return {
    type: types.BROWSE_MOVIES_REQUEST,
    isFetching: true
  }
}

function recieveBrowseMovies(movies) {
  return {
    type: types.BROWSE_MOVIES_SUCCESS,
    isFetching: false,
    movies
  }
}

function browseMoviesError(message) {
  return {
    type: types.BROWSE_MOVIES_FAILURE,
    errorMessage: message
  }
}

export function loadBrowseMovies() {
  const movies = [
    {id: 0, title: 'Arrival', year: 2016, cover: 'imgs/covers/arrival.jpg', watched: 0},
    {id: 1, title: 'Avatar', year: 2009, cover: 'imgs/covers/avatar.jpg', watched: 0},
    {id: 2, title: 'Baby Driver', year: 2017, cover: 'imgs/covers/baby-driver.jpg', watched: 0},
    {id: 3, title: 'Back To The Future', year: 1985, cover: 'imgs/covers/back-to-the-future.jpg', watched: 0},
    {id: 4, title: 'Birdman', year: 2014, cover: 'imgs/covers/birdman.jpg', watched: 0},
    {id: 5, title: 'Blade Runner 2049', year: 2017, cover: 'imgs/covers/blade-runner.jpg', watched: 0},
    {id: 6, title: 'Catch Me If You Can', year: 2002, cover: 'imgs/covers/catch-me-if-you-can.jpg', watched: 0},
    {id: 7, title: 'District 9', year: 2009, cover: 'imgs/covers/district-9.jpg', watched: 0},
    {id: 8, title: 'Django Unchained', year: 2012, cover: 'imgs/covers/django-unchained.jpg', watched: 0},
    {id: 9, title: 'Forrest Gump', year: 1994, cover: 'imgs/covers/forrest-gump.jpg', watched: 0},
    {id: 10, title: 'Fury', year: 2014, cover: 'imgs/covers/fury.jpg', watched: 0},
    {id: 11, title: 'Guardians Of The Galaxy Vol. 2', year: 2017, cover: 'imgs/covers/guardians-of-the-galaxy-vol-2.jpg', watched: 0},
    {id: 12, title: 'Inception', year: 2010, cover: 'imgs/covers/inception.jpg', watched: 0},
    {id: 13, title: 'Interstellar', year: 2014, cover: 'imgs/covers/interstellar.jpg', watched: 0},
    {id: 14, title: 'Into The Wild', year: 2007, cover: 'imgs/covers/into-the-wild.jpg', watched: 0},
    {id: 15, title: 'Logan', year: 2017, cover: 'imgs/covers/logan.jpg', watched: 0},
    {id: 16, title: 'Oblivion', year: 2013, cover: 'imgs/covers/oblivion.jpg', watched: 0},
    {id: 17, title: 'Predestionation', year: 2014, cover: 'imgs/covers/predestination.jpg', watched: 0},
    {id: 18, title: 'Ready Player One', year: 2018, cover: 'imgs/covers/ready-player-one.jpg', watched: 0},
    {id: 19, title: 'The Martian', year: 2016, cover: 'imgs/covers/the-martian.jpg', watched: 0},
    {id: 20, title: 'The Matrix', year: 1999, cover: 'imgs/covers/the-matrix.jpg', watched: 0},
    {id: 21, title: 'The Revenant', year: 2015, cover: 'imgs/covers/the-revenant.jpg', watched: 0},
    {id: 22, title: 'The Shawshank Redemption', year: 1994, cover: 'imgs/covers/the-shawshank-redemption.jpg', watched: 0},
    {id: 23, title: 'Thor: Ragnarok', year: 2017, cover: 'imgs/covers/thor-ragnarok.jpg', watched: 0},
    {id: 24, title: 'WALL-E', year: 2008, cover: 'imgs/covers/walle.jpg', watched: 0},
    {id: 25, title: 'Whiplash', year: 2014, cover: 'imgs/covers/whiplash.jpg', watched: 0},
    {id: 26, title: 'Zootopia', year: 2016, cover: 'imgs/covers/zootopia.jpg', watched: 0},
  ];
    
  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
  }

  return dispatch => {
    dispatch(requestBrowseMovies());
    return Promise.resolve(setTimeout(() => {
      dispatch(recieveBrowseMovies(movies));
    }, 1500));

    // return fetch('http://localhost:3001/sessions/create', config)
    //   .then(response =>
    //     response.json().then(user => ({ user, response }))
    //         ).then(({ user, response }) =>  {
    //     if (!response.ok) {
    //       // If there was a problem, we want to
    //       // dispatch the error condition
    //       dispatch(loginError(user.message))
    //       return Promise.reject(user)
    //     } else {
    //       // If login was successful, set the token in local storage
    //       localStorage.setItem('id_token', user.id_token)
    //       localStorage.setItem('access_token', user.access_token)
    //       // Dispatch the success action
    //       dispatch(receiveLogin(user))
    //     }
    //   }).catch(err => console.log("Error: ", err))
  }
}