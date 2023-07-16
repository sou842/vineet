import './PanCardNav.css'
import { Button, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';


export const PanCardNav = () => {
    const toast=useToast()
    const navigate = useNavigate();
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null

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
        <div className="pancardnav_1">
            <div>
                <div>
                    <a href="/Dashboard">
                        <p>Dashboard</p>
                    </a>
                </div>
                <div>
                    <Menu >
                        <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            colorScheme="#0a9cf8"
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
                <div>
                    <a href="#">
                        <p>Receipt</p>
                    </a>
                </div>
                <div>
                    <a href="#">
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
            </div>
            <div>
                <div>
                    <a href="#">
                        <p>PCW: Rs.0</p>
                    </a>
                </div>
                <div>
                    <a href="#">
                        <p>OCW: Rs.0</p>
                    </a>
                </div>
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
    )
}