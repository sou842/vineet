import { Box, Wrap, WrapItem, Avatar, Text, Grid, Input, Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, flexbox, Heading, useMediaQuery } from "@chakra-ui/react";
import './AdminPayData.css'
import { AdminNavbar } from '../AdminNavbar/AdminNavbar.jsx'
import { AdminSlider } from '../AdminSlider/AdminSlider'
import { useContext, useEffect, useState } from 'react'
import { AuthorContext } from '../../Components/AllContext/AllContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export const AdminPayData = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
    const [userData, setUserData] = useState([])
    const baseURL = process.env.REACT_APP_BASE_URL
    const { side, setSide } = useContext(AuthorContext)
    const navigate = useNavigate();
    const [isSmallerThan1000] = useMediaQuery("(max-width: 1000px)");
    const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
    const [pay, setPay] = useState([]);
    const [idSearch, setIdSearch] = useState("");

const filtering=()=>{
    axios.get(`${baseURL}/admin/user/all-transaction?vendorID=${idSearch}`, {
        headers: { "Authorization": portalData.token }
    })
        .then((data) => {
            setPay(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const handelSearch=()=>{
    filtering()
}


    useEffect(() => {
        filtering()

    }, [])



    return (
        <div>
            <div style={{ position: 'fixed', zIndex: '100', width: '100%', backgroundColor: 'white' }}> <AdminNavbar value={'admindash'} /></div>
            <div className='AdminDash_0'>
                {!isSmallerThan1000 ?
                    <div style={{ width: side ? '24%' : '0px', backgroundColor: '#34495E', paddingTop: '1.4cm' }}>{side ? <div><AdminSlider /></div> : null}</div>
                    :
                    <div>{side ? <div style={{ width: !isSmallerThan600 ? '37%' : '65%', position: 'fixed', zIndex: '10', top: '0', backgroundColor: '#061621eb', paddingTop: '1.4cm', height: '100vh' }}>{side ? <div><AdminSlider /></div> : null}</div> : null}
                    </div>
                }

                <div style={{ width: side && !isSmallerThan1000 ? '75%' : '96%', margin: '1.5cm auto 0.5cm auto' }}>
                    <Box>
                        <Box w={'95%'} display={'flex'} m={'0.5cm auto'}>
                            <input style={{border:'1px solid grey',padding:'10px',borderRadius:'7px',width:'100%'}} type="text" placeholder="Search" onChange={(e)=>setIdSearch(e.target.value)}/>
                            <Button w={'100px'} h={'45px'} ml={'10px'} bg={'blue.400'} onClick={handelSearch}>Search</Button>
                        </Box>
                        <TableContainer>
                            <Table variant='striped' colorScheme='blue'>
                                <Thead>
                                    <Tr>
                                        <Th textAlign={'center'} w={'4%'}>No.</Th>
                                        <Th textAlign={'center'}>VendorID</Th>
                                        <Th textAlign={'center'}>Date</Th>
                                        <Th textAlign={'center'}>Time</Th>
                                        <Th textAlign={'center'}>Value</Th>
                                        <Th textAlign={'center'}>Reason</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {pay.length != 0 && pay?.map((ele, index) => (
                                        <Tr key={index}>
                                            <Td textAlign={'center'}>{index + 1}</Td>
                                            <Td textAlign={'center'}>{ele.vendorID}</Td>
                                            <Td textAlign={'center'} fontSize={['14px', '15px', '16px']}>{ele.dateAndTime.split(' ')[0]}</Td>
                                            <Td textAlign={'center'} fontSize={['14px', '15px', '16px']}>{ele.dateAndTime.split(' ')[1]}</Td>
                                            {ele.credit ?
                                                <Td textAlign={'center'} color={'green'} fontWeight={'bold'}>+{ele.credit && ele.credit}</Td>
                                                :
                                                <Td textAlign={'center'} color={'red'} fontWeight={'bold'}>-{ele.debit && ele.debit}</Td>
                                            }
                                             <Td textAlign={'center'} fontSize={['14px','15px','16px']}>{ele.reason||"Not Found"}</Td>
                                        </Tr>

                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </div>
        </div>
    )
}