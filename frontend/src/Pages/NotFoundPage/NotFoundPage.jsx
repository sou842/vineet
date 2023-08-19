import { Box, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Heading, Text, Button} from '@chakra-ui/react'
import React, { useEffect } from 'react'

const NotFoundPage = () => {
    useEffect(() => {
        document.title = '404 - Page Not Found';
      }, []);
  return (
    <Box>
        <Alert
  status='error'
  variant='subtle'
  flexDirection='column'
  alignItems='center'
  justifyContent='center'
  textAlign='center'
  height='100vh'
>
  <AlertIcon boxSize='40px' mr={0} />
  <AlertTitle mt={'4'} mb={1} fontSize='lg'>
  <Heading fontSize={'5xl'} mt={'5px'}>Oops!</Heading>
  <Heading size={'md'} color={'red'}>404 - Page Not Found</Heading>
  </AlertTitle>
  <AlertDescription maxWidth='sm'>
    <Text mt={'10px'} fontWeight={'medium'}>404 Page Not Found
The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</Text>
  
<Button mt={'10px'} colorScheme='green' onClick={(e=>window.location='/')} >Go To Home</Button>
  </AlertDescription>
</Alert>
      
    </Box>
  )
}

export default NotFoundPage
