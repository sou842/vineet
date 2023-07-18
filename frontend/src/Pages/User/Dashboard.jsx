import React, { useState } from 'react';
import './Dashboard.css'
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav'
import { Footer } from '../../Components/Footer/Footer';


export const Dashboard = () => {


  return (
    <div>
      <div>
        <DashboardNav />
      </div>


      <div>
        <div className='dashboard_1'>
          <p> Email:- helpdigitalindiaportal@gmail.com</p>
          <p> Phones:- 9368372889</p>
          <p> Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</p>
        </div>

        <div className='dashboard_2'>
          <div><a href="/PanCard"><p>Pan Card</p></a></div>
          <div><a href="#"><p>Electricity</p></a></div>
          <div><a href="#"><p>Mobile Recharge</p></a></div>
          <div><a href="#"><p>DTH Recharge</p></a></div>
          <div><a href="#"><p>Income Tax Return</p></a></div>
          <div><a href="#"><p>GST</p></a></div>
          <div><a href="#"><p>Digital Job Portal</p></a></div>
          <div><a href="#"><p>Social Services</p></a></div>
          <div><a href="#"><p>National Pension System</p></a></div>
        </div>
      </div>

      <div className='dashboard_1'>
        <p>हम आपसे अनुरोध करते हैं कि डिजिटल इंडिया पोर्टल द्वारा प्रदान की जा रही अन्य सुविधाएं जैसे बिजली बिल का भुगतान, मोबाइल रिचार्ज, डीटीएच रिचार्ज, GST रजिस्ट्रेशन, ITR फाइलिंग जैसी अन्य सुविधाओं का भी आप लाभ उठाएं और हम आपको भरोसा दिलाते हैं कि भविष्य में डिजिटल इंडिया पोर्टल आपको और भी सुविधाएं प्रदान करेगा डिजिटल इंडिया पोर्टल के साथ जुड़े रहने के लिए धन्यवाद</p>
      </div>

      <div><Footer /></div>
    </div>
  )
}
