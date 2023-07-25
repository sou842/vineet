import { Box, Table, TableContainer, Tbody, Td, Th, Tr, Thead, Spinner, Text, Button, Grid } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ContactUs from '../../contact us with time/ContactUs'
import { PanCardNav } from '../../../Components/PanCardNav/PanCardNav'
import {Footer} from '../../../Components/Footer/Footer.jsx'


const Receipt = () => {
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
    const [pans, setPans] = useState([])
    const [loading, setLoading] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/user/all-pan-card-deatils", {
            headers: {
                "Authorization": portalData.token
            }

        }).then((res) => {
            setLoading(false)
            setPans(res.data.reverse())
        }).catch((err) => {
            setLoading(false)
            console.log(err);
        })

    }, [])

    console.log(pans)

    return (
        <Box>
            <PanCardNav />
            <Box mt={'25px'}><ContactUs /></Box>

            {
                loading ? <Box display={'flex'} justifyContent={'center'} mt={'3cm'}><Spinner color='blue.300'/></Box> :
                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={['5px', '10px']} w={'90%'} m={'1cm auto'}>
                        {
                            pans?.map((ele, index) => (
                                <Box key={index} p={'10px'} pr={'5px'} pl={'5px'}>
                                    <Box textAlign={'center'} p={'7px'} bg={'green.200'} w={'95%'} m={'auto'} mt={'10px'} mb={'15px'}>{ele.category.toUpperCase()}</Box>
                                    <Box w={'90%'} m={'auto'}>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Name :<Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.firstName + " " + ele.middleName + " " + ele.lastName}</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Token : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.tokenNumber}</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Apply date : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.date}</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Acknowledgement : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>pending</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Slip Generate Date : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>null</Text></Text>
                                    </Box>
                                    <Box>
                                        <Button bg={'blue.400'} color={'white'} w={'95%'} m={'auto'} mt={'10px'} mb={'10px'} display={'block'}>Download Receipt</Button>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Grid>
            }
        <Box><Footer/></Box>
        </Box>
    )
}

export default Receipt



{/* <TableContainer border={'1px solid gray'}>
<Table variant={'simple'}>
    <Thead>
        <Tr>
            <Th>S.No.</Th>
            <Th>Category</Th>
            <Th>Token Number</Th>
            <Th>Apply date</Th>
            <Th>Download Receipt</Th>
            <Th>Name</Th>

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
                        // <Button size={'xs'} colorScheme='yellow'>Dounload Receipt</Button> 
                    </Td>
                    <Td>{el.firstName+" "+el.middleName+" "+el.lastName}</Td>
                </Tr>
            })
        }
    </Tbody>
</Table>
</TableContainer> */}