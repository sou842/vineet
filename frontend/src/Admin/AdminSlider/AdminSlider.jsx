import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, Wrap, WrapItem, useMediaQuery, useToast } from '@chakra-ui/react';
import './AdminSlider.css';


export const AdminSlider = ({ slidevalue }) => {
    // const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null

    
    return (
        <div className='AdminSlider_0'>
            <div style={{ backgroundColor: slidevalue == 'AdminDash' ? '#00aeff' : null, color: slidevalue == 'AdminDash' ? 'white' : null }}><a href="/AdminDash"><p>DASHBOARD</p></a></div>
            <div style={{ backgroundColor: slidevalue == 'AdminPanCard' ? '#00aeff' : null, color: slidevalue == 'AdminPanCard' ? 'white' : null }}><a href="/AdminPanCard"><p>PANCARD</p></a></div>
            <div><a href="#"><p>MOBILE</p></a></div>
            <div><a href="#"><p>ELECTRICITY</p></a></div>
            <div><a href="#"><p>DTH</p></a></div>
            <div><a href="#"><p>INCOME TAX</p></a></div>
            <div><a href="#"><p>GST</p></a></div>
            <div><a href="#"><p>JOB PORTAL</p></a></div>
            <div><a href="#"><p>SOCIAL SERVICE</p></a></div>
            <div><a href="#"><p>PENSION</p></a></div>
        </div>
    )
}