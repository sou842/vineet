import { useState } from 'react'
import './Footer.css'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

export const Footer = () =>{
    //    ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        const baseURL=process.env.REACT_APP_BASE_URL
    //  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
const [data,setData]=useState({
    name:"",
    email:"",
    phoneNumber:"",
    message:""
    
})
const toast=useToast()
const handelChange=(e)=>{
     setData({...data,[e.target.name]:e.target.value})
}
const handelSubmit=(e)=>{
    e.preventDefault()
   axios.post(`${baseURL}/api/feedback`,data,{
    headers: {
        Authorization: portalData.token,
      },
   })
   .then((res)=>{
    toast({
        title: res.data,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
   })
   .catch((err)=>{
    toast({
        title: "Please try agian",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.log(err);
   })
}



return (
    <footer>
        <div className="footer_0">
            <div>
                <h1>ADDRESS</h1>
                <div>
                <p>Number: +91 9838968537</p>
                <p>Number: +91 7355121493</p>
                <p> Email: help.smartdigitalservice@gmail.com</p>
                <p>SMART DIGITAL SERVICE,Dilwal, Near Bank, Sikandra, Uttar Pradesh, 209310 </p>
                </div>
            </div>
            <div>
                <form onSubmit={handelSubmit}>
                <input type="text" placeholder='Name' required name='name'  onChange={handelChange} />
                <input type="email" placeholder='Email'required name='email' onChange={handelChange} />
                <input type="number" placeholder='Phone Number' required name='phoneNumber' onChange={handelChange}/>
                <textarea placeholder='Massage' required name='message' onChange={handelChange}></textarea>
                <button type='sibmit'>SEND</button>
                </form>
            </div>
        </div>
        <div className="footer_1">© 2017-2023 Vineet India Portal. All rights reserved</div>
    </footer>
)
}