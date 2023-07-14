import { Box, Heading ,  FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Input,
    Text,useToast} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
    const toast=useToast()
    const navigate=useNavigate()
    const handleHome=()=>{
        navigate("/")
    }
    const handleRegister=()=>{
        navigate("/signup")
    }

    const [loginData,setLoginData]=useState({
        vendorID:"",
        password:""

})
const handleChange=(e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
}

const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8080/api/login",loginData)
    .then((res)=>{
        if(res.data.msg=="login successful"){
            toast({
                title: res.data.msg,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
              navigate("/")

        }
        else{
            toast({
                title: res.data.msg,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })

        }

    })
    .catch((err)=>{
        console.log(err);
    })
}

   
  return (
    <Box bg={'gray.200'}>
{/* conatct us */}
<Box textAlign={'center'} w={'90%'} m={'auto'} p={'15px'} border={'1px solid'} fontWeight={'black'} bg={'red.100'}>
    <Text> Email:- helpdigitalindiaportal@gmail.com</Text>
    <Text> Phones:- 9368372889, 9368398663, 9368546898, 9149154754, 7017784029, 7668034958, 7668039141, 9149132382</Text>
    <Text>  Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</Text>
    <Text color={'red'}>Note:- "Dear User & Visitors, please be informed that this portal is totally free of cost, No cost is asked for its registration. If anyone asks any money for the same, Please don't do so and kindly reach out to given Numbers and Email."</Text>
</Box>




        <Box w={['90%','90%','40%']} m={'30px auto'} shadow={'md'} p={'50px'} borderRadius={'10px'} bg={'white'}>
            <Heading textAlign={'center'} size={'lg'}>SIGN IN NOW</Heading>
            <form onSubmit={handleSubmit}>
            <Box >
            <FormControl>
            <FormLabel>Vendor ID</FormLabel>
            <Input type='text' placeholder='Vendor ID' name='vendorID' onChange={handleChange}/>
            </FormControl>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password' placeholder='Passowrd' name='password' onChange={handleChange}/>
            </FormControl>
            <FormControl>
            <FormLabel>Capcha</FormLabel>
            <Input type='text' placeholder='Enter captcha' bg={'gray.100'}/>
            </FormControl>
            <Box mt={'10px'} textAlign={'center'}>

            <Button colorScheme={'linkedin'} type='submit'>SIGNIN</Button>
            </Box>
            </Box>
            </form>
            <Box textAlign={'center'} m={'10px'}>
                <Button onClick={handleHome} size={'sm'} m={'10px'} colorScheme={'orange'}>HOME</Button>
                <Button onClick={handleRegister}  size={'sm'} colorScheme={'green'}>REGISTER</Button>
            </Box>
            <Box textAlign={'center'}>
                <Button size={'xs'} colorScheme={'yellow'} >FORGET PASSWORD</Button>
            </Box>


        </Box>

{/* insturction */}
<Box w={['90%']} m={"auto"} mt={'30px'}>
  <Text border={'1px solid '} p={'15px'} bg={'green.200'} fontWeight={'black'}>
  केंद्र संचालक कृपया ध्यान दें अगर आप अपना पासवर्ड भूल गए हैं या खो गया है तो आप फॉरगेट पासवर्ड पर क्लिक करके अपना पासवर्ड रिकवर कर सकते हैं इसके लिए आपको या तो रजिस्टर्ड ईमेल आईडी या मोबाइल नंबर या अपनी वेंडर आईडी एंटर करनी होगी उसके बाद आप का आईडी पासवर्ड आपकी ईमेल पर भेज दिया जाएगा ईमेल इनबॉक्स के साथ-साथ स्पैम फोल्डर भी चेक करें
  </Text>
  <Text mt={'30px'} border={'1px solid '} p={'15px'} bg={'red.200'} fontWeight={'black'}>
  हमें आपको सूचित करते हुए बड़ा हर्ष हो रहा है कि डिजिटल इंडिया पोर्टल आपको इंडिया की बेस्ट सर्विस प्रदान करता है और आप को सूचित किया जाता है कि जल्द ही डिजिटल इंडिया पोर्टल कुछ नई सर्विस आपके लिए लेकर आ रहा है जैसे वाहन इंश्योरेंस, AEPS, आयुष्मान कार्ड, श्रमिक कार्ड इत्यादि
    </Text>
  <Text mt={'30px'} border={'1px solid '} p={'15px'} bg={'blue.100'} fontWeight={'black'}>
  हम आपसे अनुरोध करते हैं कि डिजिटल इंडिया पोर्टल द्वारा प्रदान की जा रही अन्य सुविधाएं जैसे पैन कार्ड, बिजली बिल का भुगतान, मोबाइल रिचार्ज, डीटीएच रिचार्ज, GST रजिस्ट्रेशन, ITR फाइलिंग जैसी अन्य सुविधाओं का भी आप लाभ उठाएं और हम आपको भरोसा दिलाते हैं कि भविष्य में डिजिटल इंडिया पोर्टल आपको और भी सुविधाएं प्रदान करेगा डिजिटल इंडिया पोर्टल के साथ जुड़े रहने के लिए धन्यवाद
    </Text>
</Box>


    </Box>
  )
}
