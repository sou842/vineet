import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import React from 'react'

const ChangePassword = () => {
  return (
   <Box h={'100vh'} bg={'gray.100'} p={'70px'}>
    <Box w={'40%'} m={'auto'} shadow={'md'} p={'30px'}  bg={'white'} borderRadius={'10px'}>
        <Heading size={'md'} textAlign={'center'}>Change Password</Heading>
        <form>
            <Box>

            <FormControl>
            <FormLabel>Old Password:</FormLabel>
            <Input type='password' placeholder='Enter your old password'/>
            </FormControl>

            <FormControl>
            <FormLabel>New Password:</FormLabel>
            <Input type='password' placeholder='Enter your new password'/>
            </FormControl>
            <Button mt={'15px'} size={'sm'} colorScheme='yellow' type='submit'>UPDATE</Button>
            </Box>
        </form>
    </Box>
   </Box>
  )
}

export default ChangePassword
