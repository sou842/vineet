import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, Wrap, WrapItem, useMediaQuery, useToast } from '@chakra-ui/react';
import './AdminSlider.css';
import { useNavigate } from 'react-router-dom';


export const AdminSlider = ({ slidevalue }) => {
    // const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
    const navigate = useNavigate();

    return (
        <div className='AdminSlider_0'>
            <div style={{ backgroundColor: slidevalue == 'AdminDash' ? '#00aeff' : null, color: slidevalue == 'AdminDash' ? 'white' : null, cursor: 'pointer' }} onClick={() => navigate('/AdminDash')}><p>DASHBOARD</p></div>
            <div style={{ backgroundColor: slidevalue == 'AdminPanCard' ? '#00aeff' : null, color: slidevalue == 'AdminPanCard' ? 'white' : null, cursor: 'pointer' }} onClick={() => navigate('/AdminPanCard')}><p>PANCARD</p></div>
            <div style={{ backgroundColor: slidevalue === 'MOBILE' ? '#00aeff' : null, color: slidevalue === 'MOBILE' ? 'white' : null, cursor: 'pointer' }}><p>MOBILE</p></div>
            <div style={{ backgroundColor: slidevalue === 'ELECTRICITY' ? '#00aeff' : null, color: slidevalue === 'ELECTRICITY' ? 'white' : null, cursor: 'pointer' }}><p>ELECTRICITY</p></div>
            <div style={{ backgroundColor: slidevalue === 'DTH' ? '#00aeff' : null, color: slidevalue === 'DTH' ? 'white' : null, cursor: 'pointer' }}><p>DTH</p></div>
            <div style={{ backgroundColor: slidevalue === 'INCOME TAX' ? '#00aeff' : null, color: slidevalue === 'INCOME TAX' ? 'white' : null, cursor: 'pointer' }}><p>INCOME TAX</p></div>
            <div style={{ backgroundColor: slidevalue === 'GST' ? '#00aeff' : null, color: slidevalue === 'GST' ? 'white' : null, cursor: 'pointer' }}><p>GST</p></div>
            <div style={{ backgroundColor: slidevalue === 'JOB PORTAL' ? '#00aeff' : null, color: slidevalue === 'JOB PORTAL' ? 'white' : null, cursor: 'pointer' }}><p>JOB PORTAL</p></div>
            <div style={{ backgroundColor: slidevalue === 'SOCIAL SERVICE' ? '#00aeff' : null, color: slidevalue === 'SOCIAL SERVICE' ? 'white' : null, cursor: 'pointer' }}><p>SOCIAL SERVICE</p></div>
            <div style={{ backgroundColor: slidevalue === 'PENSION' ? '#00aeff' : null, color: slidevalue === 'PENSION' ? 'white' : null, cursor: 'pointer' }}><p>PENSION</p></div>

        </div>
    )
}