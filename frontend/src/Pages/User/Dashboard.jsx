import React from 'react';
import './Dashboard.css'
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav'

export const Dashboard = () => {
  return (
    <div>
      <div>
        <DashboardNav />
      </div>
      <div className='dashboard_1'>
        <div>
          <div><a href="#"><p>Dashboard</p></a></div>
          <div>
          <select>
            <option value=""><a href="#">Services</a></option>  
            <option value=""><a href="#">Pan Card</a></option>  
            <option value=""><a href="#">Electricity</a></option>
            <option value=""><a href="#">Mobile Recharge</a></option>  
            <option value=""><a href="#">DTH Recharge</a></option>  
            <option value=""><a href="#">ITR</a></option>  
            <option value=""><a href="#">GST</a></option>  
            <option value=""><a href="#">Online Job Portal</a></option>  
          </select>  
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
        <select>
            <option value=""><a href="#">Profile</a></option>  
            <option value=""><a href="#">Change Password</a></option>  
            <option value=""><a href="#">Logout</a></option>
          </select>  
        </div>
        </div>
      </div>
    </div>
  )
}
