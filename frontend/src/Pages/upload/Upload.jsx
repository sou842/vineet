import { Box, Button, Heading, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ContactUs from '../contact us with time/ContactUs'
import axios from 'axios'
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav'
import { useNavigate } from 'react-router-dom'
import UploadDocument from '../upload document/UploadDocument'

const Upload = () => {
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null;
    const navigate = useNavigate()
    const [pans, setPans] = useState([])
    const [loading, setLoading] = useState(false)


    const GetData = () => {
        axios.get("http://localhost:8080/user/all-pan-card-deatils", {
            headers: { "Authorization": portalData.token }

        }).then((res) => {
            // setLoading(false)
            setPans(res.data.reverse())
            //console.log(res.data);
        }).catch((err) => {
            // setLoading(false)
            console.log(err);
        })
    }

    useEffect(() => {
        // setLoading(true)
        GetData()
    }, [])

    return (
        <Box>
            <Box>
                <PanCardNav />
            </Box>
            <Box mt={'20px'}>
                <ContactUs />
            </Box>
            <Box w={'90%'} m={'auto'} bg={'white'} mt={'50px'}>
                <TableContainer >
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>S.No</Th>
                                <Th>Token Number</Th>
                                <Th>Apply Date</Th>
                                <Th>Name</Th>
                                <Th>Mobile</Th>
                                <Th>Edit</Th>
                                <Th>Upload</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                loading ? <Box h={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} ><Spinner /></Box> : pans.map((el, i) => {
                                    if (!el.isUploadDocs) {
                                        return <Tr key={i} bg={'white'} >
                                            <Td>{i + 1}</Td>
                                            <Td>{el.tokenNumber}</Td>
                                            <Td>{el.date}</Td>
                                            <Td>{el.firstName + " " + el.middleName + " " + el.lastName}</Td>
                                            <Td>{el.telephoneNumber || "NA"}</Td>
                                            <Td><Button size={'xs'} colorScheme='yellow'>Edit</Button></Td>
                                            <Td><Button size={'xs'} colorScheme={'green'} onClick={() => navigate(`/user/upload-document/${el._id}`)}>Upload</Button></Td>
                                        </Tr>
                                    }
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>

            </Box>

        </Box>
    )
}

export default Upload
