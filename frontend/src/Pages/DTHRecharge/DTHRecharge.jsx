import { Box, Button, Heading, Text, useToast } from '@chakra-ui/react'
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav'
import { states, DTH } from '../../FromElement.js'
import { useState } from 'react'
import './DTHRecharge'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import date from 'date-and-time';


export const DTHRecharge = () => {
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
    const baseURL = process.env.REACT_APP_BASE_URL
    let currentDate = date.format(new Date(), 'YYYY-MMM-DD');
    let currentTime = date.format(new Date(), 'hh:mm:ss A');
    const [formData, setFormData] = useState({ operator: '', state: '', phone: '', amount: '', date: currentDate, time: currentTime, status: false })
    const toast = useToast()
    const navigate = useNavigate()


    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name == 'phone' && formData.phone.length < 10) {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
        else if (name != 'phone') {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleRecharge = (event) => {
        event.preventDefault();

        axios.post(`${baseURL}/DTHRecharge/new_Recharge`, formData, {
            headers: { "Authorization": portalData.token }
        })
            .then((data) => {
                toast({ title: data.data.msg, status: 'success', duration: 4000, isClosable: true, position: 'top' })
                navigate('/DTHRechargeTransaction')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    console.log(formData)

    return (
        <Box>
            <DashboardNav vall={'DTHRecharge'} />
            <Box>
                <Heading textAlign={'center'} mt={'20px'}>DTH Recharge</Heading>
                <Box w={['95%', '80%', '60%']} m={'15px auto 1cm auto'}>
                    <form onSubmit={handleRecharge}>
                        <Box mt={'7px'}>
                            <Text color={'grey'} m={'7px 10px'}>DTH Company</Text>
                            <select name='operator' value={formData.operator} onChange={handleChange} required style={{ border: '1px solid grey', width: '100%', padding: '10px', marginBottom: '0' }}>
                                <option value="" disabled>select</option>
                                {DTH && DTH?.map((ele, index) => (
                                    <option key={index} value={ele}>{ele}</option>
                                ))}
                            </select>
                        </Box>
                        <Box mt={'7px'}>
                            <Text color={'grey'} m={'7px 10px'}>Select Location</Text>
                            <select name='state' value={formData.state} onChange={handleChange} required style={{ border: '1px solid grey', width: '100%', padding: '10px', marginBottom: '0' }}>
                                <option value="" disabled>select</option>
                                {states && states?.map((ele, index) => (
                                    <option key={index} value={ele}>{ele}</option>
                                ))}
                            </select>
                        </Box>
                        <Box mt={'7px'}>
                            <Text color={'grey'} m={'7px 10px'}>Phone Number</Text>
                            <input type='number' name='phone' value={formData.phone} onChange={handleChange} maxLength="10" required placeholder='Phone Number' style={{ border: '1px solid grey', width: '100%', padding: '10px' }} />
                        </Box>
                        <Box mt={'7px'}>
                            <Text color={'grey'} m={'7px 10px'}>Amount</Text>
                            <input type='number' name='amount' value={formData.amount} onChange={handleChange} required placeholder='Pay Amount' style={{ border: '1px solid grey', width: '100%', padding: '10px' }} />
                        </Box>
                        <Button bg={'blue.400'} color={'whiteAlpha.900'} display={'flex'} h={'45px'} m={'auto'} mt={'15px'} w={'60%'} type={'submit'}>PAY</Button>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}