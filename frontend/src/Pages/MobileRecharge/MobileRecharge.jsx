import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav'
import './MobileRecharge'
import { states, mobile_operator } from '../../FromElement.js'
import { useState } from 'react'

export const MobileRecharge = () => {

    const [formData, setFormData] = useState({ operator: '', state: '', phone: '', amount: '' })

    const handleChange = (event) =>{
        const { name, value } = event.target;

        if(name=='phone' && formData.phone.length<10){
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
        else if(name!='phone'){
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }


    return (
        <Box>
            <DashboardNav />
            <Box>
                <Heading textAlign={'center'} mt={'20px'}>Mobile Recharge</Heading>
                <Box w={['95%', '80%', '60%']} m={'15px auto 1cm auto'}>
                    <form>
                        <Box mt={'7px'}>
                            <Text color={'grey'} m={'7px 10px'}>Select Operator</Text>
                            <select name='operator' value={formData.operator} onChange={handleChange} required style={{ border: '1px solid grey', width: '100%', padding: '10px', marginBottom: '0' }}>
                                <option value="" disabled>select</option>
                                {mobile_operator && mobile_operator?.map((ele, index) => (
                                    <option key={index} value={ele}>{ele}</option>
                                ))}
                            </select>
                        </Box>
                        <Box mt={'7px'}>
                            <Text color={'grey'} m={'7px 10px'}>Select State</Text>
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