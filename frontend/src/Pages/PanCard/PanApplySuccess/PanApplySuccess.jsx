import { Button, Heading } from '@chakra-ui/react'
import React from 'react'
import ContactUs from '../../contact us with time/ContactUs'
import { useNavigate } from 'react-router-dom'


const PanApplySuccess = () => {
    const navigate=useNavigate()
  return (
    <div>
        <ContactUs/>
        <Heading>Apply Successfull</Heading>
        <Button onClick={()=>navigate("/Dashboard")}>Dashboard</Button>
      
    </div>
  )
}

export default PanApplySuccess
