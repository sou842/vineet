import React, { useState } from 'react';
import './Dashboard.css'
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav'
import { DashboardFooter } from '../../Components/DashboradFooter/DashboradFooter';
import { useNavigate } from "react-router-dom"
import { Button, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
export const Dashboard = () => {
  const navigate = useNavigate()
  const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
  const toast = useToast()


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

  return (
    <div>
      <div>
        <DashboardNav />
      </div>
      <div className='dashboard_0'>
        <div>
          <div><a href="/Dashboard"><p>Dashboard</p></a></div>
          <div>
            <Menu >
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="#0a9cf8"
                margin={0}
              >
                Services
              </MenuButton>
              <MenuList color={"black"} >
                <MenuItem onClick={() => navigate('/PanCard')}>Pan Card</MenuItem>
                <MenuItem onClick={() => navigate('/ChangePassword')}>Electricity</MenuItem>
                <MenuItem onClick={() => navigate('/profile')}>Mobile Recharge</MenuItem>
                <MenuItem onClick={() => navigate('/profile')}>DTH Recharge</MenuItem>
                <MenuItem onClick={() => navigate('/profile')}>ITR</MenuItem>
                <MenuItem onClick={() => navigate('/profile')}>GST</MenuItem>
                <MenuItem onClick={() => navigate('/profile')}>Online Job Portal</MenuItem>

              </MenuList>
            </Menu>
          </div>
          <div><a href="#"><p>Traning Manual</p></a></div>
          <div><a href="#"><p>Downloads</p></a></div>
          <div><a href="#"><p>Ledger</p></a></div>
          <div><a href="#"><p>Add Money</p></a></div>
        </div>
        <div>
          <div><a href="#"><p>PCW: Rs.0</p></a></div>
          <div><a href="#"><p>OCW: Rs.0</p></a></div>
          <div>
            <Menu >
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="#0a9cf8"
              >
                {portalData.username.toUpperCase()}
              </MenuButton>
              <MenuList color={"black"} >
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/user/change-password')}>Change Password</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>

      <div>
        <div className='dashboard_1'>
          <p> Email:- helpdigitalindiaportal@gmail.com</p>
          <p> Phones:- 9368372889</p>
          <p> Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</p>
        </div>

        <div className='dashboard_2'>
          <div><a href="/PanCard">PAN CARD</a></div>
          <div><a href="#">Electricity</a></div>
          <div><a href="#">MOBILE Recharge</a></div>
          <div><a href="#">DTH Recharge</a></div>
          <div><a href="#">Income Tax Return</a></div>
          <div><a href="#">GST</a></div>
          <div><a href="#">DIGITAL JOB Portal</a></div>
          <div><a href="#">Social Services</a></div>
          <div><a href="#">NATIONAL PENSION SYSTEM</a></div>
        </div>
      </div>

      <div className='dashboard_1'>
        <p>हम आपसे अनुरोध करते हैं कि डिजिटल इंडिया पोर्टल द्वारा प्रदान की जा रही अन्य सुविधाएं जैसे बिजली बिल का भुगतान, मोबाइल रिचार्ज, डीटीएच रिचार्ज, GST रजिस्ट्रेशन, ITR फाइलिंग जैसी अन्य सुविधाओं का भी आप लाभ उठाएं और हम आपको भरोसा दिलाते हैं कि भविष्य में डिजिटल इंडिया पोर्टल आपको और भी सुविधाएं प्रदान करेगा डिजिटल इंडिया पोर्टल के साथ जुड़े रहने के लिए धन्यवाद</p>
      </div>

      <div><DashboardFooter /></div>
    </div>
  )
}
