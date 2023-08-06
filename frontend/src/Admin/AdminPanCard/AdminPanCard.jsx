import { Avatar, Box, Button, Grid, Menu, MenuButton, MenuItem, MenuList, Text, Wrap, WrapItem, useMediaQuery, useToast } from '@chakra-ui/react';
import './AdminPanCard.css'
import { useEffect, useState } from "react";
import axios from 'axios'
import { AdminSlider } from "../AdminSlider/AdminSlider";
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';


export const AdminPanCard = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const [pan, setPan] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/admin/all-pan", {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                console.log(res.data)
                setPan(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <div>
        <div><AdminNavbar/></div>

        <div className="AdminPanCard_0">
            <div style={{ width: '24%' }}>
                <AdminSlider slidevalue={'AdminPanCard'} />
            </div>

            <div style={{width:'75%'}}>
            <div className='AdminPanCard_subnav'>
                <div>
                <select name="" id="">
                    <option value="">CATEGORY</option>
                </select>
                </div>
                <div>
                <input type="text" placeholder='Search...'/>
                <img onClick={()=>console.log('Search...')} src="https://cdn-icons-png.flaticon.com/128/758/758917.png" alt="search" />
                </div>
            </div>
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={['10px', '15px']} w={'97%'} m={'15px auto'}>
                            {pan&&pan?.map((ele, index) => (
                                <Box key={index} border={'1.5px solid #00aeff'} borderRadius={'15px'} pt={'10px'} pb={'10px'}>
                                    <Box textAlign={'center'} fontWeight={'bold'} p={'7px'} bg={'#00aeff'} color={'whiteAlpha.900'} w={'100%'} m={'auto'} mt={'10px'} mb={'15px'}>{ele.category.toUpperCase()}</Box>
                                    <Box w={'90%'} m={'auto'}>
                                        {ele.category == 'Individual' ?
                                            <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Name:<Text fontWeight={'normal'} ml={'10px'}>{ele.firstName + " " + ele.middleName + " " + ele.lastName}</Text></Text>
                                            :
                                            <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Organization:<Text fontWeight={'normal'} ml={'10px'}>{ele.organization}</Text></Text>
                                        }                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Token : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.tokenNumber}</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Apply date : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.date}</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Acknowledgement : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>pending</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Slip Generate Date : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>null</Text></Text>
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
            </div>
        </div>
        </div>
    )
}
