import { Box, Wrap, WrapItem, Avatar, Text, Grid, Input, Button, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, flexbox, Select, Spinner } from "@chakra-ui/react";
import axios from "axios"
import { useEffect, useState, useCallback, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminNavbar } from "../AdminNavbar/AdminNavbar";

export const AdminUser = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
    const [userData, setUserData] = useState([])
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [type, setType] = useState("")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const baseURL = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handelSearch = () => {
        setLoading(true)
        axios.get(`${baseURL}/admin/user?${type}=${search}`, {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                setLoading(false)
                setSearch("")
                setUserData(res.data)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err);
            })

    }

    useMemo(() => {
        if (type != "") {

            setSearchParams({ type })
        }
        else {
            setSearchParams()
        }
    }, [type])

    useEffect(() => {
        setSearchParams()
        setLoading(true)
        axios.get(`${baseURL}/admin/all-login-user?page=${page}`, {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                setLoading(false)
                setUserData(res.data.user)
                setCount(res.data.count)
                // console.log(res.data)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err);
            })


    }, [page])

    return (
        <div>
            <div><AdminNavbar /></div>

            <Box w={['95%', '90%', '90%']} m={'auto'} pt={'10px'} pb={'1cm'}>


                <Box mt={'10px'} mb={'15px'} display={'flex'} flexDirection={'row-reverse'}>

                    <Box w={['90%', '60%', '40%']} display={'flex'} alignItems={'center'} border={'1px solid red'}>
                        <Select onChange={(e) => { setType(e.target.value) }}>
                            <option value={""}>Select Option</option>
                            <option value={'aadharNumber'}>By Aadhaar</option>
                            <option value={'email'}>By Email</option>
                            <option value={'vendorID'}>By VendorID</option>
                            <option value={'name'}>By User Name</option>
                        </Select>
                        <input style={{ width: '100%', border: '1.2px solid grey', borderRadius: '10px', padding: '10px' }} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search.." value={search} />
                        <Button color={'whiteAlpha.900'} bg={'blue.400'} onClick={handelSearch}>Search</Button>
                    </Box>
                </Box>


                <Box w={'100%'} minH={'60vh'} m={'auto'}>
                    <TableContainer>
                        <Table variant='striped' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th w={'4%'}>No.</Th>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Aadhar</Th>
                                    <Th>Vendor ID</Th>
                                    <Th>Joindate</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {loading ? <Spinner /> : userData && userData?.map((ele, index) => (
                                    <Tr key={index} fontSize={['12px', '13px', '14px']} onClick={() => navigate(`/AdminUser/AminPerson/${ele.vendorID}`)} cursor={'pointer'}>
                                        <Td w={'4%'}>{index + 1}</Td>
                                        <Td>{ele.name}</Td>
                                        <Td>{ele.email}</Td>
                                        <Td>{ele.aadharNumber}</Td>
                                        <Td>{ele.vendorID}</Td>
                                        <Td>{ele.joindate}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box mt={'15px'} textAlign={'right'}>
                    {count != 0 ? <Box><Button size={'sm'} onClick={(e) => setPage(page - 1)} isDisabled={page == 1} mr={'5px'} colorScheme={'blue'}>⟨</Button>
                        <Button size={'sm'} mr={'5px'}>{page}</Button>
                        <Button size={'sm'} colorScheme='blue' onClick={(e) => setPage(page + 1)} isDisabled={page == (Math.ceil(count / 10)) || count == 0}>⟩</Button></Box> : null
                    }
                </Box>
            </Box>
        </div>
    )
}