import {
    Box, Heading, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Input,
    Text, useToast
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { loginFun } from '../../redux/authReducer/action';

export default function Signin() {
    const dispatch = useDispatch()
    const toast = useToast()
    const navigate = useNavigate()
    const handleHome = () => {
        navigate("/")
    }

    const [loginData, setLoginData] = useState({
        vendorID: "",
        password: ""

    })
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginFun(loginData)).then((res) => {
            if (res == "login successful") {
                toast({ title: res, status: 'success', duration: 5000, isClosable: true, position: 'top' })
                window.location = '/Dashboard'
            }
            else {
                toast({ title: 'Try again, Something Wrong', status: 'error', duration: 5000, isClosable: true, position: 'top' })

            }

        })

    }


    return (
        <Box bg={'gray.200'} pt={'1.3cm'} pb={'1cm'}>
            {/* conatct us */}
            {/* <Box textAlign={'center'} w={'90%'} m={'auto'} p={'15px'} border={'1px solid'} fontWeight={'black'} bg={'red.100'}>
                <Text> Email:- helpdigitalindiaportal@gmail.com</Text>
                <Text> Phones:- 9368372889, 9368398663, 9368546898, 9149154754, 7017784029, 7668034958, 7668039141, 9149132382</Text>
                <Text>  Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</Text>
                <Text color={'red'}>Note:- "Dear User & Visitors, please be informed that this portal is totally free of cost, No cost is asked for its registration. If anyone asks any money for the same, Please don't do so and kindly reach out to given Numbers and Email."</Text>
            </Box> */}




            <Box w={['90%', '90%', '50%']} m={'auto'} shadow={'md'} p={['15px', '20px', '40px']} borderRadius={'10px'} bg={'white'}>
                <Heading display={'flex'}>Logi<Text color={'#43ef6e'}>n</Text></Heading>
                <Box w={'80px'} border={'1.5px solid #43ef6e'} mt={'3px'} mb={'1cm'}></Box>

                <form onSubmit={handleSubmit}>
                    <Box >
                        <FormControl color={'grey'} mb={'10px'}>
                            <FormLabel display={'flex'} ml={'10px'}>Vendor ID<Text color={'red'}>*</Text></FormLabel>
                            <Input required border={'1.3px solid grey'} type='text' placeholder='Vendor ID' name='vendorID' maxLength={10} value={loginData.vendorID.toUpperCase()} onChange={handleChange} />
                        </FormControl>
                        <FormControl color={'grey'} mb={'10px'}>
                            <FormLabel display={'flex'} ml={'10px'}>Password<Text color={'red'}>*</Text></FormLabel>
                            <Input required border={'1.3px solid grey'} type='password' placeholder='Passowrd' name='password' onChange={handleChange} />
                        </FormControl>
                        <FormControl color={'grey'} mb={'10px'}>
                            <FormLabel display={'flex'} ml={'10px'}>Capcha<Text color={'red'}>*</Text></FormLabel>
                            <Input border={'1.3px solid grey'} type='text' placeholder='Captcha' />
                        </FormControl>
                        <Box mt={'0.7cm'} textAlign={'center'}>
                            <Text m={'10px'} display={'flex'}>Forget Your Password?<Text onClick={() => navigate("/user/change-password")} ml={'10px'} cursor={'pointer'} borderBottom={'1.4px solid #43ef6e'}>Click Here</Text> </Text>
                            <Button w={'100%'} h={'45px'} bg={'#43ef6e'} type='submit'>SIGNIN</Button>
                        </Box>

                    </Box>
                </form>
                <Box mt={'20px'} borderTop={'1.3px solid black'}>
                    <Text onClick={() => navigate("/signup")} _hover={{ color: '#43ef6e' }} transition={'0.3s ease'} fontSize={'17px'} mt={'15px'} cursor={'pointer'} display={'flex'} justifyContent={'center'}>Create Account</Text>
                    {/* <Button onClick={handleHome} size={'sm'} m={'10px'} colorScheme={'orange'}>HOME</Button> */}
                    {/* <Button onClick={handleRegister} size={'sm'} colorScheme={'green'}>REGISTER</Button> */}
                </Box>
                {/* <Box textAlign={'center'}>
                    <Button size={'xs'} colorScheme={'yellow'} onClick={() => navigate("/user/change-password")}>FORGET PASSWORD</Button>
                </Box> */}


            </Box>

            {/* insturction */}
            <Box w={['90%', '80%', "70%"]} m={'1cm auto'}>
                <Text fontSize={['12px', '13px', '14px']} border={'1px solid '} p={'15px'} bg={'#43ef6e'} fontWeight={'black'}>
                    केंद्र संचालक कृपया ध्यान दें अगर आप अपना पासवर्ड भूल गए हैं या खो गया है तो आप फॉरगेट पासवर्ड पर क्लिक करके अपना पासवर्ड रिकवर कर सकते हैं इसके लिए आपको या तो रजिस्टर्ड ईमेल आईडी या मोबाइल नंबर या अपनी वेंडर आईडी एंटर करनी होगी उसके बाद आप का आईडी पासवर्ड आपकी ईमेल पर भेज दिया जाएगा ईमेल इनबॉक्स के साथ-साथ स्पैम फोल्डर भी चेक करें
                </Text>
                <Text fontSize={['12px', '13px', '14px']} mt={'30px'} border={'1px solid '} p={'15px'} color={'white'} bg={'red.300'} fontWeight={'black'}>
                    हमें आपको सूचित करते हुए बड़ा हर्ष हो रहा है कि डिजिटल इंडिया पोर्टल आपको इंडिया की बेस्ट सर्विस प्रदान करता है और आप को सूचित किया जाता है कि जल्द ही डिजिटल इंडिया पोर्टल कुछ नई सर्विस आपके लिए लेकर आ रहा है जैसे वाहन इंश्योरेंस, AEPS, आयुष्मान कार्ड, श्रमिक कार्ड इत्यादि
                </Text>
                <Text fontSize={['12px', '13px', '14px']} mt={'30px'} border={'1px solid '} p={'15px'} color={'white'} bg={'blue.300'} fontWeight={'black'}>
                    हम आपसे अनुरोध करते हैं कि डिजिटल इंडिया पोर्टल द्वारा प्रदान की जा रही अन्य सुविधाएं जैसे पैन कार्ड, बिजली बिल का भुगतान, मोबाइल रिचार्ज, डीटीएच रिचार्ज, GST रजिस्ट्रेशन, ITR फाइलिंग जैसी अन्य सुविधाओं का भी आप लाभ उठाएं और हम आपको भरोसा दिलाते हैं कि भविष्य में डिजिटल इंडिया पोर्टल आपको और भी सुविधाएं प्रदान करेगा डिजिटल इंडिया पोर्टल के साथ जुड़े रहने के लिए धन्यवाद
                </Text>
            </Box>


        </Box>
    )
}
