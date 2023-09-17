import { Avatar, Box, Button, Grid, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, Wrap, WrapItem, useMediaQuery, useToast, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Input } from '@chakra-ui/react';
import './AdminUpdatePanCard.css'
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { AdminSlider } from "../AdminSlider/AdminSlider";
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { AuthorContext } from '../../Components/AllContext/AllContext';


export const AdminUpdatePanCard = () => {
    const baseURL = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const [pan, setPan] = useState([]);
    const [filterData, setFilterData] = useState({ CATEGORY: '', SEARCH: '' })
    const [loading, setLoading] = useState()
    const { side, setSide } = useContext(AuthorContext)
    const [isSmallerThan1000] = useMediaQuery("(max-width: 1000px)");
    const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [status, setStatus] = useState("")
    const [isDone, setIsdone] = useState("")
    const [nameSearch, setNameSearch] = useState('');
    

const handelSearch=()=>{
forFiltering()
}

const forFiltering=()=>{
    setLoading(true)
    axios.get(`${baseURL}/admin/update-pan?page=${page}&status=${status}&isDone=${isDone}&name=${nameSearch}`, {
        headers: { "Authorization": portalData.token }
    })
        .then((res) => {
            // console.log(res.data)
            setPan(res.data.data);
            setCount(res.data.count);
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
        })
}



    useEffect(() => {
        forFiltering()
    }, [filterData,status,page,isDone])


    return (
        <div>

            <div style={{ position: 'fixed', zIndex: '100', width: '100%', backgroundColor: 'white' }}> <AdminNavbar value={'adminpancard'} /></div>
            <div className='AdminDash_0'>
                {!isSmallerThan1000 ?
                    <div style={{ width: side ? '24%' : '0px', backgroundColor: '#34495E', paddingTop: '1.4cm' }}>{side ? <div><AdminSlider slidevalue={'AdminUpdatePanCard'} /></div> : null}</div>
                    :
                    <div>{side ? <div style={{ width: !isSmallerThan600 ? '37%' : '65%', position: 'fixed', zIndex: '10', top: '0', backgroundColor: '#061621eb', paddingTop: '1.4cm', height: '100vh' }}>{side ? <div><AdminSlider slidevalue={'AdminUpdatePanCard'} /></div> : null}</div> : null}
                    </div>
                }

                <div style={{ width: side && !isSmallerThan1000 ? '75%' : '96%', margin: '1.2cm auto' }}>
                    <Box display={'flex'} flexDirection={['column-reverse', 'column-reverse', 'row', 'row']} justifyContent={'space-between'} mt={'1cm'} p={'3px'}>
                        <Box w={['100%', '100%', '50%', '40%']} display={'flex'} gap={['5px', '10px']} margin={['10px 0', '10px 0', '0', '0']}>

                            <select style={{ padding: '10px', border: '1px solid grey', borderRadius: '5px', fontSize: '14px' }} name="status" onChange={(e)=>setStatus(e.target.value)}>
                                <option value="">STATUS</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="rejected">Rejected</option>
                            </select>

                            <select style={{ padding: '10px', border: '1px solid grey', borderRadius: '5px', fontSize: '14px' }} name="isUserDone" onChange={(e)=>setIsdone(e.target.value)}>
                                <option value="">IS USER DONE</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </Box>
                        <Box w={['100%', '100%', '45%', '45%']} display={'flex'}>
                            <Input border={'1px solid grey'} borderRadius={'7px'} type="text" placeholder='Search...'  onChange={(e)=>setNameSearch(e.target.value)}/>
                            <Button fontSize={'14px'} ml={'7px'} bg={'blue.500'} color={'whiteAlpha.900'} borderRadius={'7px'} onClick={handelSearch} >Search</Button>
                        </Box>
                    </Box>

                    {loading ? <Box display={'flex'} justifyContent={'center'} mt={'2cm'} mb={'2cm'}><Spinner color='#00aeff' /></Box> :

                        <Box>{pan.length == 0 ? <Box minH={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} maxH={'100vh'} overflow={'scroll'} scrollBehavior={'smooth'}>NO DATA FOUND</Box> :
                            <TableContainer>
                                <Table variant='striped' colorScheme='teal'>
                                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th w={'4%'}>No.</Th>
                                            <Th>Category</Th>
                                            <Th>Name</Th>
                                            <Th>Apply date</Th>
                                            <Th>From user</Th>
                                            <Th>Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {pan?.map((ele, index) => (
                                            <Tr key={index} fontSize={['12px', '13px', '14px']} onClick={() => navigate(`/AdminPanCard/AdminPanCardPerson/updatepan-${ele._id}`)} cursor={'pointer'}>
                                                <Td w={'70px'}>{index + 1}</Td>
                                                <Td>{ele.category}</Td>
                                                {ele.category == 'Individual' ?
                                                    <Td>{ele.firstName + " " + ele.middleName + " " + ele.lastName}</Td>
                                                    :
                                                    <Td>{ele.organization}</Td>
                                                }
                                                <Td>{ele.date}</Td>
                                                {ele.isDoneFromUser ?
                                                    <Td w={'60px'} fontWeight={'bold'} color={'green'} fontSize={'15px'} textAlign={'center'}>✓</Td>
                                                    :
                                                    <Td w={'60px'} fontWeight={'bold'} color={'red'} fontSize={'15px'} textAlign={'center'}>✕</Td>
                                                }
                                                {ele.panStatus == 'pending' ? <Td color={'blue.600'}>{ele.panStatus.toUpperCase()}</Td> : null}
                                                {ele.panStatus == 'completed' ? <Td color={'green'}>{ele.panStatus.toUpperCase()}</Td> : null}
                                                {ele.panStatus == 'rejected' ? <Td color={'red'}>{ele.panStatus.toUpperCase()}</Td> : null}
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        }
                         <Box textAlign={'right'} m={'10px'}>
                    
                            <Box><Button size={'sm'} onClick={(e) => setPage(page - 1)} isDisabled={page == 1} mr={'5px'} colorScheme={'red'}>⟨</Button>
                                <Button size={'sm'} mr={'5px'} >{page}</Button>
                                <Button size={'sm'} colorScheme='blue' onClick={(e) => setPage(page + 1)} isDisabled={page == (Math.ceil(count / 10)) || count == 0}>⟩</Button>
                            </Box>
                        
                    </Box>
                        </Box>}
                </div>
            </div>
        </div>
    )
}