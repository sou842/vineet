import { Box, Table, TableContainer, Tbody, Td, Th,Tr, Thead, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ContactUs from '../../contact us with time/ContactUs'
import { PanCardNav } from '../../../Components/PanCardNav/PanCardNav'

const Receipt = () => {
    const portalData=JSON.parse(localStorage.getItem('digitalPortal'))||null
const [pans,setPans]=useState([])
const [loading,setLoading]=useState([])
useEffect(()=>{
    axios.get("http://localhost:8080/user/all-pan-card-deatils",{
            headers: {
                "Authorization": portalData.token
              }
        
        }).then((res)=>{
            setLoading(false)
            setPans(res.data.reverse())
        }).catch((err)=>{
            setLoading(false)
            console.log(err);
        })

},[])



  return (
    <Box>
        <PanCardNav/>
        <Box mt={'25px'}>

        <ContactUs/>
        </Box>
        <Box w={'90%'} m={'50px auto'} >
            {
                loading?<Spinner/>:
                <TableContainer border={'1px solid gray'}>
                <Table variant={'simple'}>
                    <Thead>
                        <Tr>
                            <Th>S.No.</Th>
                            <Th>Category</Th>
                            <Th>Token Number</Th>
                            <Th>Apply date</Th>
                            <Th>Download Receipt</Th>
                            <Th>Name</Th>
                            <Th>DOB</Th>
                            <Th>Gender</Th>
                            <Th>Acknowledgement</Th>
                            <Th>Slip Generate Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            pans.map((el,i)=>{
                                return <Tr>
                                    <Td>{i+1}</Td>
                                    <Td>{el.category.toUpperCase()}</Td>
                                    <Td>{el.tokenNumber}</Td>
                                    <Td>{el.date}</Td>
                                    <Td>
                                        {/* <Button size={'xs'} colorScheme='yellow'>Dounload Receipt</Button> */}
                                    </Td>
                                    <Td>{el.firstName+" "+el.middleName+" "+el.lastName}</Td>
                                    <Td>{el.dateOfBirth+"-"+el.monthOfBirth+"-"+el.yearOfBirth}</Td>
                                    <Td>{el.gender}</Td>
                                </Tr>
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            }
           

        </Box>
    </Box>
  )
}

export default Receipt
