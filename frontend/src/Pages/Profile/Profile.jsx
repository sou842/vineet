import { useEffect, useState } from 'react';
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav';
import './Profile.css'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box, Button, Heading, MenuButton, Spinner, Text, Menu, MenuItem, MenuList, useToast, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Input, FormControl, FormLabel, useDisclosure
} from '@chakra-ui/react';
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav';


export const Profile = () => {
  const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()
  const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;

    console.log(selectedValue)
    navigate(selectedValue)
  };
  const [profileData, setProfileData] = useState([])
  const [loading, setLoading] = useState(false)
  const [editdata, setEditdata] = useState({
    email: "",
    shopeName: "",
    mobileNumber: ""
  })
  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:8080/api/profile-detail", {
      headers: {
        "Authorization": portalData.token
      }
    })
      .then((res) => {
        setLoading(false)
        setProfileData(res.data)

      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      })

  }, [])

  //logout localstorage data will be delete
  const handleLogout = () => {
    localStorage.removeItem("digitalPortal")

    toast({
      title: 'Logout Succesfull.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    window.location = '/'
  }

  //edit function
  const handleEdit = (data) => {
    editOnOpen();
    setEditdata({ ...editdata, email: data.email, shopeName: data.shopeName, mobileNumber: data.mobileNumber })
  }
  //change edit data
  const handleChangeEdit = (e) => {
    if (e.target.name == "avtar") {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
<<<<<<< HEAD
      reader.onload=()=>{
        setEditdata({...editdata,[e.target.name]:reader.result})
          // console.log(reader.result);
         
=======
      reader.onload = () => {
        setEditdata({ ...editdata, [e.target.name]: reader.result })
        // console.log(reader.result);

>>>>>>> 1003824ddc8b3678ebd5792d53e95e8c9dc5dd56
      }
    }
    else {

      setEditdata({ ...editdata, [e.target.name]: e.target.value })
    }
  }
  const handleUpdate = () => {
    axios.patch("http://localhost:8080/api/profile-update", editdata, {
      headers: {
        "Authorization": portalData.token
      }

    })
      .then((res) => {
        // console.log(res.data);
        toast({
          title: res.data,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        window.location = '/Dashboard'
      })
      .catch((err) => {
        console.log(err);
      })
  }



  return (
    <div>
      <div><PanCardNav /></div>

      {/* profile details */}
      
      <Heading size={'md'} textAlign={'center'} mt={'1cm'} mb={'20px'}>YOUR PROFILE</Heading>
      <Box w={['90%', '90%', '60%']} m={'auto'} mb={'1cm'} gap={'10px'} bg={'gray.100'} p={'25px'} borderRadius={'5px'} >{
        loading ? <Box display={'flex'} justifyContent={'center'}><Spinner /> </Box> :


          profileData.map((el, i) => {
            return <div key={i}>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>vendorID: <Text fontWeight={'thin'} as={'span'}>{el.vendorID}</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Person Name: <Text fontWeight={'thin'} as={'span'}>{el.name}</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Email: <Text fontWeight={'thin'} as={'span'}>{el.email}</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Person Contact: <Text fontWeight={'thin'} as={'span'}>{el.mobileNumber}</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Address: <Text fontWeight={'thin'} as={'span'}>{el.address}</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>City: <Text fontWeight={'thin'} as={'span'}>{el.city}</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>State: <Text fontWeight={'thin'} as={'span'}>{el.state}</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Country: <Text fontWeight={'thin'} as={'span'}>India</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Pin Code: <Text fontWeight={'thin'} as={'span'}>{el.pincode}</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Retailer Shop Name: <Text fontWeight={'thin'} as={'span'}>{el.shopeName}</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Bussiness: <Text fontWeight={'thin'} as={'span'}>NA</Text> </Heading>
              <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Joining Date & Time: <Text fontWeight={'thin'} as={'span'}>{el.joindate}</Text> </Heading>
              <Box textAlign={'center'} mt={'20px'}>
                <Button width={'50%'} colorScheme='yellow' size={'sm'} onClick={() => handleEdit(el)}>Edit Profile</Button>

              </Box>
            </div>
          })
      }



      </Box>

      {/* EDIT PROFIL MODAL */}
      <Modal
        isOpen={editIsOpen}
        onClose={editOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder='Email address' name='email' value={editdata.email} onChange={handleChangeEdit} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Mobile Number</FormLabel>
              <Input placeholder='Mobile number' name='mobileNumber' value={editdata.mobileNumber} onChange={handleChangeEdit} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Shop Name</FormLabel>
              <Input placeholder='Shop Name' name='shopeName' value={editdata.shopeName} onChange={handleChangeEdit} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Upload your image</FormLabel>
              <Input type='file' name='avtar' onChange={handleChangeEdit} accept="image/*" />
            </FormControl>
          </ModalBody>

          <ModalFooter bg={'white'}>
            <Button colorScheme='blue' mr={3} size={'sm'} onClick={handleUpdate} >
              Update
            </Button>
            <Button onClick={editOnClose} size={'sm'}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}