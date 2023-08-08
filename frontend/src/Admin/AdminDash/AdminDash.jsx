import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, Wrap, WrapItem, useMediaQuery, useToast } from '@chakra-ui/react';
import { AdminSlider } from '../AdminSlider/AdminSlider';
import './AdminDash.css';
import { Link, useNavigate } from "react-router-dom"


export const AdminDash = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
    const navigate = useNavigate();

    return (
        <div>
            <div className='AdminDash_0'>
                <div style={{ width: '24%', height: '100%' }}>
                    <AdminSlider slidevalue={'AdminDash'} />
                </div>

                <div style={{ width: '75%' }}>
                    <Box display={'flex'} flexDirection={'row-reverse'} p={'10px'} mt={'15px'} gap={'10px'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
                            <Wrap>
                                <WrapItem>
                                    <Avatar color={'black'} bg='#00aeff' size={['sm']} name={portalData && portalData.username.match(/\b\w/g).join('').toUpperCase()} src={portalData && portalData.avatar} />
                                </WrapItem>
                            </Wrap>
                            <img width={'30px'} height={'30px'} src="https://cdn-icons-png.flaticon.com/128/646/646094.png" alt="" />
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} mt={'15px'} mb={'15px'}>
                        <Box h={'50vh'} w={'70%'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}></Box>
                        <Box h={'50vh'} w={'27%'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}></Box>
                    </Box>
                    
                    <Box minH={'20vh'} mt={'20px'} >
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={'5px'} pl={'15px'} pr={'15px'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
                            <Text color={'grey'} fontWeight={'bold'}>ALL USER</Text>
                            <Button onClick={()=> navigate(`/AdminUser`)} w={'10%'} bg={'blue.400'} color={'whiteAlpha.900'}>Show</Button>
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    )
}
