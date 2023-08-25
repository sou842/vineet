import { Box, Wrap, WrapItem, Avatar, Text, Grid, Input, Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, flexbox, Heading } from "@chakra-ui/react";
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav.jsx'
import { useEffect, useState } from "react";
import axios from "axios";


export const PayDetails = () => {
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
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
            <Box w={['96%', '85%', '80%']} m={'0.5cm auto 1cm auto'}>
                <TableContainer>
                    <Table variant='striped' colorScheme='blue'>
                        <Thead>
                            <Tr>
                                <Th textAlign={'center'} w={'4%'}>No.</Th>
                                <Th textAlign={'center'}>Date</Th>
                                <Th textAlign={'center'}>Time</Th>
                                <Th textAlign={'center'}>Value</Th>
                                <Th textAlign={'center'}>Reason</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {pay.length != 0 && pay?.map((ele, index) => (
                                <Tr key={index}>
                                    <Td textAlign={'center'}>{index + 1}</Td>
                                    <Td textAlign={'center'} fontSize={['14px','15px','16px']}>{ele.dateAndTime.split(' ')[0]}</Td>
                                    <Td textAlign={'center'} fontSize={['14px','15px','16px']}>{ele.dateAndTime.split(' ')[1]}</Td>
                                    {ele.credit ?
                                        <Td textAlign={'center'} color={'green'} fontWeight={'bold'}>+{ele.credit && ele.credit}</Td>
                                        :
                                        <Td textAlign={'center'} color={'red'} fontWeight={'bold'}>-{ele.debit && ele.debit}</Td>
                                    }
                                    <Td textAlign={'center'} fontSize={['14px','15px','16px']}>{ele.reason||"Not Found"}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}