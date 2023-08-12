import { Avatar, Box, Button, Grid, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, Wrap, WrapItem, useMediaQuery, useToast, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react';
import { AdminSlider } from '../AdminSlider/AdminSlider';
import './AdminDash.css';
import { Link, useNavigate } from "react-router-dom"
import { AdminNavbar } from '../AdminNavbar/AdminNavbar';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell } from "recharts";
import { AuthorContext } from '../../Components/AllContext/AllContext';

const data = [{ name: "PAN CARD", value: 400 }, { name: "Electricity", value: 300 }, { name: "Mobile Recharge", value: 300 }, { name: "DTH Recharge", value: 200 }, { name: "Income Tax Return", value: 200 }, { name: "GST", value: 180 }, { name: "Digital Job Portal", value: 20 }, { name: "Social Services", value: 200 }, { name: "National Pension System", value: 200 }];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", '#FF3D00', '#651FFF', '#76FF03', '#9C27B0', '#4DD0E1'];
// const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    // const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">{`${(percent * 100).toFixed(0)}%`}</text>
    )
}

export const AdminDash = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
    const [userData, setUserData] = useState([])
    const { side, setSide } = useContext(AuthorContext)
    const navigate = useNavigate();
    const [isSmallerThan1000] = useMediaQuery("(max-width: 1000px)");
    const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");


    useEffect(() => {
        axios.get(`http://localhost:8080/admin/top3-letest-user`, {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                setUserData(res.data);
                // console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <div style={{ position: 'fixed', zIndex: '100', width: '100%', backgroundColor: 'white' }}> <AdminNavbar value={'admindash'} /></div>
            <div className='AdminDash_0'>
                {!isSmallerThan1000 ?
                    <div style={{ width: side ? '24%' : '0px', backgroundColor: '#061621eb', paddingTop: '1.4cm' }}>{side ? <div><AdminSlider slidevalue={'AdminDash'} /></div> : null}</div>
                    :
                    <div>{side ? <div style={{ width: !isSmallerThan600 ? '37%' : '65%', position: 'fixed', zIndex: '10', top: '0', backgroundColor: '#061621eb', paddingTop: '1.4cm', height: '100vh' }}>{side ? <div><AdminSlider slidevalue={'AdminDash'} /></div> : null}</div> : null}
                    </div>
                }

                <div style={{ width: side && !isSmallerThan1000 ? '75%' : '96%', margin: '1.5cm auto' }}>
                    <Box display={'flex'} flexDirection={['column', 'column', 'row']} gap={'10px'} justifyContent={'space-between'} mt={'15px'} mb={'15px'}>
                        <Box w={['100%', '100%', '70%']} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} display={'flex'} justifyContent={'center'}>
                            <Box>
                                <PieChart width={310} height={310}>
                                    <Pie data={data} labelLine={false} label={renderCustomizedLabel} outerRadius={110} fill="#8884d8" dataKey="value">
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </Box>
                        </Box>
                        <Box w={['100%', '100%', '28%']} display={'flex'}>
                            <Box w={'99%'} p={'7px'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} display={'flex'} alignItems={'center'}>
                                <Box ml={['0.3cm', '0.5cm', '0.3cm']}>
                                    {data && data?.map((ele, index) => (
                                        <Box key={index} mt={'5px'} mb={'5px'} display={'flex'} fontSize={'14px'} alignItems={'center'} color={'grey'}><Box w={'20px'} h={'14px'} borderRadius={'2px'} mr={'5px'} bg={COLORS[index]}></Box>{ele.name}</Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box mt={'20px'} >
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={'5px'} pl={'15px'} pr={'15px'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
                            <Text color={'grey'} fontWeight={'bold'}>ALL USER</Text>
                            <Button onClick={() => navigate(`/AdminUser`)} w={'100px'} bg={'blue.400'} color={'whiteAlpha.900'}>Show</Button>
                        </Box>
                        <Box w={'98%'} m={'auto'} mt={'15px'} mb={'15px'}>
                            <TableContainer>
                                <Table variant='striped' colorScheme='blue'>
                                    <Thead>
                                        <Tr>
                                            <Th>No.</Th>
                                            <Th>Name</Th>
                                            <Th>Email</Th>
                                            <Th>Join Date</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {userData && userData?.map((ele, index) => (
                                            <Tr key={index} fontSize={['12px', '13px', '14px']} cursor={'pointer'} onClick={() => navigate(`/AdminUser/AminPerson/${ele.vendorID}`)}>
                                                <Td w={'6%'}>{index + 1}</Td>
                                                <Td>{ele.name}</Td>
                                                <Td>{ele.email}</Td>
                                                <Td>{ele.joindate}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    )
}
