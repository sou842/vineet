import { PANINDIVIDUAL_SUCCESS } from "./actionType"



export const PAN_INDIVIDUAL = (payload) => (dispatch) =>{
dispatch({type:PANINDIVIDUAL_SUCCESS,payload})
}