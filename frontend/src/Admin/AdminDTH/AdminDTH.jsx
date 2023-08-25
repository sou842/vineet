import { Avatar, Box, Button, Grid, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, Wrap, WrapItem, useMediaQuery, useToast, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Input, } from '@chakra-ui/react';
import { AdminSlider } from "../AdminSlider/AdminSlider"
import { AdminNavbar } from "../AdminNavbar/AdminNavbar"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthorContext } from "../../Components/AllContext/AllContext"
import './AdminDTH.css'
import axios from "axios"


export const AdminDTH = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
    const { side, setSide } = useContext(AuthorContext)
    const navigate = useNavigate();
    const [isSmallerThan1000] = useMediaQuery("(max-width: 1000px)");
    const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
    const baseURL = process.env.REACT_APP_BASE_URL
    const [DTHData, setDTHData] = useState([])            
    const [loading, setLoading] = useState()



    useEffect(() => {
        setLoading(true)
        axios.get(`${baseURL}/admin/admin_DTH_recharge`, {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                setLoading(false)
                setDTHData(res.data.DTH)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err);
            })
    }, [])

    return (
        <Box>
            <div>
                <div style={{ position: 'fixed', zIndex: '100', width: '100%', backgroundColor: 'white' }}> <AdminNavbar value={'admindash'} /></div>
                <div className='AdminDash_0'>
                    {!isSmallerThan1000 ?
                        <div style={{ width: side ? '24%' : '0px', backgroundColor: '#34495E', paddingTop: '1.4cm' }}>{side ? <div><AdminSlider slidevalue={'MOBILE'} /></div> : null}</div>
                        :
                        <div>{side ? <div style={{ width: !isSmallerThan600 ? '37%' : '65%', position: 'fixed', zIndex: '10', top: '0', backgroundColor: '#061621eb', paddingTop: '1.4cm', height: '100vh' }}>{side ? <div><AdminSlider slidevalue={'MOBILE'} /></div> : null}</div> : null}
                        </div>
                    }

                    <div style={{ width: side && !isSmallerThan1000 ? '75%' : '96%', margin: '1.5cm auto 0.5cm auto' }}>
                        <Box display={'flex'} justifyContent={'flex-end'} m={'0.5cm auto'}>
                            <Box w={['95%', '70%', '50%']} display={'flex'}>
                                <Input type={'text'} border={'1px solid grey'} placeholder={'Enter...'} />
                                <Button ml={'7px'} bg={'blue.400'} color={'whiteAlpha.900'} fontSize={'14px'}>Search</Button>
                            </Box>
                        </Box>

                        {loading ? <Box display={'flex'} justifyContent={'center'} mt={'2cm'} mb={'2cm'}><Spinner color='#00aeff' /></Box> :
                            <Box>{DTHData.length == 0 ? <Box minH={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} maxH={'100vh'} overflow={'scroll'} scrollBehavior={'smooth'}>NO DATA FOUND</Box> :
                                <TableContainer>
                                    <Table variant='striped' colorScheme='teal'>
                                        <Thead>
                                            <Tr>
                                                <Th textAlign={'center'} w={'4%'}>No.</Th>
                                                <Th textAlign={'center'}>Operator</Th>
                                                <Th textAlign={'center'}>Number</Th>
                                                <Td textAlign={'center'}>Date</Td>
                                                <Th textAlign={'center'}>Time</Th>
                                                <Th textAlign={'center'}>Status</Th>
                                                <Th textAlign={'center'} w={'5%'}>Amount</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {DTHData.length != 0 && DTHData?.map((ele, index) => (
                                                <Tr key={index} fontSize={'14px'}>
                                                    <Td textAlign={'center'}>{index + 1}</Td>
                                                    <Td textAlign={'center'}>{ele.operator}</Td>
                                                    <Td textAlign={'center'}>{ele.phone}</Td>
                                                    <Td textAlign={'center'}>{ele.date}</Td>
                                                    <Td textAlign={'center'}>{ele.time}</Td>
                                                    {ele.status ?
                                                        <Td color={'green'} textAlign={'center'}>{'Completed'}</Td>
                                                        :
                                                        <Td color={'red'} textAlign={'center'}>{'Pending'}</Td>
                                                    }
                                                    <Td textAlign={'center'} color={'green'} fontWeight={'bold'}>₹ {ele.amount}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            }
                                <Box textAlign={'right'} m={'10px'}>

                                    {/* <Box><Button size={'sm'} onClick={(e) => setPage(page - 1)} isDisabled={page == 1} mr={'5px'} colorScheme={'red'}>⟨</Button>
                                        <Button size={'sm'} mr={'5px'} >{page}</Button>
                                        <Button size={'sm'} colorScheme='blue' onClick={(e) => setPage(page + 1)} isDisabled={page == (Math.ceil(count / 10)) || count == 0}>⟩</Button>
                                    </Box> */}

                                </Box>
                            </Box>}
                    </div>
                </div>
            </div>
        </Box>
    )
}