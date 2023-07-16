import { Box, Button, FormControl, FormLabel, Heading, Input,useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChangePassword = () => {
    const toast=useToast()
    const portalData=JSON.parse(localStorage.getItem('digitalPortal'))||null
    const [changePassword,setChangePassword]=useState({
        oldPassword:"",
        newPassword:""
    })
    const handlePasswordChange=(e)=>{
        setChangePassword({...changePassword,[e.target.name]:e.target.value})
    }
    const handlepasswordSubmit=(e)=>{
        e.preventDefault()
        axios.patch("http://localhost:8080/api/user/change-password",changePassword,{
            headers: {
                "Authorization": portalData.token
              }
        })
        .then((res)=>{
            if(res.data=="Your password has been upadated"){
                toast({
                    title: res.data,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                  window.location='/Dashboard'
            }
            else{
                toast({
                    title: res.data,
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

    useEffect(()=>{
        document.title = "change password"
    },[])

  return (
   <Box  h={'100vh'} bg={'gray.100'} p={'50px 0'}>
    <Box w={['90%','90%','40%']} m={'auto'} shadow={'md'} p={'30px'}  bg={'white'} borderRadius={'10px'}>
        <Heading size={'md'} textAlign={'center'}>Change Password</Heading>
        <form onSubmit={handlepasswordSubmit}>
            <Box>

            <FormControl>
            <FormLabel>Old Password:</FormLabel>
            <Input type='password' placeholder='Enter your old password' name='oldPassword' onChange={handlePasswordChange}/>
            </FormControl>

            <FormControl>
            <FormLabel>New Password:</FormLabel>
            <Input type='password' placeholder='Enter your new password' name='newPassword' onChange={handlePasswordChange}/>
            </FormControl>
            <Button mt={'15px'} size={'sm'} colorScheme='yellow' type='submit'>UPDATE</Button>
            </Box>
        </form>
    </Box>
   </Box>
  )
}

export default ChangePassword
