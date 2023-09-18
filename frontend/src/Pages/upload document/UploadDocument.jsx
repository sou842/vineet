import { Box, Button, FormControl, FormLabel, Heading, Image, Img, Input, Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Grid, } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PanCardNav } from "../../Components/PanCardNav/PanCardNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UploadDocument = () => {
  const baseURL = process.env.REACT_APP_BASE_URL
  const { props } = useParams();
  const category = props.split('-')[0]
  const id = props.split('-')[1]
  const toast = useToast();
  const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pans, setPans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("");
  const [upladDone, setUploadDone] = useState(false);
  const [image, setImage] = useState({
    form49Front: "",
    form49Back: "",
    aadharDoc: "",
    parentAadharDoc: ""

  });

  // console.log(image)


  const handleUpload = (e) => {

    if (e.target.files[0]) {
      setImage({ ...image, [e.target.name]: e.target.files[0] });
    }
    console.log(image)

  };

  const handelFinalUpload = (e) => {
    e.preventDefault();
    if (pans.ageOfTheUser < 18 && image.aadharDoc != "" && image.form49Back != "" && image.form49Front != "" && image.parentAadharDoc != "") {
      onOpen();
    }
    else if (pans.ageOfTheUser >= 18 && image.aadharDoc != "" && image.form49Back != "" && image.form49Front != "") {
      onOpen();
    }
    else {
      toast({ title: "Please choose all documents", status: "error", duration: 3000, isClosable: true, position: "top", });
    }
  };

  const handelConfirmUpload = () => {

    if (year != pans.yearOfBirth || year == "") {
      toast({ title: "You Are Enter wrong year of birth", status: "error", duration: 3000, isClosable: true, position: "top", });
    } else {
      setLoading(true);
      const formData = new FormData();
      for (const fieldName in image) {
        if (image[fieldName]) {
          // console.log(fieldName);
          formData.append(fieldName, image[fieldName]);
        }
      }
      formData.append('panid', id)
      formData.append('receiptPdf', "")
      formData.append('vendorID', pans.vendorID)
      // console.log(imageData,"93");


      axios.post(`${baseURL}/user/upload-pandocs`, formData, {
        headers: { Authorization: portalData.token },
      })
        .then((res) => {
          setLoading(false);
          toast({ title: res.data, status: "success", duration: 3000, isClosable: true, });
          onClose()
          navigate("/user/applied-success");
        })
        .catch((err) => {
          setLoading(false);
          toast({ title: "Please Try Again", status: "error", duration: 3000, isClosable: true, })
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    axios.get(`${baseURL}/user/upload-pan-card?category=${category}&id=${id}`, {
      headers: {
        Authorization: portalData.token,
      },
    })
      .then((res) => {
        setPans(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);

  return (
    <Box>
      <Box>
        <PanCardNav />
      </Box>

      <Heading w={"80%"} m={"auto"} mt={"1cm"} mb={"1cm"} size={"md"} textAlign={"center"} border={"1px solid"} p={"7px"} borderRadius={"15px"} color={"white"} bg={"#3F51B5"}      >
        Upload Documents Pan Card
      </Heading>

      <Box display={"flex"} p={"10px"} justifyContent={"space-between"} m={"auto"} mt={"50px"} mb={"1cm"} w={["85%", "93%", "90%", "75%"]}      >
        <Box fontSize={["13px", "14px", "15px"]}>
          <Text mt={"7px"} fontWeight={"bold"}>Applicant's Name</Text>
          <Text mt={"7px"} fontWeight={"bold"}>Token Number</Text>
          <Text mt={"7px"} fontWeight={"bold"}>Category of Applicant</Text>
          <Text mt={"7px"} fontWeight={"bold"}>Apply Date</Text>
        </Box>
        <Box fontSize={["13px", "14px", "15px"]}>
          <Text mt={"7px"} color={"grey"}>{pans.firstName + " " + pans.middleName + " " + pans.lastName}</Text>
          <Text mt={"7px"} color={"grey"}>{pans.tokenNumber}</Text>
          <Text mt={"7px"} color={"grey"}>{pans.category}</Text>
          <Text mt={"7px"} color={"grey"}>{pans.date}</Text>
        </Box>
      </Box>

      <form onSubmit={handelFinalUpload}>
        <Grid w={["85%", "93%", "90%", "80%"]} templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)', 'repeat(2, 1fr)','repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={"10px"} m={"20px  auto"}>

          <Box m={"0.5cm auto"}>
            <FormControl>
              <Box display={'flex'}>
                <FormLabel textAlign={"center"} fontSize={'14px'}>Front Form 49A</FormLabel>
                <Text textAlign={"center"} fontSize={"13px"} mb={"7px"} color={"grey"}>(Only 200DPI Color JPG)</Text>
              </Box>
              <Input color={"grey"} p={"3.5px"} type="file" name="form49Front" onChange={handleUpload} accept="image/*" />
            </FormControl>
          </Box>

          <Box m={"0.5cm auto"}>
            <FormControl>
              <Box display={'flex'}>
                <FormLabel textAlign={"center"} fontSize={'14px'}>Back Form 49A</FormLabel>
                <Text textAlign={"center"} fontSize={"13px"} mb={"7px"} color={"grey"}>(Only 200DPI Color JPG)</Text>
              </Box>
              <Input color={"grey"} p={"3.5px"} type="file" name="form49Back" onChange={handleUpload} accept="image/*" />
            </FormControl>
          </Box>

          <Box m={"0.5cm auto"}>
            <FormControl>
              <Box display={'flex'}>
                <FormLabel textAlign={"center"} fontSize={'14px'}>Aadhar Card</FormLabel>
                <Text textAlign={"center"} fontSize={"13px"} mb={"7px"} color={"grey"}>(Only 200DPI Color JPG)</Text>
              </Box>
              <Input color={"grey"} p={"3.5px"} type="file" name="aadharDoc" onChange={handleUpload} accept="image/*" />
            </FormControl>
          </Box>

          {pans.ageOfTheUser < 18 ? <Box m={"0.5cm auto"}>
            <FormControl>
              <Box display={'flex'}>
                <FormLabel textAlign={"center"} fontSize={'14px'}>Parent Aadhar Card</FormLabel>
                <Text textAlign={"center"} fontSize={"13px"} mb={"7px"} color={"grey"}>(Only 200DPI Color JPG)</Text>
              </Box>
              <Input color={"grey"} p={"3.5px"} type="file" name="parentAadharDoc" onChange={handleUpload} accept="image/*" />
            </FormControl>
          </Box> : ""
          }
        </Grid>

        <Button w={['80%', '60%', "40%"]} h={"45px"} display={"block"} m={"auto"} mt={"1cm"} mb={"1.5cm"} colorScheme={"green"} size={"sm"} letterSpacing={"5px"} type="submit" title={upladDone.isUpload ? "You already upload document" : "Upload"}>NEXT</Button>
      </form>

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
            <Button colorScheme={"blackAlpha"} mr={3} onClick={onClose} size={"sm"} >Close</Button>
            <Button size={"sm"} colorScheme="green" onClick={handelConfirmUpload}>{loading ? "Loading..." : "Confirm and Upload"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UploadDocument;
