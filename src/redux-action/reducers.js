import {
   SET_DOCTOR_DASHBOARD,
   SET_NEW_PRESCRIPTION,
   SET_USER_DATA,
} from './actionTypes';

const DEFAULT_STATE = {
    isDoctorDashboard: false,
    isNewPrescriptionVisible: false,
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

        case SET_NEW_PRESCRIPTION:
            return{
                ...state,
                isNewPrescriptionVisible: action.isNewPrescriptionVisible
            }
    
        default:
            return state;
    }
}