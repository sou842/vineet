import { Avatar, Box, Button, Grid, Menu, MenuButton, MenuItem, MenuList, Text, Wrap, WrapItem, useMediaQuery, useToast } from '@chakra-ui/react';
import './AdminPanCard.css'
import { useEffect, useState } from "react";
import axios from 'axios'
import { AdminSlider } from "../AdminSlider/AdminSlider";
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import { useNavigate } from 'react-router-dom';


export const AdminPanCard = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const [pan, setPan] = useState([]);
    const navigate = useNavigate();
    const [filterData, setFilterData] = useState({ CATEGORY: '', SEARCH: '' })
    // let match = window.matchMedia("(max-width:750px)").matches;


    // http://localhost:8080/admin/category-pan?category=individual

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilterData((prevData) => ({ ...prevData, [name]: value }));
    }

    console.log(filterData)


    useEffect(() => {
        axios.get("http://localhost:8080/admin/all-pan", {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                // console.log(res.data)
                setPan(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


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
                                <option value="" disabled>CATEGORY</option>
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
                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={['10px', '15px']} w={'97%'} m={'15px auto'}>
                        {pan && pan?.map((ele, index) => (
                            <Box key={index} onClick={() => navigate(`/AdminPanCard/AdminPanCardPerson/${ele.userID}`)} cursor={'pointer'} border={'1.5px solid #00aeff'} borderRadius={'15px'} pt={'10px'} pb={'10px'}>
                                <Box textAlign={'center'} fontWeight={'bold'} p={'7px'} bg={'#00aeff'} color={'whiteAlpha.900'} w={'100%'} m={'auto'} mt={'10px'} mb={'15px'}>{ele.category.toUpperCase()}</Box>
                                <Box w={'90%'} m={'auto'}>
                                    {ele.category == 'Individual' ?
                                        <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Name:<Text fontWeight={'normal'} ml={'10px'}>{ele.firstName + " " + ele.middleName + " " + ele.lastName}</Text></Text>
                                        :
                                        <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Organization:<Text fontWeight={'normal'} ml={'10px'}>{ele.organization}</Text></Text>
                                    }
                                    <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Token : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.tokenNumber}</Text></Text>
                                    <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>ID : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.userID}</Text></Text>
                                    <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Apply date : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.date}</Text></Text>
                                    <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Acknowledgement : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>pending</Text></Text>
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    )
}
