import { Interface } from "readline";

/** Import model and libraries */
const redux = require('redux');
const reduxLogger = require('redux-logger');

const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.legacy_createStore;
const combineReducers = redux.combineReducers;

/** Types definations */
interface Action {
    type: string;
    payload: number;
}
interface Cake {
    totalCakes: number;
}
interface IceCream {
    totalIceCreams: number;
}
interface State {
    totalCakes: number,
    totalIceCreams: number
}


/** Actions constance */
const BUY_CAKE = 'BUY_CAKE';
/** Actions constance */
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

/** Action creators: take number as parameter and returns an Action */
const buyCake = (num: number = 1): Action => {
    return {
        type: BUY_CAKE,
        payload: num
    }
}
/** Action creators: take number as parameter and returns an Action */
const buyIceCream = (num: number = 1): Action => {
    return {
        type: BUY_ICE_CREAM,
        payload: num
    }
}

/** Store initial state for both cake and icecream*/
const initialState: State = {
    totalCakes: 10,
    totalIceCreams: 20
}

/** Single reducer for both cake and icecream*/
const storeReducer = (state: State = initialState, action: Action): State => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            totalCakes: state.totalCakes - 1
        }
        case BUY_ICE_CREAM: return {
            ...state,
            totalIceCreams: state.totalIceCreams - 1
        }

        default: return state;
    }
}

/** initial state for items in the store */
const initialCakeStoreState: Cake = {
    totalCakes: 10
}
const initialIceCreamStoreState: IceCream = {
    totalIceCreams: 20
}

/** Seperate reducer for cake and icecream for code scallability */
const cakeReducer = (state: Cake = initialCakeStoreState, action: Action): Cake => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            totalCakes: state.totalCakes - action.payload
        }

        default: return state
    }
}

const iceCreamReducer = (state: IceCream = initialIceCreamStoreState, action: Action ): IceCream => {
    switch(action.type){
        case BUY_ICE_CREAM: return {
            ...state,
            totalIceCreams: state.totalIceCreams - action.payload
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
store.dispatch(buyCake(3));
store.dispatch(buyCake());
store.dispatch(buyIceCream(8));
store.dispatch(buyIceCream());

/** Unsubscribe from the store */
unsubscribe();