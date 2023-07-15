import axios from "axios"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType"



export const loginFun=(loginData)=>(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    
   return axios.post("http://localhost:8080/api/login",loginData)
    .then((res)=>{ 
       if(res.data.msg=="login successful"){
        dispatch({type:LOGIN_SUCCESS,payload:res.data.token})
        let obj={
            token:res.data.token,
            auth:true,
            username:res.data.username
        }
        localStorage.setItem("digitalPortal",JSON.stringify(obj))
       return res.data.msg
    }
    else{
        dispatch({type:LOGIN_FAILURE})
      return res.data.msg

    }
    })
    .catch((err)=>{
        dispatch({type:LOGIN_FAILURE})
        console.log(err);
    })
}