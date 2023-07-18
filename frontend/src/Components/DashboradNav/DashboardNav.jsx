import './DashboardNav.css'
import user from '../../assets/user.png';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuButton, MenuItem, MenuList, MenuGroup, useToast, useMediaQuery } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";


export const DashboardNav = () => {
    const [isSmallerThan1000] = useMediaQuery("(max-width: 1000px)");
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
    const navigate = useNavigate()
    const toast = useToast()


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

    return (
        <div>
            <div className='dashboardNav_100'>
                <div>
                    <a href="/">
                        <img src="https://digitalindiaportal.co.in/images/logo.png" alt="logo_1" />
                    </a>
                </div>
                <div>
                    VINEET DIGITAL PORTAL
                </div>
                <div>
                    <a href="/">
                        <img src={user} alt="user" />
                    </a>
                </div>
            </div>

            <div className='dashboard_0'>
                {isSmallerThan1000 ?
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="#0a9cf8" margin={0} fontSize={['10px', '15px', '15px']}> 
                                Menu
                            </MenuButton>
                            <MenuList color={"black"}>
                                <MenuItem onClick={() => navigate('/Dashboard')}>Dashboard</MenuItem>
                                <MenuItem onClick={() => navigate('#')}>Traning Manual</MenuItem>
                                <MenuItem onClick={() => navigate('#')}>Downloads</MenuItem>
                                <MenuItem onClick={() => navigate('/profile')}>Ledger</MenuItem>
                                <MenuItem onClick={() => navigate('/profile')}>Add Money</MenuItem>
                                <Menu placement="right-start">
                                    <MenuButton colorScheme='white' color={'black'} fontSize={['10px', '15px', '15px']} as={Button} rightIcon={<ChevronDownIcon />} bg={'white'} margin={0}>Services</MenuButton>
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
                        <div><a href="/Dashboard"><p>Dashboard</p></a></div>
                        <div>
                            <Menu >
                                <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                    colorScheme="#0a9cf8"
                                    margin={0}
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
                        <div><a href="#"><p>Traning Manual</p></a></div>
                        <div><a href="#"><p>Downloads</p></a></div>
                        <div><a href="#"><p>Ledger</p></a></div>
                        <div><a href="#"><p>Add Money</p></a></div>
                    </div>}
                <div>
                    <div><a href="#"><p>PCW: 1000 ₹</p></a></div>
                    <div><a href="#"><p>OCW: 10000 ₹</p></a></div>
                    <div>
                        <Menu >
                            <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                colorScheme="#0a9cf8"
                                fontSize={['10px', '15px', '15px']}
                            >
                                {portalData.username.toUpperCase()}
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