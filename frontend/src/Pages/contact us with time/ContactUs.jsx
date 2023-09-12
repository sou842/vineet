import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const ContactUs = () => {
  return (
  <Box>
    <Box textAlign={'center'} w={'100%'} m={'auto'} p={'20px'} borderRadius={'10px'} border={'1px solid'} fontWeight={'black'} bg={'red.100'} >
    <Text> Email:- help.smartdigitalservice@gmail.com</Text>
    <Text> Phones:- 9838968537, 7355121493</Text>
    <Text>  Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</Text>
    <Text color={'red'}>Note:- "Dear User & Visitors, please be informed that this portal is totally free of cost, No cost is asked for its registration. If anyone asks any money for the same, Please don't do so and kindly reach out to given Numbers and Email."</Text>
</Box>
  </Box>
  )
}

export default ContactUs
