import { Box, Button, Heading, MenuButton, Spinner, Text, Menu, MenuItem, MenuList, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, FormLabel, useDisclosure, Image, Img } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './Profile.css'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav';
import deletee from '../../assets/deletee.png';
import edit from '../../assets/edit.png'


export const Profile = () => {
  const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
  const [profileData, setProfileData] = useState([])
  const [loading, setLoading] = useState(false)
  const [picture, setPicture] = useState("")
  const [userDP, setUserDP] = useState("")
  const [uploadDpLoad, setUploadDpLoad] = useState(false)
  const [editdata, setEditdata] = useState({ email: "", shopeName: "", mobileNumber: "" })
  const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
  const { isOpen: profileIsOpen, onOpen: profileOnOpen, onClose: profileOnClose } = useDisclosure()
  const { isOpen: DeleteIsOpen, onOpen: DeleteOnOpen, onClose: DeleteOnClose } = useDisclosure()
  const baseURL = process.env.REACT_APP_BASE_URL

  const navigate = useNavigate()
  const toast = useToast()

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    navigate(selectedValue)
  };



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

  //logout localstorage data will be delete
  const handleLogout = () => {
    localStorage.removeItem("digitalPortal")

    toast({ title: 'Logout Succesfull.', status: 'success', duration: 3000, isClosable: true, position: 'top' })
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
    toast({ title: 'Photo Updating...', status: 'success', duration: 4000, isClosable: true, position: 'top' })

    let obj = { token: portalData.token, auth: portalData.auth, username: portalData.username, avatar: picture }
    profileOnClose()

    setUploadDpLoad(true)
    axios.patch("http://localhost:8080/profile/update-profile-pictire", { avatar: picture }, {
      headers: { "Authorization": portalData.token }
    })
      .then((res) => {
        localStorage.setItem("digitalPortal", JSON.stringify(obj))
        window.location = '/Dashboard'
      })
      .catch((err) => {
        toast({ title: 'Try Again, Something Wrong!!!', status: 'error', duration: 4000, isClosable: true, position: 'top' })
        console.log(err);
      })
  }

  const handleUpdate = () => {
    editOnClose()

    axios.patch("http://localhost:8080/api/profile-update", editdata, {
      headers: {
        "Authorization": portalData.token
      }

    })
      .then((res) => {
        toast({ title: res.data, status: 'success', duration: 3000, isClosable: true, position: 'top' })
        window.location = '/Dashboard'
      })
      .catch((err) => {
        console.log(err);
        toast({ title: 'Try Again, Something Wrong!!!', status: 'error', duration: 4000, isClosable: true, position: 'top' })
      })
  }

  const handlePhotoDelete = () => {

    axios.delete(`${baseURL}/profile/remove-profile-pictire`, {
      headers: { "Authorization": portalData.token }
    })
      .then((res) => {
        // console.log(res.data)
        if (res.data == 'Profile picture removed') {
          toast({ title: 'Profile Photo Deleted', status: 'success', duration: 4000, isClosable: true, position: 'top' })
          portalData.avatar = 'null';
          localStorage.setItem("digitalPortal", JSON.stringify(portalData))
          window.location = '/Dashboard'
        }
      })
      .catch((err) => {
        console.log(err);
        toast({ title: 'Try Again, Something Wrong!!!', status: 'error', duration: 4000, isClosable: true, position: 'top' })
      })

    DeleteOnClose()
  }
  console.log(portalData.avatar)

  return (
    <div>
      <div><PanCardNav /></div>

      {/* profile details */}

      {loading ? <Box display={'flex'} justifyContent={'center'} mt={'5cm'}><Spinner color='#00aeff' /></Box> :


        profileData.map((el, i) => {
          return <div key={i}>
            <Box w={['95%', '95%', '95%', '85%']} display={'flex'} justifyContent={'space-between'} flexDirection={['column', 'column', 'row']} m={'auto'} mt={['0.5cm', '0.5cm', '1cm']} mb={'1cm'} bg={'gray.100'} p={['7px', '15px', '25px']} borderRadius={'15px'} >

              <Box width={['100%', '100%', '40%']} >

                <Box overflow={'hidden'} w={'100%'} h={['230px', '300px', '320px']} position="relative" display="inline-block" borderRadius={'15px'}>
                  <Box position="absolute" top="10px" right="10px" borderRadius="full" bg="whiteAlpha.700" boxShadow="md" p={1} cursor={'pointer'}  >
                    <Img onClick={profileOnOpen} position={'relative'} w={'25px'} src={edit} m={'6px'} />
                    <Text border={'1px solid #00aeff'}></Text>
                    <Img onClick={DeleteOnOpen} position={'relative'} w={'25px'} src={deletee} m={'6px'} />
                  </Box>
                  {portalData.avatar == 'null' ?
                    <Text mt={'-30px'} color={'#00aeff'} fontSize={'50px'} display={'flex'} justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'} m={'auto'} borderRadius={'15px'} bg={'white'}>{portalData.username.match(/\b\w/g).join('').toUpperCase()}</Text>
                    :
                    <Image display={'block'} w={'100%'} m={'auto'} h={'100%'} objectFit={'cover'} objectPosition={'cover'} borderRadius={'15px'} src={portalData.avatar} alt="" />
                  }
                </Box>

                <Box textAlign={'center'} mt={'20px'}>
                  <Button width={'100%'} h={'45px'} bg='#00aeff' size={'sm'} onClick={() => handleEdit(el)}>Edit Profile</Button>
                </Box>

                <Box mt={'20px'}>
                  <Heading size={'sm'} p={'15px'} display={'flex'} alignItems={'center'}><Image width={'25px'} mr={'15px'} src='https://cdn-icons-png.flaticon.com/128/1077/1077063.png' /><Text fontWeight={'bold'} as={'span'} fontSize={['15px', '14px', '15px']}>{el.name.toUpperCase()}</Text> </Heading>
                  <Heading size={'sm'} p={'15px'} display={'flex'} alignItems={'center'}><Image width={'25px'} mr={'15px'} src='https://cdn-icons-png.flaticon.com/128/646/646094.png' /> <Text fontWeight={'bold'} as={'span'} fontSize={['15px', '14px', '15px']}>{el.email}</Text> </Heading>
                  <Heading size={'sm'} p={'15px'} display={'flex'} alignItems={'center'}><Image width={'25px'} mr={'15px'} src='https://cdn-icons-png.flaticon.com/128/1052/1052897.png' /> <Text borderBottom={'1px solid black'} onClick={()=>navigate('/PayDetails')} cursor={'pointer'} fontWeight={'bold'} as={'span'} fontSize={['15px', '14px', '15px']}>VIEW TRANSACTION</Text> </Heading>
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
            <Button p={'15px'} fontFamily={'sans-serif'} color={'whiteAlpha.900'} bg={'#00aeff'} size={'sm'} onClick={handleUpdate} >Update</Button>
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
            <Button p={'15px'} fontFamily={'sans-serif'} bg={'#00aeff'} color={'whiteAlpha.900'} isDisabled={uploadDpLoad} size={'xs'} onClick={handelPhotoUpdate}  >{uploadDpLoad ? "Loading..." : "Update"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* DELETE */}
      <Modal isOpen={DeleteIsOpen} onClose={DeleteOnClose}>
        <ModalOverlay />
        <ModalContent w={'95%'}>
          <ModalHeader>Are You Sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You Are About Delete This Song
          </ModalBody>

          <ModalFooter bg={'white'}>
            <Button p={'15px'} fontFamily={'sans-serif'} variant='ghost' mr={3} onClick={DeleteOnClose} size={'sm'}> Close</Button>
            <Button p={'15px'} fontFamily={'sans-serif'} bg={'#00aeff'} color={'whiteAlpha.900'} isDisabled={uploadDpLoad} size={'xs'} onClick={handlePhotoDelete}  >{uploadDpLoad ? "Loading..." : "Delete"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}