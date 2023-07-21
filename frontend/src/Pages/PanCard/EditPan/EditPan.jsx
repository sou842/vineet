import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const EditPan = () => {
  const form_data = JSON.parse(localStorage.getItem("VDP_form_data")) || null;

  console.log(form_data)
   
  return (
    <Box>hello


    </Box>
  )
}

export default EditPan
