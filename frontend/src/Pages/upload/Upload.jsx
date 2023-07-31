import { Box, Button, Grid, Heading, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ContactUs from '../contact us with time/ContactUs'
import axios from 'axios'
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav'
import { useNavigate } from 'react-router-dom'
import UploadDocument from '../upload document/UploadDocument'
import { Footer } from '../../Components/Footer/Footer'

const Upload = () => {
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null;
    const navigate = useNavigate()
    const [pans, setPans] = useState([])
    const [loading, setLoading] = useState(false)


    const GetData = () => {
        axios.get("http://localhost:8080/user/all-pan-card-deatils", {
            headers: { "Authorization": portalData.token }

        }).then((res) => {
            // setLoading(false)
            setPans(res.data.reverse())
            //console.log(res.data);
        }).catch((err) => {
            // setLoading(false)
            console.log(err);
        })
    }

    useEffect(() => {
        // setLoading(true)
        GetData()
    }, [])

    console.log(pans)

    return (
        <Box>
            <Box><PanCardNav /></Box>
            <Box mt={'20px'}><ContactUs /></Box>

            <Box w={'90%'} m={'auto'} mt={'1cm'} bg={'white'} mb={'1cm'} display={'flex'} justifyContent={'space-between'}>
                {loading ? <Box h={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} ><Spinner /></Box> :
                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={['10px', '15px']} w={'95%'} m={'1cm auto'}>
                        {pans.map((el, i) => {
                            // if (!el.isUploadDocs) {
                            return (
                                <Box key={i} border={'2px solid #43ef6e'} pt={'20px'} pb={'5px'} borderRadius={'15px'}>
                                    <Box textAlign={'center'} fontWeight={'bold'} p={'7px'} bg={'#43ef6e'} w={'100%'} m={'auto'} mt={'10px'} mb={'15px'}>{el.category.toUpperCase()}</Box>
                                    <Box w={'90%'} m={'auto'}>
                                        <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Name:<Text fontWeight={'normal'} ml={'10px'}>{el.firstName + " " + el.middleName + " " + el.lastName}</Text></Text>
                                        <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Token Number:<Text fontWeight={'normal'} ml={'10px'}>{el.tokenNumber}</Text></Text>
                                        <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Apply Date:<Text fontWeight={'normal'} ml={'10px'}>{el.date}</Text></Text>
                                        <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Mobile:<Text fontWeight={'normal'} ml={'10px'}>{el.telephoneNumber || "NA"}</Text></Text>
                                    </Box>
                                    <Box m={'auto'} mt={'15px'} w={'95%'}>
                                        <Button w={'100%'} h={'40px'} mb={'10px'} size={'xs'} onClick={() => navigate(`/user/upload/PanUploadEdit/${el._id}`)}>EDIT</Button>
                                        <Button w={'100%'} h={'40px'} mb={'10px'} size={'xs'} bg={'grey'} color={'white'} onClick={() => navigate(`/user/upload-document/${el._id}`)}>UPLOAD</Button>
                                    </Box>
                                </Box>
                            )
                        })
                        }
                    </Grid>
                }
            </Box>
            <Box><Footer /></Box>
        </Box>
    )
}

export default Upload;