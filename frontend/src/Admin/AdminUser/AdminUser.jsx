import { Box, Wrap, WrapItem, Avatar, Text } from "@chakra-ui/react";
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";



export const AdminUser = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()


    return (
        <div>
            <p style={{ color: 'red' }}>Adminuser</p>

            {/* <Box w={'95%'} m={'auto'}>
                {users && users.map((ele, index) => (
                    <Box onClick={() => navigate(`/AminPerson/${ele.vendorID}`)} cursor={'pointer'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} bg={'#43ef6e'} p={'10px'} m={'10px'} borderRadius={'10px'} key={index}>
                        <Box display={'flex'} alignItems={'center'}>
                            <Wrap><WrapItem><Avatar color={'black'} bg='white' size={['sm', 'md', 'md']} name={ele.name.match(/\b\w/g).join('').toUpperCase()} /></WrapItem></Wrap>
                            <Text fontSize={['12px', '13px', '15px']} ml={'15px'}>{ele.name.toUpperCase()}</Text>
                        </Box>
                        <Box>{ele.vendorID}</Box>
                    </Box>
                ))}
            </Box> */}
        </div>
    )
}