import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import './Signup.css'
import React, { useEffect, useState } from "react";
import { state } from "../../utils/state";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate=useNavigate();
  const toast=useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
const [regData,setRegData]=useState({
   name:"",
   email:"",
   mobileNumber:"",
    address:"",
    city:"",
    pincode:"",
    state:"",
    shopeName:"",
    panNumber:"",
    aadharNumber:"",
})

const handleChange=(e)=>{
  setRegData({...regData,[e.target.name]:e.target.value})
}

const handleSubmit=(e)=>{
  e.preventDefault()
  axios.post("http://localhost:8080/api/register",regData)
  .then((res)=>{
    toast({
      title: 'Account created.',
      description: "Check your console ",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    console.log(res.data);
    navigate("/signin")

  })
  .catch((err)=>{
    console.log(err);
  })
}




useEffect(()=>{

  onOpen()
},[])
const handleYes=()=>{
  onClose()
}
const handleNo=()=>{
  navigate("/")
}


  return (
    <Box bg={'gray.50'}>
      <Heading textAlign={"center"} size={"md"} p={'30px 0'}>
        Contact Franchise Forms With Register
      </Heading>
      <Box w={['90%','80%',"60%"]} m={"auto"} shadow={'md'} p={'50px'} borderRadius={'10px'} bg={'white'} >
        <form onSubmit={handleSubmit} >
          <Box >
            <Box display={"flex"} flexDirection={['column','column','row']} justifyContent={"space-around"} gap={"10px"} bg={'white'} >
              <FormControl >
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Enter your name" name="name" onChange={handleChange} required/>
              </FormControl>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder="Enter your Email Address" name="email" onChange={handleChange} required/>
              </FormControl>
            </Box>
          

          
            <Box  display={"flex"} flexDirection={['column','column','row']} justifyContent={"space-around"} gap={"10px"} bg={'white'}>
              <FormControl>
                <FormLabel>Mobile No</FormLabel>
                <Input type="number"  placeholder="Enter your mobile number" name="mobileNumber" 
                onChange={handleChange} required/>
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input type="text" placeholder="Enter your address Address" name="address" onChange={handleChange} required/>
              </FormControl>
            </Box>
          

         
            <Box  display={"flex"} flexDirection={['column','column','row']} justifyContent={"space-around"} gap={"10px"} bg={'white'}>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input type="text" placeholder="Enter your city" name="city" onChange={handleChange} required />
              </FormControl>
              <FormControl>
                <FormLabel>Pin Code</FormLabel>
                <Input type="number" placeholder="Enter your pin code" name="pincode" onChange={handleChange} required />
              </FormControl>
            </Box>
          

         
            <Box  display={"flex"} flexDirection={['column','column','row']} justifyContent={"space-around"} gap={"10px"} bg={'white'}>
              <FormControl>
                <FormLabel>State</FormLabel>
                <Select name="state" onChange={handleChange} required>
                  <option value={""}>Select your state</option>
                  {state.map((el, i) => {
                    return (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Retailer Shop Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your retailer shop name" name="shopeName" onChange={handleChange} required
                />
              </FormControl>
            </Box>
         

         
            <Box  display={"flex"} flexDirection={['column','column','row']} justifyContent={"space-around"} gap={"10px"} bg={'white'}>
              <FormControl>
                <FormLabel>Pan card Number</FormLabel>
                <Input type="text" maxLength={'10'} value={regData.panNumber.toUpperCase()} placeholder="Enter your pan card number"  name="panNumber" onChange={handleChange} required/>
              </FormControl>
              <FormControl>
                <FormLabel>Addhaar card Number</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your aadhaar card number" value={regData.aadharNumber} name="aadharNumber" onChange={handleChange} required
                />
              </FormControl>
            </Box>
          
          
          <Button mt={'10px'} letterSpacing={'3px'} type="submit" size={'sm'} colorScheme={'blue'} >SUBMIT</Button>
         
          </Box>
        </form>
      <Text mt={'10px'}>Need Assistance With This Form Call- + 91-9368372889, 9368398663, 9368546898</Text>
      </Box>
{/* instarction-1 */}
<Box w={['80%','80%',"60%"]} m={"auto"} mt={'30px'}>
  <Text border={'1px solid '} p={'15px'} bg={'green.200'} fontWeight={'black'}>
  आप सभी को सावधान किया जाता है की डिजिटल इंडिया पोर्टल ने अभी तक किसी भी सर्विस के लिए कोई पैसा नहीं लिया है और ना किसी सर्विस के लिए कोई पैसा लिया जा रहा है डिजिटल इंडिया पोर्टल आपको अवगत करा रहा है कि बाजार में डिजिटल इंडिया पोर्टल के नाम पर बहुत से लोग ठगी कर रहे हैं आपसे निवेदन रहेगा कि किसी को भी किसी भी प्रकार का शुल्क ना दें क्योंकि डिजिटल इंडिया पोर्टल की सभी सेवाएं निशुल्क प्रदान की जा रही है अगर आपसे कोई पैसे की मांग कर रहा है तो आप उसकी सूचना ऊपर दिए गए नंबरों पर अथवा ईमेल पर डिजिटल इंडिया पोर्टल के साथ साझा करें
  </Text>
  <Text mt={'30px'} border={'1px solid '} p={'15px'} bg={'red.200'} fontWeight={'black'}>
    हम आपसे अनुरोध करते हैं कि डिजिटल इंडिया पोर्टल द्वारा प्रदान की जा रही अन्य सुविधाएं जैसे पैन कार्ड, बिजली बिल का भुगतान, मोबाइल रिचार्ज, डीटीएच रिचार्ज, GST रजिस्ट्रेशन, ITR फाइलिंग जैसी अन्य सुविधाओं का भी आप लाभ उठाएं और हम आपको भरोसा दिलाते हैं कि भविष्य में डिजिटल इंडिया पोर्टल आपको और भी सुविधाएं प्रदान करेगा डिजिटल इंडिया पोर्टल के साथ जुड़े रहने के लिए धन्यवाद
    </Text>
</Box>



{/* initial time before registration instarction modal */}
<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size={'lg'} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>अनुदेश</ModalHeader>
                  
          <ModalBody >
            <Text>1. क्या आपके पास लैपटॉप या कंप्यूटर है ?</Text>
            <Text>2. क्या आपके पास स्केनर वाला प्रिंटर है ?</Text>
            <Text>3. क्या आपके पास इंटरनेट है ?</Text>
            <Text>4. क्या आपके पास एक दुकान है ?</Text>
            <Text>यदि इन सभी प्रश्नों का उत्तर हां है तो ही आप यह रजिस्ट्रेशन करें अन्यथा यह रजिस्ट्रेशन आपके लिए व्यर्थ है|</Text>
            
          </ModalBody>

          <ModalFooter bg={'white'}> 
            <Button size={'sm'} colorScheme='blue' mr={3} onClick={handleYes}>
            हां
            </Button>
            <Button size={'sm'} colorScheme="red" onClick={handleNo}>नहीं</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
};

export default Signup;
