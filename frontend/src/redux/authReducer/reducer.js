
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType";

const intstate={
    token:"",
    isLoading:false,
    isError:false,
    isAuth:false
}
export const reducer=(state=intstate,{type,payload})=>{
    switch (type) {
        case LOGIN_REQUEST:
            return {...state,isLoading:true}
        case LOGIN_SUCCESS:
            return {...state,isLoading:false,token:payload,isAuth:true}
        case LOGIN_FAILURE:
            return {...state,isLoading:false,isError:true}
        default:
            return state
    }
}