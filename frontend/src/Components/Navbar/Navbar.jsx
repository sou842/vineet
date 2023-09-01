import './Navbar.css'
import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, Wrap, WrapItem, useMediaQuery, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from "@chakra-ui/icons";
import user from '../../assets/user.png'

export const Navbar = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
    const [isSmallerThan700] = useMediaQuery("(max-width: 700px)");
    const navigate = useNavigate();


    return (
        <nav>
            <div>
                <div className='navbar_1'>
                    <div>
                        <a href="/">
                            <img src="https://digitalindiaportal.co.in/images/logo.png" alt="logo_1" />
                        </a>
                    </div>
                    <div>
                    <span>SMART </span>
                   <span>DIGITAL </span>
                   <span>SERVICE </span>
                 
                    </div>
                    <div>
                        <Wrap>
                            <WrapItem>
                                <Avatar color={'black'} bg='#00aeff' size={['md', 'md', 'lg']} name={portalData&&portalData.username.match(/\b\w/g).join('').toUpperCase()} src={portalData&&portalData.avatar} />
                            </WrapItem>
                        </Wrap>
                    </div>
                </div>
                {isSmallerThan700 ?
                    <div className='navbar_2'>
                        <div>
                            {portalData ? <div><a href="/Dashboard"><p>DASHBOARD</p></a></div> : <div><a href="/signin"><p>LOGIN</p></a></div>}
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="#0a9cf8" margin={0} fontSize={['10px', '15px', '15px']}>
                                    Menu
                                </MenuButton>
                                <MenuList color={"grey"}>
                                    <MenuItem onClick={() => navigate('/Dashboard')}>Dashboard</MenuItem>
                                    <MenuItem onClick={() => navigate('/About')}>ABOUT</MenuItem>
                                    <MenuItem onClick={() => navigate('/Services')}>SERVICES</MenuItem>
                                    <MenuItem onClick={() => navigate('/Privacy')}>PRIVACY POLICY</MenuItem>
                                    <MenuItem onClick={() => navigate('/Contact')}>CONTACT US</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                    :
                    <div className='navbar_2'>
                        <div>
                            <div><a href="/"><p>HOME</p></a></div>
                            <div><a href="/About"><p>ABOUT</p></a></div>
                            <div><a href="/Services"><p>SERVICES</p></a></div>
                            <div><a href="/Privacy"><p>PRIVACY POLICY</p></a></div>
                            <div><a href="/Contact"><p>CONTACT US</p></a></div>
                            {
                                portalData ? <div><a href="/Dashboard"><p>DASHBOARD</p></a></div> : <div><a href="/signin"><p>LOGIN</p></a></div>
                            }
                        </div>
                    </div>
                }
            </div>

        </nav>
    )
}