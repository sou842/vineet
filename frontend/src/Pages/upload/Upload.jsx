import { Box, Button, Grid, Heading, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav'
import { useNavigate } from 'react-router-dom'
import UploadDocument from '../upload document/UploadDocument'
import { Footer } from '../../Components/Footer/Footer'

const Upload = () => {
    const baseURL = process.env.REACT_APP_BASE_URL
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null;
    const [cat, setCat] = useState('newPancard');
    const navigate = useNavigate()
    const [pans, setPans] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)


    useEffect(() => {
        setLoading(true)
        axios.get(`${baseURL}/user/all-pan-card-deatils?category=${cat}&page=${page}`, {
            headers: { "Authorization": portalData.token }

        }).then((res) => {
            setLoading(false)
            setPans(res.data.data)
            setCount(res.data.count)
            console.log(res.data);
        }).catch((err) => {
            setLoading(false)
            console.log(err);
        })
    }, [cat,page])


    return (
        <Box>
            <Box><PanCardNav /></Box>
            <Box w={'85%'} m={'0.5cm auto 0 auto'}>
                <Box w={'230px'}>
                    <select onChange={(e) => {setCat(e.target.value);setPage(1)}} style={{ borderRadius: '20px', padding: '7px', color: 'grey' }}>
                        <option value="newPancard">NEW PANCARD</option>
                        <option value="updatePancard">UPDATE PANCARD</option>
                    </select>
                </Box>
            </Box>

            <Box w={'100%'} minH={'60vh'} m={'auto'} bg={'white'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

                {loading ? <Box display={'flex'} justifyContent={'center'} alignItems={'center'} ><Spinner color='#00aeff' /></Box> :
                    <Box w={'90%'}>
                        {pans.length == 0 ? <Box textAlign={'center'}>NO DATA FOUND</Box> : null}

                        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={['10px', '15px']} w={'95%'} m={'0 auto 1cm auto'}>
                            {pans.length!=0&&pans.map((el, i) => {
                                return (
                                    <Box key={i} border={'2px solid #00aeff'} pt={'10px'} pb={'5px'} borderRadius={'15px'}>
                                        <Box textAlign={'center'} fontWeight={'bold'} p={'7px'} color={'whiteAlpha.900'} bg={'#00aeff'} w={'100%'} m={'auto'} mt={'10px'} mb={'15px'}>{el.category.toUpperCase()}</Box>
                                        <Box w={'90%'} m={'auto'}>
                                            {el.category == 'Individual' ?
                                                <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Name:<Text fontWeight={'normal'} ml={'10px'}>{el.firstName + " " + el.middleName + " " + el.lastName}</Text></Text>
                                                :
                                                <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Organization:<Text fontWeight={'normal'} ml={'10px'}>{el.organization}</Text></Text>
                                            }
                                            <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Token Number:<Text fontWeight={'normal'} ml={'10px'}>{el.tokenNumber}</Text></Text>
                                            <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Apply Date:<Text fontWeight={'normal'} ml={'10px'}>{el.date}</Text></Text>
                                            <Text mt={'7px'} mb={'7px'} display={'flex'} fontWeight={'bold'}>Mobile:<Text fontWeight={'normal'} ml={'10px'}>{el.telephoneNumber || "NA"}</Text></Text>
                                        </Box>
                                        <Box m={'auto'} mt={'15px'} w={'95%'}>
                                            {cat == 'newPancard' && <Button w={'100%'} h={'40px'} mb={'10px'} size={'xs'} onClick={() => navigate(`/user/upload/PanUploadEdit/${el._id}`)}>EDIT</Button>}
                                            {cat == 'updatePancard' && <Button w={'100%'} h={'40px'} mb={'10px'} size={'xs'} onClick={() => navigate(`/user/upload/PanUpdateUploadEdit/${el._id}`)}>EDIT</Button>}

                                            <Button w={'100%'} h={'40px'} mb={'10px'} size={'xs'} bg={'grey'} color={'white'} onClick={() => navigate(`/user/upload-document/${el._id}`)}>UPLOAD</Button>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Grid>
                    </Box>
                }
            
            </Box>
            <Box textAlign={'right'} m={'10px'}>
                        {count != 0 ?
                            <Box><Button size={'sm'} onClick={(e) => setPage(page - 1)} isDisabled={page == 1} mr={'5px'} colorScheme={'blue'}>⟨</Button>
                                <Button size={'sm'} mr={'5px'}>{page}</Button>
                                <Button size={'sm'} colorScheme='blue' onClick={(e) => setPage(page + 1)} isDisabled={page == (Math.ceil(count / 10)) || count == 0}>⟩</Button>
                            </Box> : null
                        }
                    </Box>
            <Box><Footer /></Box>
        </Box>
    )
}

export default Upload;