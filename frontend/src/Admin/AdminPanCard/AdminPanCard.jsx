import { Avatar, Box, Button, Grid, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, Wrap, WrapItem, useMediaQuery, useToast, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Input } from '@chakra-ui/react';
import './AdminPanCard.css'
import { useEffect, useState, useContext, useRef } from "react";
import axios from 'axios'
import { AdminSlider } from "../AdminSlider/AdminSlider";
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { AuthorContext } from '../../Components/AllContext/AllContext';


export const AdminPanCard = () => {
    const baseURL = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const [pan, setPan] = useState([]);
    const [filterData, setFilterData] = useState({ CATEGORY: '', SEARCH: '' })
    const [loading, setLoading] = useState()
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [status, setStatus] = useState("")
    const [isDone, setIsdone] = useState("")
    const { side, setSide } = useContext(AuthorContext)
    const [isSmallerThan1000] = useMediaQuery("(max-width: 1000px)");
    const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
    const [nameSearch, setNameSearch] = useState('');





    const data = () => {
        setLoading(true)
        axios.get(`${baseURL}/admin/category-pan?category=${filterData.CATEGORY}&page=${page}&status=${status}&isDone=${isDone}&name=${nameSearch}`, {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                console.log(res.data)
                setPan(res.data.data);
                setCount(res.data.count);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

   

    const handleChange = (event) => {
        setPage(1)
        const { name, value } = event.target;
        setFilterData((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }
    const handelIsDoneChange = (e) => {
        setIsdone(e.target.value)
    }


    const handleSearch = () => {
        data()
    }

    useEffect(() => {
        data()
    }, [filterData, page, status, isDone])


    return (
        <div>

            <div style={{ position: 'fixed', zIndex: '100', width: '100%', backgroundColor: 'white' }}> <AdminNavbar value={'adminpancard'} /></div>
            <div className='AdminDash_0'>
                {!isSmallerThan1000 ?
                    <div style={{ width: side ? '24%' : '0px', backgroundColor: '#34495E', paddingTop: '1.4cm' }}>{side ? <div><AdminSlider slidevalue={'AdminPanCard'} /></div> : null}</div>
                    :
                    <div>{side ? <div style={{ width: !isSmallerThan600 ? '37%' : '65%', position: 'fixed', zIndex: '10', top: '0', backgroundColor: '#061621eb', paddingTop: '1.4cm', height: '100vh' }}>{side ? <div><AdminSlider slidevalue={'AdminPanCard'} /></div> : null}</div> : null}
                    </div>
                }

                <div style={{ width: side && !isSmallerThan1000 ? '75%' : '96%', margin: '1.2cm auto' }}>
                    <Box display={'flex'} flexDirection={['column-reverse', 'column-reverse', 'row', 'row']} justifyContent={'space-between'} mt={'1cm'} p={'3px'}>
                        <Box w={['100%', '100%', '50%', '45%']} display={'flex'} gap={['5px', '10px']} margin={['10px 0', '10px 0', '0', '0']}>
                            <select style={{ padding: '10px', border: '1px solid grey', borderRadius: '5px', fontSize: '14px', }} name="CATEGORY" value={filterData.CATEGORY} onChange={handleChange}>
                                <option value="">CATEGORY</option>
                                <option value="Individual">Individual</option>
                                <option value="Artificial Judicial Person">Artificial Judicial Person</option>
                                <option value="Association of Person">Association of Person</option>
                                <option value="Trust">Trust</option>
                                <option value="Body of Individual">Body of Individual</option>
                                <option value="Firm">Firm</option>
                                <option value="Government">Government</option>
                                <option value="Limited Liability Partnership">Limited Liability Partnership</option>
                                <option value="Local Authority">Local Authority</option>
                            </select>

                            <select style={{ padding: '10px', border: '1px solid grey', borderRadius: '5px', fontSize: '14px' }} name="status" onChange={handleStatusChange}>
                                <option value="">STATUS</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="rejected">Rejected</option>
                            </select>

                            <select style={{ padding: '10px', border: '1px solid grey', borderRadius: '5px', fontSize: '14px' }} name="isUserDone" onChange={handelIsDoneChange}>
                                <option value="">IS USER DONE</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </Box>
                        <Box w={['100%', '100%', '45%', '45%']} display={'flex'}>
                            <Input onChange={(e) => setNameSearch(e.target.value)} border={'1px solid grey'} borderRadius={'7px'} type="text" placeholder='Search...' />
                            <Button onClick={handleSearch} fontSize={'14px'} ml={'7px'} bg={'blue.500'} color={'whiteAlpha.900'} borderRadius={'7px'} >Search</Button>
                        </Box>
                    </Box>

                    {loading ? <Box display={'flex'} justifyContent={'center'} mt={'2cm'} mb={'2cm'}><Spinner color='#00aeff' /></Box> :

                        <Box minH={'60vh'}>{pan && pan.length == 0 ? <Box minH={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} maxH={'100vh'} overflow={'scroll'} scrollBehavior={'smooth'}>NO DATA FOUND</Box> :
                            <TableContainer>
                                <Table variant='striped' colorScheme='teal'>
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
                                            <Tr key={index} fontSize={['12px', '13px', '14px']} onClick={() => navigate(`/AdminPanCard/AdminPanCardPerson/newpan-${ele._id}`)} cursor={'pointer'}>
                                                <Td w={'70px'}>{index + 1}</Td>
                                                <Td>{ele.category}</Td>
                                                {ele.category == 'Individual' ?
                                                    <Td>{ele.firstName + " " + ele.middleName + " " + ele.lastName}</Td>
                                                    :
                                                    <Td>{ele.organization}</Td>
                                                }
                                                {/* <Td>{ele.tokenNumber}</Td> */}
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
                        </Box>}
                    <Box textAlign={'right'} m={'10px'}>
                        {count != 0 ?
                            <Box><Button size={'sm'} onClick={(e) => setPage(page - 1)} isDisabled={page == 1} mr={'5px'} colorScheme={'blue'}>⟨</Button>
                                <Button size={'sm'} mr={'5px'}>{page}</Button>
                                <Button size={'sm'} colorScheme='blue' onClick={(e) => setPage(page + 1)} isDisabled={page == (Math.ceil(count / 10)) || count == 0}>⟩</Button>
                            </Box> : null
                        }
                    </Box>
                </div>

            </div>
        </div>
    )
}