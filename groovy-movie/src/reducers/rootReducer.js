import * as reducers from './index';
import { combineReducers } from 'redux'

export default combineReducers({
	auth: reducers.auth,
	movies: reducers.movies
});