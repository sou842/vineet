import { Box, Button, FormControl, FormLabel, Heading, Image, Img, Input, Text, useToast,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ContactUs from '../contact us with time/ContactUs'
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UploadDocument = () => {

    const { id } = useParams()
    const toast = useToast()
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null;
    const navigate = useNavigate()
    const [pans, setPans] = useState([])
    const [loading, setLoading] = useState(false)
    const [isverify, setIsverify] = useState(false)
    const [upladDone, setUploadDone] = useState(false)
    const [birth, setBirth] = useState("")
    const [image, setImage] = useState({
        form49Front: "",
        form49Back: "",
        aadharDoc:"",
        isUpload:false,
        userid:""
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    

    const handleUpload = (e) => {
        if(e.target.files[0]){
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage({ ...image, [e.target.name]: reader.result })
            // console.log(reader.result);
        }
    }
    }

    const handelFinalUpload = (e) => {
        e.preventDefault()
       if(!isverify){
        onOpen()
       }
       else{
        setLoading(true)
            axios.post("http://localhost:8080/user/upload-pandocs",{...image,isUpload:true,userid:id},{
            headers: {
                "Authorization": portalData.token
            }
        })
        .then((res)=>{
            setLoading(false)
            toast({
                title: res.data,
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              //window.location="/user/applied-success"
             
        })
        .catch((err)=>{
            setLoading(false)
            console.log(err);
        })
       }
        
       
    }

const handelVerify=()=>{
    if(pans.yearOfBirth==birth){
        toast({
            title: 'Verifyed',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position:'top'
          })
          setIsverify(true)
          onClose()
    }
    else{
        toast({
            title: 'You Are Enter Wrong Year of Birth',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:'top'
          })
    }
}



   
   





    useEffect(() => {
        
        axios.get(`http://localhost:8080/user/upload-pan-card/${id}`, {
            headers: {
                "Authorization": portalData.token
            }

        }).then((res) => {
           
            setPans(res.data)
        }).catch((err) => {
           
            console.log(err);
        })

        axios.get(`http://localhost:8080/user/upload-pandocs/${id}`, {
            headers: {
                "Authorization": portalData.token
            }

        }).then((res) => {
            setUploadDone(res.data)
        }).catch((err) => { 
            console.log(err);
        })

    }, [])



    return (
        <Box>
            <Box>
                <PanCardNav />
            </Box>

            <Heading w={'80%'} m={'auto'} mt={'1cm'} mb={'1cm'} size={'md'} textAlign={'center'} border={'1px solid'} p={'7px'} borderRadius={'15px'} color={'white'} bg={'#3F51B5'}>Upload Documents Pan Card</Heading>

            <Box display={'flex'} p={'10px'} justifyContent={'space-between'} m={'auto'} mt={'50px'} mb={'1cm'} w={['97%', '70%', '60%']} >
                <Box fontSize={['13px', '14px', '15px']}>
                    <Text mt={'7px'} fontWeight={'bold'}>Applicant's Name</Text>
                    <Text mt={'7px'} fontWeight={'bold'}>Token Number</Text>
                    <Text mt={'7px'} fontWeight={'bold'}>Category of Applicant</Text>
                    <Text mt={'7px'} fontWeight={'bold'}>Apply Date</Text>
                </Box>
                <Box fontSize={['13px', '14px', '15px']}>
                    <Text mt={'7px'} color={'grey'}>{pans.firstName + " " + pans.middleName + " " + pans.lastName}</Text>
                    <Text mt={'7px'} color={'grey'}>{pans.tokenNumber}</Text>
                    <Text mt={'7px'} color={'grey'}>{pans.category}</Text>
                    <Text mt={'7px'} color={'grey'}>{pans.date}</Text>
                </Box>

            </Box>

<form onSubmit={handelFinalUpload}>
            <Box w={['85%', '93%', '90%', '80%']} display={'flex'} flexDirection={['column', 'column', 'row', 'row']} justifyContent={'space-between'} gap={'10px'} m={'20px  auto'}>
                <Box w={['90%', '55%', '30%', '27%']} m={'auto'}>
                <Box h={['250px', '300px', '250px', '300px']} display={'flex'} justifyContent={'center'} alignItems={'center'} w={'100%'} m={'auto'} mb={'15px'} border={'1px solid'} objectFit={'contain'}>
                        {image.form49Front == '' ?
                            <Image w={'25%'} src='https://cdn-icons-png.flaticon.com/128/7188/7188242.png' />
                            :
                            <Image src={image.form49Front || ""} alt='front' w={'100%'} h={'100%'} />
                        }
                    </Box>
                  
                        <FormControl>
                            <FormLabel textAlign={'center'}>Front Form 49A</FormLabel>
                            <Text textAlign={'center'} fontSize={'14px'} mb={'7px'} color={'grey'}>(Only 200DPI Color JPG)</Text>
                            <Input color={'grey'} p={'3.5px'} type='file' name='form49Front' onChange={handleUpload} required accept="image/*" />
                        </FormControl>
                  
                </Box>

                <Box w={['90%', '55%', '30%', '27%']} m={'auto'}>
                    <Box h={['250px', '300px', '250px', '300px']} display={'flex'} justifyContent={'center'} alignItems={'center'} w={'100%'} m={'auto'} mb={'15px'} border={'1px solid'} objectFit={'contain'}>
                        {image.form49Back == '' ?
                            <Image w={'25%'} src='https://cdn-icons-png.flaticon.com/128/7188/7188242.png' />
                            :
                            <Image src={image.form49Back || ""} alt='back' w={'100%'} h={'100%'} />}
                    </Box>
                  
                        <FormControl>
                            <FormLabel textAlign={'center'} >Back Form 49A</FormLabel>
                            <Text textAlign={'center'} fontSize={'14px'} mb={'7px'} color={'grey'}>(Only 200DPI Color JPG)</Text>
                            <Input color={'grey'} p={'3.5px'} type='file' name='form49Back' required onChange={handleUpload} accept="image/*" />
                        </FormControl>
                    
                </Box>

                <Box w={['90%', '55%', '30%', '27%']} m={'auto'}>
                <Box h={['250px', '300px', '250px', '300px']} display={'flex'} justifyContent={'center'} alignItems={'center'} w={'100%'} m={'auto'} mb={'15px'} border={'1px solid'} objectFit={'contain'}>
                        {image.aadharDoc == '' ?
                            <Image w={'25%'} src='https://cdn-icons-png.flaticon.com/128/7188/7188242.png' />
                            :
                            <Image src={image.aadharDoc || ""} alt='aadhar' w={'100%'} h={'100%'} />
                            }                       
                    </Box>
                   
                        <FormControl>
                            <FormLabel textAlign={'center'} >Aadhar Card</FormLabel>
                            <Text textAlign={'center'} fontSize={'14px'} mb={'7px'} color={'grey'}>(Only 200DPI Color JPG)</Text>
                            <Input color={'grey'} p={'3.5px'} type='file' name='aadharDoc' required onChange={handleUpload} accept="image/*" />
                        </FormControl>
                   
                </Box>
            </Box>

            <Button w={'70%'} h={'45px'} display={'block'} m={'auto'} mt={'1cm'} mb={'1.5cm'} colorScheme={'green'} size={'sm'} letterSpacing={'5px'} type='submit' title={upladDone.isUpload?"You already upload document":"Upload"}  isDisabled={upladDone.isUpload}>{isverify ?"UPLOAD":"NEXT"}</Button>
            </form>




            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify Your DOB</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
           <FormLabel>Year of Birth</FormLabel>
           <Input type='number'  placeholder='Enter Year Of Birth For Verify' onChange={(e)=>setBirth(e.target.value)}/>
            </FormControl>
          </ModalBody>

          <ModalFooter bg={'white'}>
            <Button colorScheme={'blackAlpha'} mr={3} onClick={onClose} size={'sm'}>
              Close
            </Button>
            <Button colorScheme='green' size={'sm'} isDisabled={isverify} onClick={handelVerify} >{isverify?"Verifyed":"Verify"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

        </Box>
    )
}

export default UploadDocument
