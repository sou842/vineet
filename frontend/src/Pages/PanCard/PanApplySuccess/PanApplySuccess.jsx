import { Button,Box, Heading ,Text} from '@chakra-ui/react'
import React from 'react'
import ContactUs from '../../contact us with time/ContactUs'
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon } from '@chakra-ui/icons'


const PanApplySuccess = () => {
    const navigate=useNavigate()
  return (
    <div>
        <ContactUs/>
        <Box textAlign="center" py={10} px={6} w={'50%'} m={'auto'}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
      Congratulations😍 Pan applied succesfully!
      </Heading>
      <Text color={'gray.500'}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      </Text>
      <Button colorScheme='green' onClick={()=>navigate("/Dashboard")} mt={'10px'}>Dashboard</Button>
    </Box>
        
      
    </div>
  )
}

export default PanApplySuccess