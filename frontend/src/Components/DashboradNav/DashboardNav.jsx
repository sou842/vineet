import { useNavigate } from 'react-router-dom';
import './DashboardNav.css'
import { Button, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";



export const DashboardNav = () => {
    const navigate = useNavigate()
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
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
                    LOGO
                </div>
            </div>

            <div className='dashboard_0'>
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
                </div>
                <div>
                    <div><a href="#"><p>PCW: Rs.0</p></a></div>
                    <div><a href="#"><p>OCW: Rs.0</p></a></div>
                    <div>
                        <Menu >
                            <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                colorScheme="#0a9cf8"
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