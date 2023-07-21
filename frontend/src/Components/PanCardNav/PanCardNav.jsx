import './PanCardNav.css'
import { Button, Menu, MenuButton, MenuItem, MenuList, useMediaQuery, useToast, Wrap, Avatar, WrapItem, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const PanCardNav = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const [isSmallerThan1150] = useMediaQuery("(max-width: 1150px)")
    const [profile,setProfile] = useState(null)
    const toast = useToast()
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("digitalPortal")

        toast({
            title: 'Logout Succesfull.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        window.location = '/'
    }

    const profileAvater = () =>{
        axios.get('http://localhost:8080/api/profile-detail',{
            headers: { "Authorization": portalData.token }
        })
        .then((res)=>{
            // console.log(res.data)
            setProfile(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    

    // console.log(profile[0].avtar)
    useEffect(()=>{
        profileAvater();
    },[])

    return (
        <div>
            <div className='pancardnav_0'>
                <div>
                    <a href="/">
                        <img src="https://digitalindiaportal.co.in/images/logo.png" alt="logo_1" />
                    </a>
                </div>
                <div>
                    VINEET DIGITAL PORTAL
                </div>
                <div>
                    <a href="/profile">
                        <Wrap>
                            <WrapItem>
                                <Avatar color={'white'} bg='blue.200' size={['md','md','lg']} name={profile&&profile[0].name} src={profile&&profile[0].avtar} />
                            </WrapItem>
                        </Wrap>
                    </a>
                </div>
            </div>
            <div className="pancardnav_1">
                {isSmallerThan1150 ?
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="#0a9cf8" margin={0} fontSize={['10px', '15px', '15px']}>
                                Menu
                            </MenuButton>
                            <MenuList color={"black"}>
                                <MenuItem onClick={() => navigate('/Dashboard')}>Dashboard</MenuItem>
                                <MenuItem onClick={() => navigate('/user/pan-receipt')}>Receipt</MenuItem>
                                <MenuItem onClick={() => navigate('/user/upload')}>Upload</MenuItem>
                                <MenuItem onClick={() => navigate('#')}>Reject Pan by NSDL</MenuItem>
                                <MenuItem onClick={() => navigate('#')}>Complite</MenuItem>
                                <MenuItem onClick={() => navigate('#')}>Check Pan Status</MenuItem>
                                <Menu placement="right-start">
                                    <MenuButton colorScheme='white' color={'black'} as={Button} rightIcon={<ChevronDownIcon />} bg={'white'} margin={0}>Services</MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => navigate('/PanCard')}>Pan Card</MenuItem>
                                        <MenuItem onClick={() => navigate('/ChangePassword')}>Electricity</MenuItem>
                                        <MenuItem onClick={() => navigate('/profile')}>Mobile Recharge</MenuItem>
                                        <MenuItem onClick={() => navigate('/profile')}>DTH Recharge</MenuItem>
                                        <MenuItem onClick={() => navigate('/profile')}>Online Job Portal</MenuItem>
                                    </MenuList>
                                </Menu>
                            </MenuList>
                        </Menu>
                    </div>
                    :
                    <div>
                        <div>
                            <a href="/Dashboard">
                                <p>Dashboard</p>
                            </a>
                        </div>

                        <div>
                            <a href="/user/pan-receipt">
                                <p>Receipt</p>
                            </a>
                        </div>
                        <div>
                            <a href="/user/upload">
                                <p>Upload</p>
                            </a>
                        </div>
                        <div>
                            <a href="#">
                                <p>Reject Pan by NSDL</p>
                            </a>
                        </div>
                        <div>
                            <a href="#">
                                <p>Complite</p>
                            </a>
                        </div>
                        <div>
                            <a href="#">
                                <p>Check Pan Status</p>
                            </a>
                        </div>
                        <div>
                            <Menu >
                                <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                    colorScheme="#0a9cf8"
                                    fontSize={'15px'}
                                >
                                    Services
                                </MenuButton>
                                <MenuList color={"black"} >
                                    <MenuItem onClick={() => navigate('/PanCard')}>Pan Card</MenuItem>
                                    <MenuItem onClick={() => navigate('/ChangePassword')}>Electricity</MenuItem>
                                    <MenuItem onClick={() => navigate('/profile')}>Mobile Recharge</MenuItem>
                                    <MenuItem onClick={() => navigate('/profile')}>DTH Recharge</MenuItem>
                                    <MenuItem onClick={() => navigate('/profile')}>ITR</MenuItem>
                                    <MenuItem onClick={() => navigate('/profile')}>GST</MenuItem>
                                    <MenuItem onClick={() => navigate('/profile')}>Online Job Portal</MenuItem>

                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                }
                <div>
                    <div>
                        <a href="#"><p>PCW:0 ₹</p></a>
                    </div>
                    {/* <div>
                        <a href="#"><p>OCW:0 ₹</p></a>
                    </div> */}
                    <div>
                        <Menu >
                            <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                colorScheme="#0a9cf8"
                                fontSize={['10px', '15px', '15px']}
                            >
                                {portalData&&portalData.username.trim().split(' ')[0].toUpperCase()}
                            </MenuButton>
                            <MenuList color={"black"} >
                                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                                <MenuItem onClick={() => navigate('/user/change-password')}>Change Password</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}