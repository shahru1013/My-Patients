import {
   SET_DOCTOR_DASHBOARD,
   SET_USER_DATA,
} from './actionTypes';

const DEFAULT_STATE = {
    isDoctorDashboard: false,
    userData:{}
}

/**
 * state - The cureent states of redux
 * action - Dispatching actions
 */
export default (state = DEFAULT_STATE, action) =>{
    switch (action.type) {
        case SET_DOCTOR_DASHBOARD:
            return{
                ...state,
                isDoctorDashboard: action.isDoctorDashboard
            }
        case SET_USER_DATA:
            return{
                ...state,
                userData: action.userData
            }

        default:
            return state;
    }
}