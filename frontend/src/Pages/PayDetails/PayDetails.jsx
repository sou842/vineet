import { Box, Wrap, WrapItem, Avatar, Text, Grid, Input, Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, flexbox, Heading } from "@chakra-ui/react";
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav.jsx'
import { useEffect, useState } from "react";
import axios from "axios";


export const PayDetails = () => {
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
    let isSmallerThan450 = window.matchMedia("(max-width:450px)").matches;
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [pay, setPay] = useState([]);

    useEffect(() => {

        axios.get(`${baseURL}/payment/user/all-transaction`, {
            headers: { "Authorization": portalData.token }

        }).then((res) => {
            setPay(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err);
        })

    }, [])


    return (
        <Box>
            <DashboardNav />
            <Heading textAlign={'center'} fontWeight={'normal'} mt={'0.5cm'}>All Transaction</Heading>
            <Box w={['97%', '85%', '80%']} m={'0.5cm auto 1cm auto'}>
                <TableContainer>
                    <Table variant='striped' colorScheme='blue'>
                        <Thead>
                            <Tr>
                                {!isSmallerThan450&&<Th textAlign={'center'} w={'2%'}>No.</Th>}
                                <Th textAlign={'center'}>Date</Th>
                                <Th textAlign={'center'}>Reason</Th>
                                <Th textAlign={'center'}>Value</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {pay.length != 0 && pay?.map((ele, index) => (
                                <Tr key={index}>
                                    {!isSmallerThan450&&<Td textAlign={'center'}>{index + 1}</Td>}
                                    <Td textAlign={'center'} fontSize={['14px','15px','16px']}>
                                        <Text fontSize={['13px','15px','16px']}>{ele.dateAndTime.split(' ')[0]}</Text>
                                        <Text fontSize={['13px','15px','16px']} color={'grey'}>{ele.dateAndTime.split(' ')[1]}</Text>
                                    </Td>
                                    <Td textAlign={'center'} fontSize={['13px','15px','16px']}>{ele.reason||"Not Found"}</Td>
                                    {ele.credit ?
                                        <Td fontSize={['13px','15px','16px']} textAlign={'center'} color={'green'} fontWeight={'bold'}>+{ele.credit && ele.credit}</Td>
                                        :
                                        <Td fontSize={['13px','15px','16px']} textAlign={'center'} color={'red'} fontWeight={'bold'}>-{ele.debit && ele.debit}</Td>
                                    }
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}