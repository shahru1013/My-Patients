import { combineReducers } from 'redux';
import  AppReducer from '../redux-action/reducers';

export default combineReducers({
    "AppData": AppReducer
});