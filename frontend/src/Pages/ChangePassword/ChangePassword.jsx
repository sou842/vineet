import { Box, Button, Checkbox, FormControl, FormHelperText, FormLabel, Heading, Input,useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChangePassword = () => {
      //  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
         const baseURL=process.env.REACT_APP_BASE_URL
//     ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
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
        axios.patch(`${baseURL}/api/user/change-password`,changePassword,{
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

    const handleCancel=()=>{
        window.location='/Dashboard'
    }
  

    useEffect(()=>{
        document.title = "change password"
    },[])

  return (
   <Box  h={'100vh'} bg={'gray.100'} p={'50px 0'}>
    <Box w={['90%','90%','40%']} m={'auto'} shadow={'md'} p={'30px'}  bg={'white'} borderRadius={'10px'}>
        <Heading size={'md'} textAlign={'center'}>Change Password</Heading>
        <form onSubmit={handlepasswordSubmit}>
            <Box bg={'white'}>

            <FormControl bg={'white'}>
            <FormLabel>Old Password:</FormLabel>
            <Input type='password' placeholder='Enter your old password' name='oldPassword' onChange={handlePasswordChange}/>
            </FormControl>

            <FormControl bg={'white'}>
            <FormLabel>New Password:</FormLabel>
            <Input type='password' placeholder='Enter your new password' id='newPass' value={changePassword.newPassword} name='newPassword' onChange={handlePasswordChange}/>
            <FormControl mt={'5px'}>
            <Checkbox >Show password</Checkbox>
            </FormControl>
            <FormHelperText color={'red'}>Please enter minimum password length 8.</FormHelperText>
            </FormControl>
            <Button mt={'15px'} size={'xs'} colorScheme='yellow' type='submit' mr={'5px'} isDisabled={changePassword.newPassword.length<=7}>UPDATE</Button>
            <Button mt={'15px'} size={'xs'} colorScheme='red' type='submit' onClick={handleCancel}>CANCEL</Button>
            </Box>
        </form>
    </Box>
   </Box>
  )
}

export default ChangePassword
