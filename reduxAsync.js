/** import dependencies */
const redux = require('redux');
const axios = require('axios');
const reduxLogger = require('redux-logger')
const thunkMiddleware = require('redux-thunk').default;

const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

/** Action constances */
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

/** Action creators */
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}
const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

/** Store initial state */
const initialState = {
    isLoading: false,
    users: [],
    error: ''
}

/** Fetch users reducer */
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: 
            return {
                ...state,
                isLoading: true,
            }

        case FETCH_USERS_SUCCESS:
            return {
                isLoading: false,
                users: action.payload,
                error: ''
            }

        case FETCH_USERS_FAILURE:
            return {
                isLoading: false,
                users: [],
                error: action.payload,
            }
        
        default: return state;
    }
}

/** Create redux store */
const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));
console.log(store.getState());

const fetchUsers = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchUsersRequest());
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSuccess(users))
        }
        catch(error){
            //Register error message of the request error.mesage
            dispatch(fetchUsersFailure(error.message));
        }
    }
}

/** Subscribe to the store to monitor state transitions */
store.subscribe(() => {});

/** Triger state transition */
store.dispatch(fetchUsers());
