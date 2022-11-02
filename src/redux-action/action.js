import {
   SET_DOCTOR_DASHBOARD,
   SET_USER_DATA
} from './actionTypes';
/**
 * 
 * @param {*} isLogged 
 * @returns set user login state
 */
export const setIsDashBoardVisible =(isDoctorDashboard)=>{
   return{
      type: SET_DOCTOR_DASHBOARD,
      isDoctorDashboard
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