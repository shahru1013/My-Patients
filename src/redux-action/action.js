import {
   SET_DOCTOR_DASHBOARD,
   SET_NEW_PRESCRIPTION,
   SET_USER_DATA
} from './actionTypes';

export const setIsDashBoardVisible =(isDoctorDashboard)=>{
   return{
      type: SET_DOCTOR_DASHBOARD,
      isDoctorDashboard
   }
}

export const setIsNewPrescriptionVisible =(isNewPrescriptionVisible)=>{
   return{
      type: SET_NEW_PRESCRIPTION,
      isNewPrescriptionVisible
   }
}


/**
 * set user Data
 */
 export const setUserData =(userData)=>{
   return{
      type: SET_USER_DATA,
      userData
   }
}