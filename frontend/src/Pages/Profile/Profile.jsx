import { useEffect, useState } from 'react';
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav';
import './Profile.css'
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, MenuButton, Spinner, Text,Menu,MenuItem,MenuList, useToast , Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,Input,FormControl,FormLabel,useDisclosure} from '@chakra-ui/react';
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav';


export const Profile = () =>{
  const { isOpen:editIsOpen, onOpen:editOnOpen, onClose:editOnClose } = useDisclosure()
  const toast=useToast()
    const navigate = useNavigate()
    const portalData=JSON.parse(localStorage.getItem('digitalPortal'))||null

    const handleOptionChange = (event) => {
      const selectedValue = event.target.value;
  
      console.log(selectedValue)
      navigate(selectedValue)
    };
const [profileData,setProfileData]=useState([])
const [loading,setLoading]=useState(false)
const [editdata,setEditdata]=useState({
  email:"",
  shopeName:"",
  mobileNumber:""
})
useEffect(()=>{
  setLoading(true)
  axios.get("http://localhost:8080/api/profile-detail",{
    headers: {
      "Authorization": portalData.token
    }
  })
  .then((res)=>{
    setLoading(false)
    setProfileData(res.data)
    
  })
  .catch((err)=>{
    setLoading(false)
    console.log(err);
  })

},[])

  //logout localstorage data will be delete
  const handleLogout=()=>{
    localStorage.removeItem("digitalPortal")
   
    toast({
      title: 'Logout Succesfull.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    window.location='/'
  }

  //edit function
  const handleEdit=(data)=>{
    editOnOpen();
    setEditdata({...editdata,email:data.email,shopeName:data.shopeName,mobileNumber:data.mobileNumber})
  }
  //change edit data
  const handleChangeEdit=(e)=>{
    if(e.target.name=="avtar"){
      let reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=()=>{
        setEditdata({...editdata,[e.target.name]:reader.result})
          // console.log(reader.result);
         
      }
    }
    else{

      setEditdata({...editdata,[e.target.name]:e.target.value})
    }
  }
  const handleUpdate=()=>{
    axios.patch("http://localhost:8080/api/profile-update",editdata,{
      headers: {
        "Authorization": portalData.token
      }

    })
    .then((res)=>{
      // console.log(res.data);
      toast({
        title: res.data,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      window.location='/Dashboard'
    })
    .catch((err)=>{
      console.log(err);
    })
  }



return (
    <div>
        <div><PanCardNav /></div>
        <div className='profile_1'>
          <p> Email:- helpdigitalindiaportal@gmail.com</p>
          <p> Phones:- 9368372889</p>
          <p> Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</p>
        </div>
{/* profile details */}
<Heading size={'md'} textAlign={'center'} mb={'10px'}>YOUR PROFILE</Heading>
        <Box w={['90%','90%','60%']} m={'auto'} gap={'10px'} bg={'gray.100'} p={'25px'} borderRadius={'5px'} >{
          loading?<Box display={'flex'} justifyContent={'center'}><Spinner/> </Box>:
        
       
        profileData.map((el,i)=>{
          return <div key={i}>
            <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>vendorID: <Text fontWeight={'thin'} as={'span'}>{el.vendorID}</Text> </Heading>
            <Heading size={'sm'}  p={'15px'} borderBottom={'1px solid gray'}>Person Name: <Text fontWeight={'thin'} as={'span'}>{el.name}</Text> </Heading>
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
            <Box textAlign={'center'} mt={'10px'}>
              <Button colorScheme='yellow' size={'sm'} onClick={()=>handleEdit(el)}>Edit Profile</Button>
             
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
              <Input placeholder='Email address' name='email' value={editdata.email} onChange={handleChangeEdit}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Mobile Number</FormLabel>
              <Input placeholder='Mobile number' name='mobileNumber' value={editdata.mobileNumber} onChange={handleChangeEdit}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Shop Name</FormLabel>
              <Input placeholder='Shop Name' name='shopeName' value={editdata.shopeName} onChange={handleChangeEdit}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Upload your image</FormLabel>
              <Input type='file' name='avtar' onChange={handleChangeEdit} accept="image/*"/>
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