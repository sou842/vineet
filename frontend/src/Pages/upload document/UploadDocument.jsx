import { Box, Button, FormControl, FormLabel, Heading, Image, Img, Input, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ContactUs from '../contact us with time/ContactUs'
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UploadDocument = () => {

const {id}=useParams()
const toast=useToast()
    const portalData=JSON.parse(localStorage.getItem('digitalPortal'))||null;
    const navigate=useNavigate()
    const [pans,setPans]=useState([])
    const [loading,setLoading]=useState(false)
const [uploadDocumentFront,setUploadDocumentFront]=useState(null)
const [uploadDocumentBack,setUploadDocumentBack]=useState(null)
const [uploadDocumentAadhar,setUploadDocumentAadhar]=useState(null)
const [buttonCondition,setButtonCondition]=useState(0)
const [image,setImage]=useState({
    frontForm:"",
    backForm:"",
    aadharCardDocs:""
})

// const handleUploadFront=(e)=>{
//     e.preventDefault()
//     const formData=new FormData()
//     formData.append('file',uploadDocumentFront)
//    axios.patch(`http://localhost:8080/user/upload-pan-document/${id}`,formData,{
//     headers: {
//         "Authorization": portalData.token
//       }
//    })
//    .then((res)=>{
//     setButtonCondition(buttonCondition+1)
//     toast({
//         title: 'Form Front Upload Successfully',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       })
//    }).catch((err)=>{
//     console.log(err);
//    })
// }

const handleUpload=(e)=>{
    let reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
        setImage({...image,[e.target.name]:reader.result})
        console.log(reader.result);
       
    }
}

const handelFinalUpload=()=>{
    axios.patch(`http://localhost:8080/user/upload-pan-document/${id}`,image,{
        headers: {
            "Authorization": portalData.token
          }
       })
       .then((res)=>{
        if(res.data=="Document upload succesfull"){
        toast({
            title: res.data,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          navigate(`/user/final-confirm-apply/${id}`)
        }
        else{
            toast({
                title: "Somthing went wrong!",
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
       }).catch((err)=>{
        console.log(err);
       })
}





const handleUploadBack=(e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.append('file',uploadDocumentBack)
    console.log(formData);
   axios.patch(`http://localhost:8080/user/upload-pan-document/${id}`,formData,{
    headers: {
        "Authorization": portalData.token
      }
   })
   .then((res)=>{
    setButtonCondition(buttonCondition+1)
    toast({
        title: 'Form Back Upload Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
   }).catch((err)=>{
    console.log(err);
   })
}
const handleUploadAadharCard=(e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.append('file',uploadDocumentAadhar)
    console.log(formData);
   axios.patch(`http://localhost:8080/user/upload-pan-document/${id}`,formData,{
    headers: {
        "Authorization": portalData.token
      }
   })
   .then((res)=>{
    setButtonCondition(buttonCondition+1)
    toast({
        title: 'Aadhar Upload Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
   }).catch((err)=>{
    console.log(err);
   })
}





    useEffect(()=>{
        setLoading(true)
        axios.get(`http://localhost:8080/user/upload-pan-card/${id}`,{
            headers: {
                "Authorization": portalData.token
              }
        
        }).then((res)=>{
            setLoading(false)
            setPans(res.data)
        }).catch((err)=>{
            setLoading(false)
            console.log(err);
        })

    },[])



  return (
   <Box>
    <Box>
        <PanCardNav/>
    </Box>
    {/* <Box mt={'20px'}>
        <ContactUs/>
    </Box> */}


    <Box w={'80%'} m={'auto'} mt={'20px'}>
<Heading size={'md'} textAlign={'center'} border={'1px solid'} p={'5px'} borderRadius={'15px'} color={'white'} bg={'#3F51B5'}>Upload Documents Pan Card</Heading>
<Box mt={'50px'}>
<Box display={'flex'} p={'5px'}   justifyContent={'space-around'}>
    <Heading size={'sm'}>Token Number</Heading>
    <Text>{pans.tokenNumber}</Text>
</Box>
<Box display={'flex'} p={'5px'}  justifyContent={'space-around'}>
    <Heading size={'sm'}>Category of Applicant</Heading>
    <Text>{pans.category}</Text>
</Box>
<Box display={'flex'} p={'5px'}  justifyContent={'space-around'}>
    <Heading size={'sm'}>Apply Date</Heading>
    <Text>{pans.date}</Text>
</Box>
<Box display={'flex'} p={'5px'}  justifyContent={'space-around'}>
    <Heading size={'sm'}>Applicant's Name</Heading>
    <Text>{pans.firstName+" "+pans.middleName+" "+pans.lastName}</Text>
</Box>
</Box>
    </Box>

    <Box display={'flex'} justifyContent={'space-around'} gap={'10px'} w={'90%'} m={'20px  auto'}>
        <Box>
            <form>
       <FormControl>
        <FormLabel>Front Form 49A(Only 200DPI Color JPG)</FormLabel>
        <Input type='file' name='frontForm' onChange={handleUpload} required accept="image/*"/>
       </FormControl>
       </form>
       </Box>
       
<Box>
    <form>
       <FormControl>
        <FormLabel>Back Form 49A(Only 200DPI Color JPG)</FormLabel>
        <Input type='file'  name='backForm' required onChange={handleUpload} accept="image/*" />
       </FormControl>
       </form>
       </Box>
       
       <Box>
        <form onSubmit={handleUploadAadharCard}>
       <FormControl>
        <FormLabel>Aadhar Card(Only 200DPI Color JPG)</FormLabel>
        <Input type='file'  name='aadharCardDocs' required onChange={handleUpload} accept="image/*"/>
       </FormControl>
       </form>
       </Box>
    </Box>
<Button colorScheme={'green'} size={'sm'} letterSpacing={'5px'} onClick={handelFinalUpload}>UPLOAD</Button>
   
   
       <Box display={'flex'} justifyContent={'space-around'} mt={'20px'}>
        <Box h={'50px'} w={'20%'} border={'1px solid'} objectFit={'contain'}>
       <Img src={image.frontForm||""} alt='front' w={'100%'} />
        </Box>
        <Box h={'100px'} w={'20%'}  border={'1px solid'}>
        <Image src={image.backForm||""} alt='back'/>
        </Box>
        <Box h={'200px'} w={'20%'} border={'1px solid'}>
        <Image src={image.aadharCardDocs||""} alt='aadhar'/>
        </Box>
       
        
       </Box>


   </Box>
  )
}

export default UploadDocument
