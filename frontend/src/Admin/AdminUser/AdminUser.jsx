import { Box, Wrap, WrapItem, Avatar, Text, Grid, Input, Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, flexbox } from "@chakra-ui/react";
import axios from "axios"
import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom";
import { AdminNavbar } from "../AdminNavbar/AdminNavbar";

export const AdminUser = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
    const [userData, setUserData] = useState([])
    const [balance, setBalance] = useState(Number)
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8080/admin/current-user`, {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                setUserData(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <div><AdminNavbar /></div>

            <Box w={['95%', '90%', '90%']} m={'auto'} pt={'10px'} pb={'1cm'}>
                <Box mt={'10px'} mb={'15px'} display={'flex'} flexDirection={'row-reverse'}>
                    <Box w={['80%','60%','40%']} display={'flex'} alignItems={'center'}>
                    <input style={{width:'100%',border:'1.2px solid grey',borderRadius:'10px',padding:'10px'}} type="text" placeholder="Search.."/>
                    <Button ml={'5px'} color={'whiteAlpha.900'} bg={'blue.400'}>Search</Button>
                    </Box>
                </Box>
                <Box w={'100%'} m={'auto'}>
                    <TableContainer>
                        <Table variant='striped' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th w={'4%'}>No.</Th>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Aadhar</Th>
                                    <Th>Vendor ID</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {userData && userData?.map((ele, index) => (
                                    <Tr key={index} fontSize={['12px', '13px', '14px']} onClick={() => navigate(`/AdminUser/AminPerson/${ele.vendorID}`)} cursor={'pointer'}>
                                        <Td w={'4%'}>{index + 1}</Td>
                                        <Td>{ele.name}</Td>
                                        <Td>{ele.email}</Td>
                                        <Td>{ele.aadharNumber}</Td>
                                        <Td>{ele.vendorID}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </div>
    )
}