import './DashboardNav.css'
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuButton, MenuItem, MenuList, useMediaQuery, useToast, Wrap, Avatar, WrapItem, AvatarBadge, AvatarGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { useEffect, useState } from 'react';
import menu from '../../assets/menu.png';

export const DashboardNav = () => {
    const baseURL = process.env.REACT_APP_BASE_URL
    const isSmallerThan1000 = window.matchMedia("(max-width:1000px)").matches;
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [profileData, setProfileData] = useState(null)
    const [amount, setAmount] = useState(null)
    const [balance, setBalance] = useState(0)
    const navigate = useNavigate()
    const toast = useToast()

    const KEY_ID = "rzp_test_4PEjkS1Agy6kpO";
    const KEY_SECRET = "bUxk9FArJhGYabAGpAgyYDaS"

    const handleLogout = () => {
        localStorage.removeItem("digitalPortal")

        toast({
            title: 'Logout Succesfull.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
        })
        window.location = '/'
    }

    const showBalance = () => {

        axios.get(`${baseURL}/api`, {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                setBalance(res.data.balance);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //handelOpenRazorpay
    const handelOpenRazorpay = (data) => {
        const options = {
            key: KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: data.amount,
            currrency: data.currency,
            order_id: data.id,
            name: "Vineet Digital Portal",
            handler: (response) => {
                // console.log(response);
                axios.post(`${baseURL}/payment/verify`, { response })
                    .then((res) => {
                        axios.post(`${baseURL}/payment/user/credit-oredr-details`, { ...response, amount }, {
                            headers: { "Authorization": portalData.token }
                        }).then((res) => {
                            setAmount(null)
                            toast({ title: res.data, status: 'success', duration: 3000, isClosable: true, position: 'top' })
                        }).catch((err) => {
                            console.log(err);
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }


        }
        const rzp = new window.Razorpay(options);
        rzp.open()
    }



    //handelPay
    const handelPay = () => {
        axios.post('http://localhost:8080/payment/order', { amount: amount })
            .then((res) => {
                console.log(res.data);
                onClose()
                handelOpenRazorpay(res.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        showBalance();
        if (portalData.avatar == '') {
            axios.get(`${baseURL}/profile/profile-pictire`, {
                headers: { "Authorization": portalData.token }
            })
                .then((res) => {
                    let obj = {
                        token: portalData.token,
                        auth: portalData.auth,
                        username: portalData.username,
                        avatar: res.data.avatar
                    }
                    localStorage.setItem("digitalPortal", JSON.stringify(obj))
                })
                .catch((err) => {
                    console.log(err);
                })
        }



        axios.get(`${baseURL}/api/profile-detail`, {
            headers: {
                "Authorization": portalData.token
            }
        })
            .then((res) => {

                setProfileData(res.data)
            })
            .catch((err) => {

                console.log(err);
            })

    }, [amount])


    // console.log(portalData)

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
                    <a href="/profile">
                        <Wrap>
                            <WrapItem>
                                <Avatar color={'black'} bg='#00aeff' size={['md', 'md', 'lg']} name={portalData&&portalData.username.match(/\b\w/g).join('').toUpperCase()} src={portalData.avatar&&portalData.avatar} />
                            </WrapItem>
                        </Wrap>
                    </a>
                </div>
            </div>

            <div className='dashboard_0'>
                {isSmallerThan1000 ?
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="#0a9cf8" margin={0}>
                                <img width={'22px'} src={menu} alt="" />
                            </MenuButton>
                            <MenuList color={"black"}>
                                <MenuItem onClick={() => navigate('/Dashboard')}>Dashboard</MenuItem>
                                <MenuItem onClick={() => navigate('#')}>Traning Manual</MenuItem>
                                <MenuItem onClick={() => navigate('#')}>Downloads</MenuItem>
                                <MenuItem onClick={() => navigate('/profile')}>Ledger</MenuItem>
                                <MenuItem onClick={() => navigate('/profile')}>Add Money</MenuItem>
                                <Menu placement="right-start">
                                    <MenuButton colorScheme='white' color={'black'} fontSize={['15.5px', '15px', '15px']} as={Button} rightIcon={<ChevronDownIcon />} bg={'white'} margin={0}>Services</MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => navigate('/PanCard')}>Pan Card</MenuItem>
                                        <MenuItem onClick={() => navigate('/ChangePassword')}>Electricity</MenuItem>
                                        <MenuItem onClick={() => navigate('/MobileRecharge')}>Mobile Recharge</MenuItem>
                                        <MenuItem onClick={() => navigate('/DTHRecharge')}>DTH Recharge</MenuItem>
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
                                    fontWeight={'normal'}
                                    padding={0}
                                    fontSize={['10px', '15px', '15px']}
                                >
                                    Services
                                </MenuButton>
                                <MenuList color={"black"} >
                                    <MenuItem onClick={() => navigate('/PanCard')}>Pan Card</MenuItem>
                                    <MenuItem onClick={() => navigate('/ChangePassword')}>Electricity</MenuItem>
                                    <MenuItem onClick={() => navigate('/MobileRecharge')}>Mobile Recharge</MenuItem>
                                    <MenuItem onClick={() => navigate('/DTHRecharge')}>DTH Recharge</MenuItem>
                                    <MenuItem onClick={() => navigate('/profile')}>ITR</MenuItem>
                                    <MenuItem onClick={() => navigate('/profile')}>GST</MenuItem>
                                    <MenuItem onClick={() => navigate('/profile')}>Online Job Portal</MenuItem>

                                </MenuList>
                            </Menu>
                        </div>
                        <div><a href="#"><p>Traning Manual</p></a></div>
                        <div><a href="#"><p>Downloads</p></a></div>
                        <div><a href="#"><p>Ledger</p></a></div>
                        <div><Button border={'1.4px solid #00aeff'} _hover={{ bg: '#00aeff', color: 'black' }} onClick={onOpen} ml={'5px'} size={'sm'} colorScheme='blue.100'>Add money</Button></div>
                    </div>}
                <div>
                    <div><a href="/PayDetails"><p>Balance: ₹ {balance} </p></a>
                    </div>
                    <div>
                        <Menu >
                            <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                colorScheme="#0a9cf8"
                                fontSize={['10px', '15px', '15px']}
                            >
                                {portalData && portalData.username.trim().split(' ')[0].toUpperCase()}
                            </MenuButton>
                            <MenuList color={"black"} >
                                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                                <MenuItem onClick={() => navigate('/user/change-password')}>Change Password</MenuItem>
                                <MenuItem onClick={() => navigate('/admin/login')}>Admin Login</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </div>
            {/* add money modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ADD Money to Wallet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Enter Money</FormLabel>
                            <Input placeholder='Enter Your Money' type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter bg={'white'}>
                        <Button p={'15px'} size={'sm'} mr={3} onClick={onClose}>Close</Button>
                        <Button p={'15px'} bg={'#43ef6e'} size={'sm'} onClick={handelPay}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


        </div>
    )
}