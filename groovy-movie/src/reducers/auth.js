import * as types from '../constants/ActionTypes';

const initialState = {
	isFetching: false,
	isAuth: localStorage.getItem('id_token') ? true : false
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		
		case types.LOGIN_REQUEST:
			return Object.assign({}, state, {
        isFetching: true,
        isAuth: false,
        user: action.creds
      });
			break;

		case types.LOGIN_SUCCESS:
			return Object.assign({}, state, {
        isFetching: false,
        isAuth: true,
        errorMessage: ''
      });
			break;

		case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuth: false,
        errorMessage: action.message
      });
      break;

		case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuth: false
      });
      break;

    default:
      return state;
	}
}