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
  ModalCloseButton, Input, FormControl, FormLabel, useDisclosure, Image, Img
} from '@chakra-ui/react';
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav';


export const Profile = () => {
  const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
  const { isOpen: profileIsOpen, onOpen: profileOnOpen, onClose: profileOnClose } = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()
  const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;

    // console.log(selectedValue)
    navigate(selectedValue)
  };
  const [profileData, setProfileData] = useState([])
  const [loading, setLoading] = useState(false)
  const [picture, setPicture] = useState("")
  const [userDP, setUserDP] = useState("")
  const [uploadDpLoad, setUploadDpLoad] = useState(false)
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
    if (portalData.avatar == '') {
      axios.get("http://localhost:8080/profile/profile-pictire", {
        headers: {
          "Authorization": portalData.token
        }
      })
        .then((res) => {
          // setUserDP(res.data.avatar);
          let obj = {
            token: portalData.token,
            auth: portalData.auth,
            username: portalData.username,
            avatar: res.data.avatar
          }
          localStorage.setItem("digitalPortal", JSON.stringify(obj))
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }, [])


  // localStorage.setItem("digitalPortal",JSON.stringify(obj))


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
  const handelProfilePicture = (e) => {
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setPicture(reader.result)
      }
    }

  }
  const handleChangeEdit = (e) => {
    setEditdata({ ...editdata, [e.target.name]: e.target.value })
  }



  //handelPhotoUpdate
  const handelPhotoUpdate = () => {
    setUploadDpLoad(true)
    axios.patch("http://localhost:8080/profile/update-profile-pictire", { avatar: picture }, {
      headers: {
        "Authorization": portalData.token
      }
    })
      .then((res) => {
        setUploadDpLoad(false)
        let obj = { token: portalData.token, auth: portalData.auth, username: portalData.username, avatar: picture }
        localStorage.setItem("digitalPortal", JSON.stringify(obj))

        toast({ title: res.data, status: 'success', duration: 3000, isClosable: true, })
        profileOnClose()
        window.location = '/Dashboard'
      })
      .catch((err) => {
        setUploadDpLoad(false)
        console.log(err);
      })
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

      {loading ? <Box display={'flex'} justifyContent={'center'} mt={'5cm'}><Spinner color='blue.300' /></Box> :


        profileData.map((el, i) => {
          return <div key={i}>
            <Box w={['95%', '95%', '85%']} display={'flex'} justifyContent={'space-between'} flexDirection={['column', 'column', 'row']} m={'auto'} mt={['0.5cm', '0.5cm', '1cm']} mb={'1cm'} bg={'gray.100'} p={['7px', '15px', '25px']} borderRadius={'15px'} >

              <Box width={['100%', '100%', '40%']} >

                <Box w={'100%'} h={['60%']} position="relative" display="inline-block">
                  <Box position="absolute"
                    top="10px"
                    right="10px"
                    // transform="translate(-50%, -50%)"
                    borderRadius="full"
                    bg="white"
                    boxShadow="md"
                    p={1}
                    onClick={profileOnOpen}
                    cursor={'pointer'}

                  >


                    <Img position={'relative'} w={'25px'} src='https://cdn-icons-png.flaticon.com/128/8304/8304794.png' />

                  </Box>
                  {portalData.avatar == '' ?
                    <Text mt={'-30px'} color={'blue.200'} fontSize={'50px'} display={'flex'} justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'} m={'auto'} borderRadius={'15px'} bg={'white'}>{portalData.username.match(/\b\w/g).join('').toUpperCase()}</Text>
                    :
                    <Image w={'100%'} h={'100%'} borderRadius={'15px'} src={portalData.avatar} alt="" />
                  }

                </Box>

                <Box textAlign={'center'} mt={'20px'}>
                  <Button width={'100%'} h={'45px'} colorScheme='yellow' size={'sm'} onClick={() => handleEdit(el)}>Edit Profile</Button>
                </Box>

                <Box mt={'20px'}>
                  <Heading size={'sm'} p={'15px'} display={'flex'} alignItems={'center'}><Image width={'25px'} mr={'15px'} src='https://cdn-icons-png.flaticon.com/128/1077/1077063.png' /><Text fontWeight={'bold'} as={'span'}>{el.name.toUpperCase()}</Text> </Heading>
                  <Heading size={'sm'} p={'15px'} display={'flex'} alignItems={'center'}><Image width={'25px'} mr={'15px'} src='https://cdn-icons-png.flaticon.com/128/646/646094.png' /> <Text fontWeight={'bold'} as={'span'}>{el.email}</Text> </Heading>
                </Box>
              </Box>

              <Box width={['100%', '100%', '55%']} bg={'white'} p={'10px'} borderRadius={'15px'}>
                <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>vendorID: <Text fontWeight={'thin'} as={'span'}>{el.vendorID}</Text> </Heading>
                <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Phone: <Text fontWeight={'thin'} as={'span'}>{el.mobileNumber}</Text> </Heading>
                <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Address: <Text fontWeight={'thin'} as={'span'}>{el.address}</Text> </Heading>
                <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>City: <Text fontWeight={'thin'} as={'span'}>{el.city}</Text> </Heading>
                <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>State: <Text fontWeight={'thin'} as={'span'}>{el.state}</Text> </Heading>
                <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Country: <Text fontWeight={'thin'} as={'span'}>India</Text> </Heading>
                <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Pin Code: <Text fontWeight={'thin'} as={'span'}>{el.pincode}</Text> </Heading>
                <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Retailer Shop Name: <Text fontWeight={'thin'} as={'span'}>{el.shopeName}</Text> </Heading>
                <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Bussiness: <Text fontWeight={'thin'} as={'span'}>NA</Text> </Heading>
                <Heading size={'sm'} p={'15px'}>Joining Date & Time: <Text fontWeight={'thin'} as={'span'}>{el.joindate}</Text> </Heading>
              </Box>
            </Box>
          </div>
        })
      }




      {/* EDIT PROFIL MODAL */}
      <Modal isOpen={editIsOpen} onClose={editOnClose}>
        <ModalOverlay />
        <ModalContent w={'95%'}>
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
          </ModalBody>

          <ModalFooter bg={'white'}>
            <Button p={'15px'} fontFamily={'sans-serif'} onClick={editOnClose} mr={3} size={'sm'}>Cancel</Button>
            <Button p={'15px'} fontFamily={'sans-serif'} colorScheme='yellow' size={'sm'} onClick={handleUpdate} >Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* profile picture update modal */}
      <Modal isOpen={profileIsOpen} onClose={profileOnClose}>
        <ModalOverlay />
        <ModalContent w={'95%'}>
          <ModalHeader>Update Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input p={'3.5px'} type='file' onChange={handelProfilePicture} accept="image/*" />

          </ModalBody>

          <ModalFooter bg={'white'}>
            <Button p={'15px'} fontFamily={'sans-serif'} variant='ghost' mr={3} onClick={profileOnClose} size={'sm'}> Close</Button>
            <Button p={'15px'} fontFamily={'sans-serif'} colorScheme='yellow' isDisabled={uploadDpLoad} size={'xs'} onClick={handelPhotoUpdate}  >{uploadDpLoad?"Loading...":"Update"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}