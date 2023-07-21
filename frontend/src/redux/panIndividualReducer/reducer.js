import { PANINDIVIDUAL_REQUEST, PANINDIVIDUAL_FAILURE, PANINDIVIDUAL_SUCCESS } from "./actionType";

const intstate = {
    isLoading: false,
    isError: false,
    Pan_data: []
}


export const reducer = (state = intstate,{ type,payload }) =>{

switch (type) {
case PANINDIVIDUAL_REQUEST:
    return { ...state, isLoading: true }
case PANINDIVIDUAL_SUCCESS:
    return { ...state, isLoading: false, isError: false, Pan_data:payload }
case PANINDIVIDUAL_FAILURE:
    return { ...state, isLoading: false, isError: true }
default:
return state
}

}