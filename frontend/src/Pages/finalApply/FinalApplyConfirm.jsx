import { Box, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const FinalApplyConfirm = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
  const { id } = useParams();
const [user,setUser]=useState([])


  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/final-confirm-apply/${id}`, {
        headers: {
          Authorization: portalData.token,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box>
        <Box>
            {
                user.map((el,i)=>{
                    return <Box>
                        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>vendorID: <Text fontWeight={'thin'} as={'span'}>{el.category.toUpperCase()}</Text> </Heading>

                        <Heading size={'sm'} p={'15px'} borderBottom={'1px solid gray'}>Apply Date: <Text fontWeight={'thin'} as={'span'}>{el.date}</Text> </Heading>
                    </Box>
                })
            }

        </Box>
    </Box>
  )
}

export default FinalApplyConfirm
