import { Avatar, Box, Button, Grid, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, Wrap, WrapItem, useMediaQuery, useToast, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import './AdminPanCard.css'
import { useEffect, useState } from "react";
import axios from 'axios'
import { AdminSlider } from "../AdminSlider/AdminSlider";
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import { useNavigate } from 'react-router-dom';


export const AdminPanCard = () => {
    const navigate = useNavigate();
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const [pan, setPan] = useState([]);
    const [filterData, setFilterData] = useState({ CATEGORY: '', SEARCH: '' })
    const [loading, setLoading] = useState()


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilterData((prevData) => ({ ...prevData, [name]: value }));
    }


    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:8080/admin/category-pan?category=${filterData.CATEGORY}`, {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                console.log(res.data)
                setPan(res.data);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [filterData])


    return (
        <div>
            <div><AdminNavbar /></div>

            <div className="AdminPanCard_0">
                <div style={{ width: '24%' }}>
                    <AdminSlider slidevalue={'AdminPanCard'} />
                </div>

                <div style={{ width: '75%' }}>
                    <div className='AdminPanCard_subnav'>
                        <div>
                            {/* <select name="city" required value={formData.city} onChange={handleChange}> */}

                            <select name="CATEGORY" value={filterData.CATEGORY} onChange={handleChange}>
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
                        </div>
                        <div>
                            <input type="text" placeholder='Search...' />
                            <img onClick={() => console.log('Search...')} src="https://cdn-icons-png.flaticon.com/128/758/758917.png" alt="search" />
                        </div>
                    </div>
                    {loading ? <Box display={'flex'} justifyContent={'center'} mt={'2cm'} mb={'2cm'}><Spinner color='#00aeff' /></Box> :

                        <Box>{pan.length == 0 ? <Box minH={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>NO DATA FOUND</Box> :
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
                                            <Th>Acknowledge</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {pan?.map((ele, index) => (
                                            <Tr key={index} fontSize={['12px', '13px', '14px']} onClick={() => navigate(`/AdminPanCard/AdminPanCardPerson/${ele._id}`)} cursor={'pointer'}>
                                                <Td w={'4%'}>{index+1}</Td>
                                                <Td>{ele.category}</Td>
                                                {ele.category == 'Individual' ?
                                                    <Td>{ele.firstName + " " + ele.middleName + " " + ele.lastName}</Td>
                                                    :
                                                    <Td>{ele.organization}</Td>
                                                }
                                                {/* <Td>{ele.tokenNumber}</Td> */}
                                                <Td>{ele.date}</Td>
                                                <Td fontSize={'15px'} textAlign={'center'}>{ele.isDoneFromUser?"✓":"✕"}</Td>
                                                <Td >{ele.acknowledgement.toUpperCase()}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        }
                        </Box>}
                </div>
            </div>
        </div>
    )
}