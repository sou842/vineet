import { Box, Wrap, WrapItem, Avatar, Text, Grid, Input, Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, flexbox } from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';
import './AminPerson';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AdminNavbar } from "../AdminNavbar/AdminNavbar";


export const AminPerson = () => {
        // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
         const baseURL=process.env.REACT_APP_BASE_URL
    //  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const [users, setUsers] = useState();
    const [pan, setPan] = useState();
    const [openingdata, setOpeningdata] = useState(true);
    const [pandata, setPandata] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();


    const handleState = (value) => {
        setOpeningdata(false)
        setPandata(false)
        console.log(value)
        if (value == 'pancard') {
            setPandata(true)

            axios.get(`${baseURL}/admin/user/pancards/${users&&users.vendorID}`, {
                headers: { "Authorization": portalData.token }
            })
                .then((res) => {
                    console.log(res.data)
                    setPan(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        if (value == 'user') setOpeningdata(true)
    }

    useEffect(() => {
        axios.get(`${baseURL}/admin/user-profile-data/${id}`, {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                // console.log(res.data)
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <div><AdminNavbar /></div>
            <Box w={'95%'} display={'flex'} justifyContent={'space-between'} flexDirection={['column', 'column', 'column', 'row']} m={'auto'} pt={'20px'} pb={'1cm'}>
                <Box w={['100%', '100%', '100%', '38%']} display={'flex'} justifyContent={'space-between'} flexDirection={['column', 'column', 'row', 'column']} alignItems={'center'}>
                    <Box w={'95%'} h={['250px']} m={'auto'} border={'1px solid grey'} display={'flex'} mb={'5px'} justifyContent={'center'} alignItems={'center'}>
                        <Text fontSize={'30px'} fontWeight={'bold'} color={'#00aeff'}>{users && users.name.match(/\b\w/g).join('').toUpperCase()}</Text>
                    </Box>
                    <Box w={'95%'} m={'auto'} mt={'20px'}>
                    <Box color={'grey'} display={'flex'} fontSize={'15px'} m={'5px'} mb={'5px'} justifyContent={'space-between'} textTransform={'uppercase'}>USER DATA<Button h={'35px'} fontSize={'14px'} color={openingdata?'blue.300':'white'} bg={openingdata?'white':'#00aeff'} onClick={() => handleState('user')}>OPEN</Button></Box>
                        <Box color={'grey'} display={'flex'} fontSize={'15px'} m={'5px'} mb={'5px'} justifyContent={'space-between'} textTransform={'uppercase'}>Pan Card<Button h={'35px'} fontSize={'14px'}  color={pandata?'blue.300':'white'} bg={pandata?'white':'#00aeff'} onClick={() => handleState('pancard')}>OPEN</Button></Box>
                        <Box color={'grey'} display={'flex'} fontSize={'15px'} m={'5px'} mb={'5px'} justifyContent={'space-between'} textTransform={'uppercase'}>Electricity<Button h={'35px'} fontSize={'14px'} color={'white'} bg={'#00aeff'}>OPEN</Button></Box>
                        <Box color={'grey'} display={'flex'} fontSize={'15px'} m={'5px'} mb={'5px'} justifyContent={'space-between'} textTransform={'uppercase'}>Mobile Recharge<Button h={'35px'} fontSize={'14px'} color={'white'} bg={'#00aeff'}>OPEN</Button></Box>
                        <Box color={'grey'} display={'flex'} fontSize={'15px'} m={'5px'} mb={'5px'} justifyContent={'space-between'} textTransform={'uppercase'}>DTH Recharge<Button h={'35px'} fontSize={'14px'} color={'white'} bg={'#00aeff'}>OPEN</Button></Box>
                        <Box color={'grey'} display={'flex'} fontSize={'15px'} m={'5px'} mb={'5px'} justifyContent={'space-between'} textTransform={'uppercase'}>Income Tax Return<Button h={'35px'} fontSize={'14px'} color={'white'} bg={'#00aeff'}>OPEN</Button></Box>
                        <Box color={'grey'} display={'flex'} fontSize={'15px'} m={'5px'} mb={'5px'} justifyContent={'space-between'} textTransform={'uppercase'}>GST<Button h={'35px'} fontSize={'14px'} color={'white'} bg={'#00aeff'}>OPEN</Button></Box>
                        <Box color={'grey'} display={'flex'} fontSize={'15px'} m={'5px'} mb={'5px'} justifyContent={'space-between'} textTransform={'uppercase'}>Digital Job Portal<Button h={'35px'} fontSize={'14px'} color={'white'} bg={'#00aeff'}>OPEN</Button></Box>
                        <Box color={'grey'} display={'flex'} fontSize={'15px'} m={'5px'} mb={'5px'} justifyContent={'space-between'} textTransform={'uppercase'}>Social Services<Button h={'35px'} fontSize={'14px'} color={'white'} bg={'#00aeff'}>OPEN</Button></Box>
                        <Box color={'grey'} display={'flex'} fontSize={'15px'} m={'5px'} mb={'5px'} justifyContent={'space-between'} textTransform={'uppercase'}>National Pension System<Button h={'35px'} fontSize={'14px'} color={'white'} bg={'#00aeff'}>OPEN</Button></Box>
                    </Box>
                </Box>
                <Box w={['100%', '100%', '100%', '60%']}>
                    {openingdata ? <TableContainer>
                        <Table variant='striped' colorScheme='blue'>
                            <Thead>
                                <Tr>
                                    <Th>Type</Th>
                                    <Th>Value</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Name:</Td>
                                    <Td>{users && users.name}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Email:</Td>
                                    <Td>{users && users.email}</Td>
                                </Tr>
                                <Tr>
                                    <Td>City:</Td>
                                    <Td>{users && users.city}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Address:</Td>
                                    <Td>{users && users.address}</Td>
                                </Tr>
                                <Tr>
                                    <Td>State:</Td>
                                    <Td>{users && users.state}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Mobile:</Td>
                                    <Td>{users && users.mobileNumber}</Td>
                                </Tr>
                                <Tr>
                                    <Td>PAN Card:</Td>
                                    <Td>{users && users.panNumber}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Balance:</Td>
                                    <Td>{users && users.balance}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Shop Name:</Td>
                                    <Td>{users && users.shopeName}</Td>
                                </Tr>
                                <Tr>
                                    <Td>User ID:</Td>
                                    <Td>{users && users._id}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Aadhar:</Td>
                                    <Td>{users && users.aadharNumber}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Join Date:</Td>
                                    <Td>{users && users.joindate}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer> : null}
                    {pandata ? <TableContainer>
                        <Table variant='striped' colorScheme='blue'>
                            <Thead>
                                <Tr>
                                    <Th w={'4%'}>No.</Th>
                                    <Th>Category</Th>
                                    <Th>Name</Th>
                                    <Th>Apply date</Th>
                                    <Th>Acknowledge</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {pan && pan?.map((ele, index) => (
                                    <Tr key={index} fontSize={['12px', '13px', '14px']} onClick={() => navigate(`/AdminPanCard/AdminPanCardPerson/${ele._id}`)} cursor={'pointer'}>
                                        <Td w={'4%'}>{index + 1}</Td>
                                        <Td>{ele.category}</Td>
                                        {ele.category == 'Individual' ?
                                            <Td>{ele.firstName + " " + ele.middleName + " " + ele.lastName}</Td>
                                            :
                                            <Td>{ele.organization}</Td>
                                        }
                                        {/* <Td>{ele.tokenNumber}</Td> */}
                                        <Td>{ele.date}</Td>
                                        <Td>pending</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer> : null}
                </Box>
            </Box>
        </div>
    )
}