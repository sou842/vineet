import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useToast } from "@chakra-ui/react";
import './Signup.css'
import React, { useEffect, useState } from "react";
import { state } from "../../utils/state";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  //    ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  const baseURL = process.env.REACT_APP_BASE_URL
  //     ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
  const navigate = useNavigate();
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    shopeName: "",
    panNumber: "",
    aadharNumber: "",
    allOrders: [],
    balance: 0
  })

  const handleChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast({ title: 'Account createing....', status: 'success', position: 'top', duration: 5000, isClosable: true, })
    axios.post(`${baseURL}/api/register`, regData)
      .then((res) => {
        axios.post(`${baseURL}/profile/profile-pictire`, { avatar: "", vendorID: res.data.vendorID }).then((res) => console.log(res.data))
          .catch((err) => console.log(err))
        toast({ title: 'Account created successfully.', status: 'success', position: 'top', duration: 5000, isClosable: true, })
        navigate("/signin")
      })
      .catch((err) => {
        toast({ title: 'Try again, Something Wrong', status: 'error', duration: 5000, isClosable: true, position: 'top' })
        // console.log(err);
      })
  }




  useEffect(() => {

    // onOpen()
  }, [])
  const handleYes = () => {
    onClose()
  }
  const handleNo = () => {
    navigate("/")
  }


  return (
    <Box bg={'gray.100'} pt={'2cm'} pb={'1cm'}>

      <Box w={['90%', '80%', "60%"]} m={"auto"} shadow={'md'} p={['15px', '20px', '50px']} borderRadius={'10px'} bg={'white'} >
        <Heading display={'flex'}>Registratio<Text color={'#43ef6e'}>n</Text></Heading>
        <Box w={'80px'} border={'1.5px solid #43ef6e'} mt={'3px'} mb={'1cm'}></Box>
        <Box w={'100%'}>
          <form onSubmit={handleSubmit} >

            <Box mb={['10px', '10px', '15px']} display={"flex"} flexDirection={['column', 'column', 'row']} justifyContent={"space-between"} gap={"10px"} bg={'white'} >
              <Box w={['100%', '100%', '45%']}>
                <FormControl color={'grey'}>
                  <FormLabel ml={'10px'} display={'flex'}>Full Name<Text color={'red'}>*</Text></FormLabel>
                  <Input border={'1.3px solid grey'} type="text" placeholder="Enter your name" name="name" onChange={handleChange} required />
                </FormControl>
              </Box>
              <Box w={['100%', '100%', '45%']}>
                <FormControl color={'grey'}>
                  <FormLabel ml={'10px'} display={'flex'}>Email address<Text color={'red'}>*</Text></FormLabel>
                  <Input border={'1.3px solid grey'} type="email" placeholder="Enter your Email Address" name="email" onChange={handleChange} required />
                </FormControl>
              </Box>
            </Box>

            <Box mb={['7px', '10px', '15px']} display={"flex"} flexDirection={['column', 'column', 'row']} justifyContent={"space-between"} gap={"10px"} bg={'white'} >
              <Box w={['100%', '100%', '45%']}>
                <FormControl color={'grey'}>
                  <FormLabel ml={'10px'} display={'flex'}>Mobile No<Text color={'red'}>*</Text></FormLabel>
                  <Input border={'1.3px solid grey'} type="number" placeholder="Enter your mobile number" name="mobileNumber" onChange={handleChange} required />
                </FormControl>
              </Box>
              <Box w={['100%', '100%', '45%']}>
                <FormControl color={'grey'}>
                  <FormLabel ml={'10px'} display={'flex'}>Address<Text color={'red'}>*</Text></FormLabel>
                  <Input border={'1.3px solid grey'} type="text" placeholder="Enter your address Address" name="address" onChange={handleChange} required />
                </FormControl>
              </Box>
            </Box>



            <Box mb={['7px', '10px', '15px']} display={"flex"} flexDirection={['column', 'column', 'row']} justifyContent={"space-between"} gap={"10px"} bg={'white'} >
              <Box w={['100%', '100%', '45%']}>
                <FormControl color={'grey'}>
                  <FormLabel ml={'10px'} display={'flex'} >City<Text color={'red'}>*</Text></FormLabel>
                  <Input border={'1.3px solid grey'} type="text" placeholder="Enter your city" name="city" onChange={handleChange} required />
                </FormControl>
              </Box>
              <Box w={['100%', '100%', '45%']}>
                <FormControl color={'grey'}>
                  <FormLabel ml={'10px'} display={'flex'} >Pin Code<Text color={'red'}>*</Text></FormLabel>
                  <Input border={'1.3px solid grey'} type="number" placeholder="Enter your pin code" name="pincode" onChange={handleChange} required />
                </FormControl>
              </Box>
            </Box>



            <Box mb={['7px', '10px', '15px']} display={"flex"} flexDirection={['column', 'column', 'row']} justifyContent={"space-between"} gap={"10px"} bg={'white'} >
              <Box w={['100%', '100%', '45%']}>
                <FormControl color={'grey'}>
                  <FormLabel ml={'10px'} display={'flex'}>State<Text color={'red'}>*</Text></FormLabel>
                  <Select color={'grey'} border={'1.3px solid grey'} name="state" onChange={handleChange} required>
                    <option value={""} disabled>Select your state</option>
                    {state.map((el, i) => {
                      return (
                        <option key={i} value={el}>
                          {el}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box w={['100%', '100%', '45%']}>
                <FormControl color={'grey'}>
                  <FormLabel ml={'10px'} display={'flex'}>Retailer Shop Name<Text color={'red'}>*</Text></FormLabel>
                  <Input border={'1.3px solid grey'} type="text" placeholder="Enter your retailer shop name" name="shopeName" onChange={handleChange} required
                  />
                </FormControl>
              </Box>
            </Box>



            <Box mb={'15px'} display={"flex"} flexDirection={['column', 'column', 'row']} justifyContent={"space-between"} gap={"10px"} bg={'white'} >
              <Box w={['100%', '100%', '45%']}>
                <FormControl>
                  <FormLabel ml={'10px'} display={'flex'} color={'grey'}>Pan card Number<Text color={'red'}>*</Text></FormLabel>
                  <Input border={'1.3px solid grey'} type="text" maxLength={'10'} value={regData.panNumber.toUpperCase()} placeholder="Enter your pan card number" name="panNumber" onChange={handleChange} required />
                </FormControl>
              </Box>
              <Box w={['100%', '100%', '45%']}>
                <FormControl>
                  <FormLabel ml={'10px'} display={'flex'} color={'grey'}>Addhaar card Number<Text color={'red'}>*</Text></FormLabel>
                  <Input border={'1.3px solid grey'} type="text" placeholder="Enter your aadhaar card number" value={regData.aadharNumber} name="aadharNumber" onChange={handleChange} required
                  />
                </FormControl>
              </Box>
            </Box>

            <Box w={'80%'} m={'auto'}>
              <Button w={'100%'} h={'45px'} mt={'1cm'} mb={'10px'} letterSpacing={'3px'} type="submit" size={'lg'} bg={'#43ef6e'}>CREATE</Button>
              <Box w={'100%'} display={'flex'} borderRadius={'7px'} alignItems={'center'} justifyContent={'center'} h={'45px'} letterSpacing={'1px'} cursor={'pointer'} type="submit" size={'sm'} bg={'white'} border={'1.4px solid #43ef6e'} onClick={() => navigate('/Signin')}>LOGIN</Box>
            </Box>
          </form>
        </Box>
        <Text textAlign={'center'} mt={'20px'}>Need Assistance With This Form Call + 91-9368372889, 9368398663, 9368546898</Text>
      </Box>
      {/* instarction-1 */}
      <Box w={['90%', '80%', "70%"]} m={'1cm auto'}>
        <Text fontSize={['12px', '13px', '14px']} border={'1px solid '} p={'15px'} bg={'#43ef6e'} fontWeight={'black'}>
          आप सभी को सावधान किया जाता है की डिजिटल इंडिया पोर्टल ने अभी तक किसी भी सर्विस के लिए कोई पैसा नहीं लिया है और ना किसी सर्विस के लिए कोई पैसा लिया जा रहा है डिजिटल इंडिया पोर्टल आपको अवगत करा रहा है कि बाजार में डिजिटल इंडिया पोर्टल के नाम पर बहुत से लोग ठगी कर रहे हैं आपसे निवेदन रहेगा कि किसी को भी किसी भी प्रकार का शुल्क ना दें क्योंकि डिजिटल इंडिया पोर्टल की सभी सेवाएं निशुल्क प्रदान की जा रही है अगर आपसे कोई पैसे की मांग कर रहा है तो आप उसकी सूचना ऊपर दिए गए नंबरों पर अथवा ईमेल पर डिजिटल इंडिया पोर्टल के साथ साझा करें
        </Text>
        <Text fontSize={['12px', '13px', '14px']} mt={'30px'} border={'1px solid '} p={'15px'} color={'white'} bg={'red.300'} fontWeight={'black'}>
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