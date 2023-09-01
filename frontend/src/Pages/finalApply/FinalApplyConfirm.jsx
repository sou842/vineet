import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const FinalApplyConfirm = () => {
     //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
         const baseURL=process.env.REACT_APP_BASE_URL
   // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
  const { id } = useParams();
  const toast=useToast()
  const navigate=useNavigate()
const [user,setUser]=useState({})
const [year,setYear]=useState("")

const handeConfirm=()=>{
    if(year!=user.yearOfBirth){
        toast({
            title: 'Enter wrong year of birth',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
    }
    else{
        axios.patch(`${baseURL}/user/apply-confirm-from/${id}`,{},{
            headers: {
                Authorization: portalData.token,
              },
        })
        .then((res)=>{
            if(res.data=="Apply Successfull"){
            toast({
                title: res.data,
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              navigate("/user/applied-success") 
            }
            else{
                toast({
                    title: "Somthing went wrong!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}




  useEffect(() => {
    axios
      .get(`${baseURL}/user/final-confirm-apply/${id}`, {
        headers: {
          Authorization: portalData.token,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box>
        <Box w={'50%'} m={'auto'} shadow={'md'} p={'50px'}>
            <Box>
                        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>vendorID: <Text fontWeight={'thin'} as={'span'}>{user.category?.toUpperCase()}</Text> </Heading>

                        
                        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Apply Date: <Text fontWeight={'thin'} as={'span'}>{user.date}</Text> </Heading>

                        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Applicant Firstname: <Text fontWeight={'thin'} as={'span'}>{user.firstName}</Text> </Heading>
                        {
                            user.middlename? <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Applicant Middlename: <Text fontWeight={'thin'} as={'span'}>{user.middlename}</Text> </Heading>:""
                        }
                       

                        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Applicant Lastname: <Text fontWeight={'thin'} as={'span'}>{user.lastName}</Text> </Heading>

                        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Father's Firstname: <Text fontWeight={'thin'} as={'span'}>{user.lastName}</Text> </Heading>
                        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Father's Lastname: <Text fontWeight={'thin'} as={'span'}>{user.lastName}</Text> </Heading>
                        <FormControl>
                            <FormLabel>Enter Year of Birth</FormLabel>
                            <Input required placeholder='Enter year of birth' type='number' onChange={(e)=>setYear(e.target.value)}/>
                            <FormHelperText color={'red'}>Look at above photo and fill here</FormHelperText>
                        </FormControl>
                        <Button mt={'10px'} colorScheme='green' letterSpacing={'5px'} size={'sm'} onClick={handeConfirm}>CONFIRM</Button>
                    </Box>
                
            

        </Box>
    </Box>
  )
}

export default FinalApplyConfirm
