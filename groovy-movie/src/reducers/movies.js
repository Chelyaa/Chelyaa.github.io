import * as types from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  moviesById: {},
  browseOrder: []
};

export default function movies(state = initialState, action) {
  let moviesById;//'case' has not have own scope
  switch (action.type) {

    case types.WATCH_MOVIE:
      moviesById = Object.assign({}, state.moviesById);console.log(action);
      moviesById[action.movieId].watched++;
      return Object.assign({}, state, { moviesById });
      break;

    case types.BOOKMARK_MOVIE:
    case types.REMOVE_FROM_BOOKMARKS_MOVIE:
      moviesById = Object.assign({}, state.moviesById);
      moviesById[action.movieId].bookmark = !moviesById[action.movieId].bookmark;
      return Object.assign({}, state, { moviesById });
      break;

    case types.BROWSE_MOVIES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
      break;

    case types.BROWSE_MOVIES_SUCCESS:
      moviesById = Object.assign({}, state.moviesById);
      action.movies.forEach(movie => {
        moviesById[movie.id] = movie;
      });
      return {
        isFetching: false,
        browseOrder: state.browseOrder.concat( action.movies.map(movie => movie.id) ),
        moviesById: moviesById
      };
      break;

    case types.BROWSE_MOVIES_FAILURE:
      return Object.assign({}, state, { errorMessage: action.errorMessage });
      break;

    default:
      return state;
  }
}