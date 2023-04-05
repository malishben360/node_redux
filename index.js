/** Import model and libraries */
const redux = require('redux');
const reduxLogger = require('redux-logger');

const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.legacy_createStore;
const combineReducers = redux.combineReducers;

/** Actions constance */
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

/** Action creators */
const buyCake = () => {
    return {
        type: BUY_CAKE,
        payload: 1
    }
}
const buyIceCream = () => {
    return {
        type: BUY_ICE_CREAM,
        payload: 1
    }
}

// /** Store initial state for both cake and icecream*/
// const initialState = {
//     totalCakes: 10,
//     totalIceCreams: 20
// }

// /** Single reducer for both cake and icecream*/
// const storeReducer = (state = initialState, action) => {
//     switch(action.type){
//         case BUY_CAKE: return {
//             ...state,
//             totalCakes: state.totalCakes - 1
//         }
//         case BUY_ICE_CREAM: return {
//             ...state,
//             totalIceCreams: state.totalIceCreams - 1
//         }

//         default: return state;
//     }
// }

/** initial state for items in the store */
const initialCakeStoreState = {
    totalCakes: 10
}
const initialIceCreamStoreState = {
    totalIceCreams: 20
}

/** Seperate reducer for cake and icecream for code scallability */
const cakeReducer = (state = initialCakeStoreState, action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            totalCakes: state.totalCakes - 1
        }

        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamStoreState, action) => {
    switch(action.type){
        case BUY_ICE_CREAM: return {
            ...state,
            totalIceCreams: state.totalIceCreams - 1
        }

        default: return state
    }
}

/** Combine the reducers into single reducer */
 const reducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
 });

/** Create store */
const store = createStore(reducer, applyMiddleware(logger));
console.log('Initial state: ', store.getState())

/** Subscribe to the store: Returns unsubscribe function */
const unsubscribe = store.subscribe(()=>{});

/** Make some state transitions */
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

/** Unsubscribe from the store */
unsubscribe();