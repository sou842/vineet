import { Box, Wrap, WrapItem, Avatar, Text, Grid, Input, Button } from "@chakra-ui/react";
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

        if (userData.length >= 1) {
            var bag = 0;
            for (let i = 0; i < userData.length; i++) bag += +userData[i].balance
            setBalance(bag)
        }


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
    }, [userData])

    return (
        <div>
            <div><AdminNavbar /></div>

            <Box w={['95%', '100%', '100%']} m={'auto'} display={'flex'} justifyContent={'space-evenly'} flexDirection={['column-reverse', 'row', 'row']}>
                <Box w={['100%', '60%', '70%']} m={'auto'}>
                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']} gap={['10px', '15px']} w={'100%'} m={'15px auto'}>
                        {userData && userData?.map((ele, index) => (
                            <Box w={'100%'} key={index} border={'1.4px solid #00aeff'} borderRadius={'7px'} p={'10px'}>
                                <Box w={'100%'} color={'#262626'} bg={'#00aeff'} textAlign={'center'} borderRadius={'5px'} p={'5px'}>{ele.name.toUpperCase()}</Box>
                                <Text mt={'10px'} display={'flex'}><Text mr={'4px'}>Email:</Text>{ele.email}</Text>
                                <Text display={'flex'}><Text mr={'4px'}>Aadhar:</Text>{ele.aadharNumber}</Text>
                                <Text display={'flex'}><Text mr={'4px'}>Aadhar:</Text>{ele.vendorID}</Text>
                                <Text display={'flex'}><Text mr={'4px'}>Joindate:</Text>{ele.joindate}</Text>
                            </Box>
                        ))}
                    </Grid>
                </Box>

                <Box w={['100%', '37%', '28%']} m={'auto'} mt={'0'} mb={'0'}>
                    <Box w={'100%'} h={'300px'} m={'auto'} mt={'15px'} bg={'#262626'} borderRadius={'10px'} p={'10px'}>
                        <Text textAlign={'center'} fontSize={'20px'} border={'1.2px solid white'} borderRadius={'10px'} color={'whiteAlpha.900'}>USER DATA</Text>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={'20px'}>
                            <Input w={'80%'} display={'block'} m={'auto'} bg={'whiteAlpha.900'} type="text" placeholder="Search" />
                            <Button w={'17%'} bg={'#00aeff'} color={'white'} fontSize={'13px'}>Search</Button>
                        </Box>
                        <Box m={'20px'} fontSize={'17px'}>
                            <Text color={'whiteAlpha.900'}>Total Balance: ₹{balance}</Text>
                            <Text color={'whiteAlpha.900'}>Total User: {userData.length}</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}