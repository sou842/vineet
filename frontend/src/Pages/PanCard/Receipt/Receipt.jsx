import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  Thead,
  Spinner,
  Text,
  Button,
  Grid,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PanCardNav } from "../../../Components/PanCardNav/PanCardNav";
import { Footer } from "../../../Components/Footer/Footer.jsx";
import { Navigate } from "react-router-dom";

const Receipt = () => {
  //     ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  const baseURL = process.env.REACT_APP_BASE_URL
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
  const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
  const [pdfData, setPdfData] = useState({ PDF: "", panID: "" });
  const [cat, setCat] = useState("newPancard");
  const [loading, setLoading] = useState();
  const [pans, setPans] = useState([]);
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const handelOpenRecipt = (id) => {


    axios.get(`${baseURL}/user/recipt-download/${id}`, {
        headers: { Authorization: portalData.token },
      })
      .then((res) => {

        window.open(`${baseURL}/${res.data || "receiptPdf_1692902532435List.pdf"}`, "_blank")

      })
      .catch((err) => {
        toast({ title: "Try Again, Something Wrong!!!", status: "error", duration: 4000, isClosable: true, position: "top", });
        console.log(err);
      });
  }

  useEffect(() => {
    axios.get(`${baseURL}/user/all-uploaded-pan-card?category=${cat}&page=${page}`, {
      headers: { Authorization: portalData.token, },
    })
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        setPans(res.data.data);
        setCount(res.data.count);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [cat, page]);

  return (
    <Box>
      <Box>
        <PanCardNav />
      </Box>

      <Box w={"85%"} m={"0.5cm auto 0 auto"}>
        <Box w={"230px"}>
          <select
            onChange={(e) => {
              setCat(e.target.value);
              setPage(1);
            }}
            style={{ borderRadius: "20px", padding: "7px", color: "grey" }}
          >
            <option value="newPancard">NEW PANCARD</option>
            <option value="updatePancard">UPDATE PANCARD</option>
          </select>
        </Box>
      </Box>

      <Box
        w={"100%"}
        minH={"60vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {loading ? (
          <Box display={"flex"} justifyContent={"center"} mt={"2cm"} mb={"2cm"}>
            <Spinner color="#00aeff" />
          </Box>
        ) : (
          <Box w={"90%"}>
            {pans.length == 0 ? (
              <Box textAlign={"center"}>NO DATA FOUND</Box>
            ) : null}

            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap={["10px", "15px"]}
              w={"95%"}
              m={"0 auto 1cm auto"}
            >
              {pans?.map((ele, index) => (
                <Box
                  key={index}
                  border={"1.5px solid #00aeff"}
                  borderRadius={"15px"}
                  pt={"10px"}
                  pb={"10px"}
                >
                  <Box
                    textAlign={"center"}
                    fontWeight={"bold"}
                    p={"7px"}
                    color={"whiteAlpha.900"}
                    bg={"#00aeff"}
                    w={"100%"}
                    m={"auto"}
                    mt={"10px"}
                    mb={"15px"}
                  >
                    {ele.category.toUpperCase()}
                  </Box>
                  <Box w={"90%"} m={"auto"}>
                    {ele.category == "Individual" ? (
                      <Text
                        mt={"7px"}
                        mb={"7px"}
                        display={"flex"}
                        fontWeight={"bold"}
                      >
                        Name:
                        <Text fontWeight={"normal"} ml={"10px"}>
                          {ele.firstName +
                            " " +
                            ele.middleName +
                            " " +
                            ele.lastName}
                        </Text>
                      </Text>
                    ) : (
                      <Text
                        mt={"7px"}
                        mb={"7px"}
                        display={"flex"}
                        fontWeight={"bold"}
                      >
                        Organization:
                        <Text fontWeight={"normal"} ml={"10px"}>
                          {ele.organization}
                        </Text>
                      </Text>
                    )}{" "}
                    <Text
                      mb={"7px"}
                      mt={"7px"}
                      display={"flex"}
                      fontWeight={"bold"}
                    >
                      Token :{" "}
                      <Text fontWeight={"normal"} color={"#616161"} ml={"4px"}>
                        {ele.tokenNumber ? ele.tokenNumber : "null"}
                      </Text>
                    </Text>
                    <Text
                      mb={"7px"}
                      mt={"7px"}
                      display={"flex"}
                      fontWeight={"bold"}
                    >
                      Apply date :{" "}
                      <Text fontWeight={"normal"} color={"#616161"} ml={"4px"}>
                        {ele.date}
                      </Text>
                    </Text>
                    <Text
                      mb={"7px"}
                      mt={"7px"}
                      display={"flex"}
                      fontWeight={"bold"}
                    >
                      Acknowledgement :{" "}
                      <Text fontWeight={"normal"} color={"#616161"} ml={"4px"}>
                        {ele.acknowledgement ? ele.acknowledgement : "null"}
                      </Text>
                    </Text>

                    <Text
                      mb={"7px"}
                      mt={"7px"}
                      display={"flex"}
                      fontWeight={"bold"}
                    >
                      Slip Generate Date :{" "}
                      <Text fontWeight={"normal"} color={"#616161"} ml={"4px"}>
                        {ele.slipGenerateDate ? ele.slipGenerateDate : "null"}
                      </Text>
                    </Text>
                    <Text
                      mb={"7px"}
                      mt={"7px"}
                      display={"flex"}
                      fontWeight={"bold"}
                    >
                      Pan Status :{" "}
                      <Text fontWeight={"normal"} color={"#616161"} ml={"4px"}>
                        {ele.panStatus}
                      </Text>
                    </Text>
                  </Box>
                  <Box>{

                    ele.panStatus == "completed" || ele.panStatus == "rejected" ?
                      <Box textAlign={'center'}>
                        <Button w={'95%'} colorScheme={ele.panStatus == "completed" ? "green" : "red"} size={'sm'} onClick={(e) => handelOpenRecipt(ele._id)}>Download</Button>
                      </Box>
                      : null
                  }</Box>

                </Box>
              ))}
            </Grid>
          </Box>
        )}
      </Box>


      <Box textAlign={"right"} m={"10px"}>
        {count != 0 ? (
          <Box>
            <Button
              size={"sm"}
              onClick={(e) => setPage(page - 1)}
              isDisabled={page == 1}
              mr={"5px"}
              colorScheme={"blue"}
            >
              ⟨
            </Button>
            <Button size={"sm"} mr={"5px"}>{page}</Button>
            <Button size={"sm"} colorScheme="blue" onClick={(e) => setPage(page + 1)} isDisabled={page == Math.ceil(count / 10) || count == 0}>
              ⟩
            </Button>
          </Box>
        ) : null}
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Receipt;

// isLoading loadingText="Loading..."
