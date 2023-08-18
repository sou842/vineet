import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Img,
  Input,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ContactUs from "../contact us with time/ContactUs";
import { PanCardNav } from "../../Components/PanCardNav/PanCardNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UploadDocument = () => {
  const { id } = useParams();
  const toast = useToast();
  const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pans, setPans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("");
  const [upladDone, setUploadDone] = useState(false);
  const [image, setImage] = useState({
    form49Front: null,
    form49Back: null,
    aadharDoc: null,
    parentAadharDoc: null
    
  });
  const [formData, setFormdata] = useState(null);



  const handleUpload = (e) => {
    if (e.target.files[0]) {

      setImage({ ...image, [e.target.name]:e.target.files[0]});

      // let reader = new FileReader();
      // reader.readAsDataURL(e.target.files[0]);
      // reader.onload = () => {
      //   console.log(reader.result);

      // };
    }
    
  };

  const handelFinalUpload = (e) => {
    e.preventDefault();
    if(pans.ageOfTheUser<18 && image.aadharDoc != "" &&image.form49Back != "" &&image.form49Front != "" &&image.parentAadharDoc!=""){
        onOpen();
    }
    else if (pans.ageOfTheUser>=18 && image.aadharDoc != "" &&image.form49Back != "" &&image.form49Front != "") {
      onOpen();
    }
    else {
      toast({
        title: "Please choose all documents",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

// const handelUploadTemp=()=>{
//   const imageData = new FormData();
//   for (const fieldName in image) {
//     if (image[fieldName]) {
//       // console.log(fieldName);
//       imageData.append(fieldName, image[fieldName]);
//     }
// }
// imageData.append('panid',id)
// imageData.append('receiptPdf',"")
// // console.log(imageData,"93");
// setFormdata(imageData)
// }





  //handelConfirmUpload
  
  
  const handelConfirmUpload = () => {
    if (year != pans.yearOfBirth || year == "") {
      toast({
        title: "You Are Enter wrong year of birth",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      setLoading(true);
      const formData = new FormData();
      for (const fieldName in image) {
        if (image[fieldName]) {
          // console.log(fieldName);
          formData.append(fieldName, image[fieldName]);
        }
    }
    formData.append('panid',id)
    formData.append('receiptPdf',"")
    formData.append('vendorID',pans.vendorID)
    // console.log(imageData,"93");
    







      
      axios
        .post(
          "http://localhost:8080/user/upload-pandocs",
          formData,
          {
            headers: {
              Authorization: portalData.token,
            },
          }
        )
        .then((res) => {
          setLoading(false);

          toast({
            title: res.data,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          onClose();
          navigate("/user/applied-success");
        })
        .catch((err) => {
          setLoading(false);
          toast({
            title: "Please Try Again",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/upload-pan-card/${id}`, {
        headers: {
          Authorization: portalData.token,
        },
      })
      .then((res) => {
        setPans(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios.get(`http://localhost:8080/user/upload-pandocs/${id}`, {
    //     headers: {
    //         "Authorization": portalData.token
    //     }

    // }).then((res) => {
    //     setUploadDone(res.data)
    // }).catch((err) => {
    //     console.log(err);
    // })
  }, []);

  return (
    <Box>
      <Box>
        <PanCardNav />
      </Box>

      <Heading
        w={"80%"}
        m={"auto"}
        mt={"1cm"}
        mb={"1cm"}
        size={"md"}
        textAlign={"center"}
        border={"1px solid"}
        p={"7px"}
        borderRadius={"15px"}
        color={"white"}
        bg={"#3F51B5"}
      >
        Upload Documents Pan Card
      </Heading>

      <Box
        display={"flex"}
        p={"10px"}
        justifyContent={"space-between"}
        m={"auto"}
        mt={"50px"}
        mb={"1cm"}
        w={["97%", "70%", "60%"]}
      >
        <Box fontSize={["13px", "14px", "15px"]}>
          <Text mt={"7px"} fontWeight={"bold"}>
            Applicant's Name
          </Text>
          <Text mt={"7px"} fontWeight={"bold"}>
            Token Number
          </Text>
          <Text mt={"7px"} fontWeight={"bold"}>
            Category of Applicant
          </Text>
          <Text mt={"7px"} fontWeight={"bold"}>
            Apply Date
          </Text>
        </Box>
        <Box fontSize={["13px", "14px", "15px"]}>
          <Text mt={"7px"} color={"grey"}>
            {pans.firstName + " " + pans.middleName + " " + pans.lastName}
          </Text>
          <Text mt={"7px"} color={"grey"}>
            {pans.tokenNumber}
          </Text>
          <Text mt={"7px"} color={"grey"}>
            {pans.category}
          </Text>
          <Text mt={"7px"} color={"grey"}>
            {pans.date}
          </Text>
        </Box>
      </Box>

      <form onSubmit={handelFinalUpload}>
        <Box
          w={["85%", "93%", "90%", "80%"]}
          display={"flex"}
          flexDirection={["column", "column", "row", "row"]}
          justifyContent={"space-between"}
          gap={"10px"}
          m={"20px  auto"}
        >
          <Box w={["90%", "55%", "30%", "27%"]} m={"auto"}>
            <Box
              h={["250px", "300px", "250px", "300px"]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              m={"auto"}
              mb={"15px"}
              border={"1px solid"}
              objectFit={"contain"}
            >
              {image.form49Front == "" ? (
                <Image
                  w={"25%"}
                  src="https://cdn-icons-png.flaticon.com/128/7188/7188242.png"
                />
              ) : (
                <Image
                  src={image.form49Front || ""}
                  alt="front"
                  w={"100%"}
                  h={"100%"}
                />
              )}
            </Box>

            <FormControl>
              <FormLabel textAlign={"center"}>Front Form 49A</FormLabel>
              <Text
                textAlign={"center"}
                fontSize={"14px"}
                mb={"7px"}
                color={"grey"}
              >
                (Only 200DPI Color JPG)
              </Text>
              <Input
                color={"grey"}
                p={"3.5px"}
                type="file"
                name="form49Front"
                onChange={handleUpload}
                accept="image/*"
              />
            </FormControl>
          </Box>

          <Box w={["90%", "55%", "30%", "27%"]} m={"auto"}>
            <Box
              h={["250px", "300px", "250px", "300px"]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              m={"auto"}
              mb={"15px"}
              border={"1px solid"}
              objectFit={"contain"}
            >
              {image.form49Back == "" ? (
                <Image
                  w={"25%"}
                  src="https://cdn-icons-png.flaticon.com/128/7188/7188242.png"
                />
              ) : (
                <Image
                  src={image.form49Back || ""}
                  alt="back"
                  w={"100%"}
                  h={"100%"}
                />
              )}
            </Box>

            <FormControl>
              <FormLabel textAlign={"center"}>Back Form 49A</FormLabel>
              <Text
                textAlign={"center"}
                fontSize={"14px"}
                mb={"7px"}
                color={"grey"}
              >
                (Only 200DPI Color JPG)
              </Text>
              <Input
                color={"grey"}
                p={"3.5px"}
                type="file"
                name="form49Back"
                onChange={handleUpload}
                accept="image/*"
              />
            </FormControl>
          </Box>

          <Box w={["90%", "55%", "30%", "27%"]} m={"auto"}>
            <Box
              h={["250px", "300px", "250px", "300px"]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              m={"auto"}
              mb={"15px"}
              border={"1px solid"}
              objectFit={"contain"}
            >
              {image.aadharDoc == "" ? (
                <Image
                  w={"25%"}
                  src="https://cdn-icons-png.flaticon.com/128/7188/7188242.png"
                />
              ) : (
                <Image
                  src={image.aadharDoc || ""}
                  alt="aadhar"
                  w={"100%"}
                  h={"100%"}
                />
              )}
            </Box>

            <FormControl>
              <FormLabel textAlign={"center"}>Aadhar Card</FormLabel>
              <Text
                textAlign={"center"}
                fontSize={"14px"}
                mb={"7px"}
                color={"grey"}
              >
                (Only 200DPI Color JPG)
              </Text>
              <Input
                color={"grey"}
                p={"3.5px"}
                type="file"
                name="aadharDoc"
                onChange={handleUpload}
                accept="image/*"
              />
            </FormControl>
          </Box>
          {
            
             pans.ageOfTheUser<18?<Box w={["90%", "55%", "30%", "27%"]} m={"auto"}>
             <Box
               h={["250px", "300px", "250px", "300px"]}
               display={"flex"}
               justifyContent={"center"}
               alignItems={"center"}
               w={"100%"}
               m={"auto"}
               mb={"15px"}
               border={"1px solid"}
               objectFit={"contain"}
             >
               {image.parentAadharDoc == "" ? (
                 <Image
                   w={"25%"}
                   src="https://cdn-icons-png.flaticon.com/128/7188/7188242.png"
                 />
               ) : (
                 <Image
                   src={image.parentAadharDoc || ""}
                   alt="parentAadharDoc"
                   w={"100%"}
                   h={"100%"}
                 />
               )}
             </Box>
 
             <FormControl>
               <FormLabel textAlign={"center"}>Parent Aadhar Card</FormLabel>
               <Text
                 textAlign={"center"}
                 fontSize={"14px"}
                 mb={"7px"}
                 color={"grey"}
               >
                 (Only 200DPI Color JPG)
               </Text>
               <Input
                 color={"grey"}
                 p={"3.5px"}
                 type="file"
                 name="parentAadharDoc"
                 onChange={handleUpload}
                 accept="image/*"
               />
             </FormControl>
           </Box>:""
          }
        </Box>

        <Button
          w={"70%"}
          h={"45px"}
          display={"block"}
          m={"auto"}
          mt={"1cm"}
          mb={"1.5cm"}
          colorScheme={"green"}
          size={"sm"}
          letterSpacing={"5px"}
          type="submit"
          title={upladDone.isUpload ? "You already upload document" : "Upload"}
        >
          NEXT
        </Button>
      </form>
      {/* <button onClick={handelUploadTemp}>upload</button> */}

      {/* dateof birth confirmation */}
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Year of Birth for Confirm</FormLabel>
              <Input
                type="number"
                placeholder="Enter Year of Birth"
                onChange={(e) => setYear(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter bg={"white"}>
            <Button
              colorScheme={"blackAlpha"}
              mr={3}
              onClick={onClose}
              size={"sm"}
            >
              Close
            </Button>
            <Button
              size={"sm"}
              colorScheme="green"
              onClick={handelConfirmUpload}
            >
              {loading ? "Loading..." : "Confirm and Upload"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UploadDocument;
