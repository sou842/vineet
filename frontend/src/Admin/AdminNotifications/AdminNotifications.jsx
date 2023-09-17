import { Box, Heading, Spinner, Text,useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../AdminNavbar/AdminNavbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AdminNotifications() {
    //   ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
             const baseURL=process.env.REACT_APP_BASE_URL
    //    ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const toast=useToast()
    const navigate=useNavigate()
const [toggle,setToggle]=useState(false)
const [data,setData]=useState([])
const [loading,setLoading]=useState(false)



const handelClick=(id,isSeen,category,pancardID)=>{
    if(!isSeen){
        setLoading(true)
        axios.patch(`${baseURL}/admin/notification/${id}`,{
        headers: { "Authorization": portalData.token }
    }).then((res)=>{
        setLoading(false)
       navigate(`/AdminPanCard/AdminPanCardPerson/${category}-${pancardID}`)
    })
    .catch((err)=>{
        setLoading(false)
        toast({ title: "Please Try Again", status: "error", duration: 3000, isClosable: true, })
        console.log(err);
    })

    }
    else{
        navigate(`/AdminPanCard/AdminPanCardPerson/${category}-${pancardID}`)
    }

    

}










useEffect(()=>{
setLoading(true)
    axios.get(`${baseURL}/admin/notification?isSeen=${toggle}`,{
        headers: { "Authorization": portalData.token }
    }).then((res)=>{
        setLoading(false)
        setData(res.data)
    })
    .catch((err)=>{
        setLoading(false)
        toast({ title: "Please Try Again", status: "error", duration: 3000, isClosable: true, })
        console.log(err);
    })

},[toggle])


  return (
    <Box>
        <AdminNavbar/>
        <Box w={'80%'} display={'flex'} justifyContent={'space-around'} m={'1cm auto'} shadow={'md'} p={'0 15px'} borderRadius={'10px'}>
            <Text w={'40%'} textAlign={'center'} p={'10px'} fontWeight={'bold'} onClick={()=>setToggle(!toggle)} color={toggle&& '#BDBDBD'} borderBottom={!toggle&& '1px solid #2196F3'} cursor={'pointer'}>Unread Notification</Text>
            <Text w={'40%'} textAlign={'center'} p={'10px'} fontWeight={'bold'} onClick={()=>setToggle(!toggle)} color={!toggle&& '#BDBDBD'} borderBottom={toggle&& '1px solid #2196F3'}  cursor={'pointer'}>Read Notification</Text> 
        </Box>

        <Box w={'80%'} m={'auto'}shadow={'md'} borderRadius={'10px'}>
            {
                data.length==0&& <Box h={'70vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>{loading?<Spinner/>:null}</Box>
            }
           
            {
                data && data?.map((el,i)=>{
                        return <Box key={i}  p={'15px'} borderBottom={'1px solid #E0E0E0'} cursor={'pointer'} _hover={{bg:'#F5F5F5'}} onClick={()=>handelClick(el._id,el.isSeen,el.category,el.pancardID)}>
                            <Box display={'flex'} justifyContent={'space-between'} >
                                <Text p={'1px 7px'} bg={el.category=="newpan"?"green.400":"orange.400"} color={'white'} borderRadius={'7px'}  >{el.category}</Text>
                                <Text color={'gray'}>{el.dateAndTime||"2023-Sep-17 11:34:13 PM"}</Text>
                            </Box>
                            <Box>
                                {
                                    el.category=="updatepan" &&  <Text m={'5px'} fontWeight={'medium'}>{el.username.toUpperCase() } Request for a update PanCard...</Text>
                                }
                                {
                                    el.category=="newpan" &&  <Text m={'5px'} fontWeight={'medium'}>{el.username.toUpperCase() } Apply for a new PanCard...</Text>
                                
                }
                               
                            </Box>
                        </Box>
                })
            }
        </Box>


    </Box>
  )
}
