import React, { useState } from 'react';
import './Dashboard.css'
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav'
import { Footer } from '../../Components/Footer/Footer';
import { Box } from '@chakra-ui/react';
import ContactUs from '../contact us with time/ContactUs';


export const Dashboard = () => {


  return (
    <div>
      <div>
        <DashboardNav />
      </div>
      <Box w={['90%','80%','65%']} m={'1cm auto'}>
        <ContactUs />
      </Box>

      <div>

        <div className='dashboard_2'>
          <div><a href="/PanCard"><p>Pan Card</p></a></div>
          <div><a href="#"><p>Electricity</p></a></div>
          <div><a href="/MobileRecharge"><p>Mobile Recharge</p></a></div>
          <div><a href="/DTHRecharge"><p>DTH Recharge</p></a></div>
          <div><a href="#"><p>Income Tax Return</p></a></div>
          <div><a href="#"><p>GST</p></a></div>
          <div><a href="#"><p>Digital Job Portal</p></a></div>
          <div><a href="#"><p>Social Services</p></a></div>
          <div><a href="#"><p>National Pension System</p></a></div>
        </div>
      </div>

      <div className='dashboard_1'>
        <p>आप सभी से सलाह दी जाती है कि स्मार्ट डिजिटल सर्विस पोर्टल ने अब तक किसी भी सेवा के लिए कोई शुल्क नहीं लिया है, और किसी भी सेवा के लिए कोई शुल्क नहीं लिया जा रहा है। स्मार्ट डिजिटल सर्विस पोर्टल आपको सूचित कर रहा है कि बाजार में स्मार्ट डिजिटल सर्विस पोर्टल के नाम पर कई लोग धोखाधड़ी कर रहे हैं। अनुरोध है कि आप किसी से भी किसी भी तरीके से कोई भी शुल्क न दें क्योंकि स्मार्ट डिजिटल सर्विस पोर्टल की सभी सेवाएं मुफ्त प्रदान की जा रही हैं। अगर कोई आपसे पैसे मांग रहा है, तो कृपया इसे ऊपर दिए गए नंबरों या ईमेल के माध्यम से रिपोर्ट करें, और इसे स्मार्ट डिजिटल सर्विस पोर्टल के साथ साझा करें।</p>
      </div>

      <div><Footer /></div>
    </div>
  )
}
