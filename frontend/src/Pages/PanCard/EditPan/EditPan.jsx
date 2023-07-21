import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const EditPan = () => {
    const {Pan_data}=useSelector((store)=>{
        return store.panIndividualReducer
    })
  
   
  return (
    <Box>
        {/* <Box  w={['90%','90%','50%']} m={'auto'} shadow={'md'} p={'20px'} borderRadius={'10px'} >
           
                    
        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Category: <Text fontWeight={'thin'} as={'span'}>{Pan_data.category.toUpperCase()}</Text> </Heading>

        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Name On Card: <Text fontWeight={'thin'} as={'span'}>{Pan_data.NameOnCard}</Text> </Heading>

        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Name On Card: <Text fontWeight={'thin'} as={'span'}>{Pan_data.NameOnCard}</Text> </Heading>

        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Aadhaar Name: <Text fontWeight={'thin'} as={'span'}>{Pan_data.aadhaarName}</Text> </Heading>

        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Aadhaar Number: <Text fontWeight={'thin'} as={'span'}>{Pan_data.aadhaarNumber}</Text> </Heading>

        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>City: <Text fontWeight={'thin'} as={'span'}>{Pan_data.city}</Text> </Heading>

        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Country: <Text fontWeight={'thin'} as={'span'}>{Pan_data.country}</Text> </Heading>

        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>DOB: <Text fontWeight={'thin'} as={'span'}>{Pan_data.dateOfBirth+"-"+Pan_data.monthOfBirth+"-"+Pan_data.yearOfBirth}</Text> </Heading>

        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Email: <Text fontWeight={'thin'} as={'span'}>{Pan_data.email}</Text> </Heading>


                    
                
            
        </Box> */}

    </Box>
  )
}

export default EditPan
