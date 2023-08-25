import { Box, Button, Grid, Heading, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import './DTHRechargeTransaction.css'
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../../Components/Footer/Footer'

export const DTHRechargeTransaction = () => {
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
    const baseURL = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [rechargedata, setRechargeData] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios.get(`${baseURL}/DTHRecharge/recharge_data`, {
            headers: { "Authorization": portalData.token }
        })
            .then((data) => {
                setRechargeData(data.data.DTHRecharge)
                setLoading(false)

            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    // console.log(rechargedata)

    return (
        <Box>
            <DashboardNav vall={'DTHRecharge'} />

            <Box minH={'60vh'}>
                {loading ? <Box display={'flex'} minH={'60vh'} justifyContent={'center'} alignItems={'center'} ><Spinner color='#00aeff' /></Box> :
                    <Box w={'90%'} m={'1cm auto'}>
                        {rechargedata.length == 0 ? <Box textAlign={'center'}>NO DATA FOUND</Box> : null}

                        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={['10px', '15px']} w={'95%'} m={'0 auto 1cm auto'}>
                            {rechargedata.length != 0 && rechargedata.map((el, i) => {
                                return (
                                    <Box key={i} border={'2px solid #00aeff'} pt={'10px'} pb={'5px'} borderRadius={'15px'}>
                                        <Box textAlign={'center'} fontWeight={'bold'} p={'7px'} color={'whiteAlpha.900'} bg={'#00aeff'} w={'100%'} m={'auto'} mt={'10px'} mb={'15px'}>{el.operator.toUpperCase()}</Box>
                                        <Box w={'90%'} m={'auto'}>
                                            <Box mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Number:<Text fontWeight={'normal'} ml={'10px'}>{el.phone}</Text></Box>
                                            <Box mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Date:<Text fontWeight={'normal'} ml={'10px'}>{el.date}</Text></Box>
                                            <Box mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Time:<Text fontWeight={'normal'} ml={'10px'}>{el.time}</Text></Box>
                                            <Box mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Amount:<Text fontWeight={'normal'} ml={'10px'}>₹ {el.amount}</Text></Box>
                                        </Box>

                                    </Box>
                                )
                            })}
                        </Grid>
                    </Box>
                }
            </Box>

            <Box><Footer /></Box>
        </Box>
    )
}