import { Box, Table, TableContainer, Tbody, Td, Th, Tr, Thead, Spinner, Text, Button, Grid } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ContactUs from '../../contact us with time/ContactUs'
import { PanCardNav } from '../../../Components/PanCardNav/PanCardNav'
import { Footer } from '../../../Components/Footer/Footer.jsx'


export const PanCardCompleted = () => {
    //    ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
         const baseURL=process.env.REACT_APP_BASE_URL
//     ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
    const [pans, setPans] = useState([])
    const [loading, setLoading] = useState()
    const [cat, setCat] = useState('newPancard');

    
    const handelDownloadRecipt = (id) => {
        axios.get(`${baseURL}/user/recipt-download/${id}`, {
            headers: {
                "Authorization": portalData.token
            }

        }).then((res) => {
            setLoading(false)
            // window.location.reload()
            window.open(res.data);


        }).catch((err) => {
            setLoading(false)
            console.log(err);
        })

    }


    useEffect(() => {
        axios.get(`${baseURL}/user/status-completed?category=${cat}`, {
            headers: {
                "Authorization": portalData.token
            }

        }).then((res) => {
            setLoading(false)
            setPans(res.data.reverse())
        }).catch((err) => {
            setLoading(false)
            console.log(err);
        })

    }, [cat])

    console.log(pans)

    return (
        <Box>
            <PanCardNav />

            <Box w={'85%'} m={'0.5cm auto 0 auto'}>
                <Box w={'230px'}>
                    <select onChange={(e) => setCat(e.target.value)} style={{ borderRadius: '20px', padding: '7px', color: 'grey' }}>
                        <option value="newPancard">NEW PANCARD</option>
                        <option value="updatePancard">UPDATE PANCARD</option>
                    </select>
                </Box>
            </Box>

            <Box w={'100%'} minH={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                {loading ? <Box display={'flex'} justifyContent={'center'} mt={'2cm'} mb={'2cm'}><Spinner color='#00aeff' /></Box> :
                    <Box w={'90%'}>
                        {pans.length == 0 ? <Box textAlign={'center'}>NO DATA FOUND</Box> : null}

                        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={['10px', '15px']} w={'95%'} m={'0 auto 1cm auto'}>
                            {pans?.map((ele, index) => (
                                <Box key={index} border={'1.5px solid #00aeff'} borderRadius={'15px'} pt={'10px'} pb={'10px'}>
                                    <Box textAlign={'center'} fontWeight={'bold'} p={'7px'} color={'whiteAlpha.900'} bg={'#00aeff'} w={'100%'} m={'auto'} mt={'10px'} mb={'15px'}>{ele.category.toUpperCase()}</Box>
                                    <Box w={'90%'} m={'auto'}>
                                        {ele.category == 'Individual' ?
                                            <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Name:<Text fontWeight={'normal'} ml={'10px'}>{ele.firstName + " " + ele.middleName + " " + ele.lastName}</Text></Text>
                                            :
                                            <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Organization:<Text fontWeight={'normal'} ml={'10px'}>{ele.organization}</Text></Text>
                                        }                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Token : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.tokenNumber}</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Apply date : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.date}</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Status : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.panStatus}</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Acknowledgement : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.acknowledgement}</Text></Text>
                                        <Text mb={'7px'} mt={'7px'} display={'flex'} fontWeight={'bold'}>Slip Generate Date : <Text fontWeight={'normal'} color={'#616161'} ml={'4px'}>{ele.slipGenerateDate}</Text></Text>


                                    </Box>
                                    <Box>


                                        <Button color={'black'} _hover={{ color: '#00aeff' }} transition={'0.4s'} border={'1.3px solid grey'} w={'95%'} m={'auto'} mt={'20px'} mb={'10px'} display={'block'} onClick={() => handelDownloadRecipt(ele._id)}>Download Receipt</Button>
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                }
            </Box>
            <Box><Footer /></Box>
        </Box>
    )
}

