import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, Wrap, WrapItem, useMediaQuery, useToast } from '@chakra-ui/react';
import './AdminSlider.css';
import { useNavigate } from 'react-router-dom';


export const AdminSlider = ({ slidevalue }) => {
    // const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null
    const navigate = useNavigate();

    return (
        <>
            {slidevalue === 'AdminPanCard' || slidevalue == 'AdminUpdatePanCard' ?
                <div className='AdminSlider_0'>
                    <div style={{ backgroundColor: slidevalue == 'AdminDash' ? '#1ABC9C' : null, color: slidevalue == 'AdminDash' ? 'white' : null, cursor: 'pointer' }} onClick={() => navigate('/AdminDash')}><p>DASHBOARD</p></div>
                    <div style={{ backgroundColor: slidevalue == 'AdminPanCard' ? '#1ABC9C' : null, color: slidevalue == 'AdminPanCard' ? 'white' : null, cursor: 'pointer' }} onClick={() => navigate('/AdminPanCard')}><p>NEW PANCARD</p></div>
                    <div style={{ backgroundColor: slidevalue == 'AdminUpdatePanCard' ? '#1ABC9C' : null, color: slidevalue == 'AdminUpdatePanCard' ? 'white' : null, cursor: 'pointer' }} onClick={() => navigate('/AdminUpdatePanCard')}><p>UPDATE PANCARD</p></div>
                    <div style={{ backgroundColor: slidevalue == 'AdminCancelPanCard' ? '#1ABC9C' : null, color: slidevalue == 'AdminCancelPanCard' ? 'white' : null, cursor: 'pointer' }} onClick={() => navigate('/noo')}><p>CANCEL PANCARD</p></div>
                </div>
                :
                <div className='AdminSlider_0'>
                    <div style={{ backgroundColor: slidevalue == 'AdminDash' ? '#1ABC9C' : null, color: slidevalue == 'AdminDash' ? 'white' : null, cursor: 'pointer' }} onClick={() => navigate('/AdminDash')}><p>DASHBOARD</p></div>
                    <div style={{ backgroundColor: slidevalue == 'AdminPanCard' ? '#1ABC9C' : null, color: slidevalue == 'AdminPanCard' ? 'white' : null, cursor: 'pointer' }} onClick={() => navigate('/AdminPanCard')}><p>PANCARD</p></div>
                    <div style={{ backgroundColor: slidevalue === 'MOBILE' ? '#1ABC9C' : null, color: slidevalue === 'MOBILE' ? 'white' : null, cursor: 'pointer' }} onClick={() => navigate('/AdminMobile')}><p>MOBILE</p></div>
                    <div style={{ backgroundColor: slidevalue === 'ELECTRICITY' ? '#1ABC9C' : null, color: slidevalue === 'ELECTRICITY' ? 'white' : null, cursor: 'pointer' }}><p>ELECTRICITY</p></div>
                    <div style={{ backgroundColor: slidevalue === 'DTH' ? '#1ABC9C' : null, color: slidevalue === 'DTH' ? 'white' : null, cursor: 'pointer' }}><p>DTH</p></div>
                    <div style={{ backgroundColor: slidevalue === 'INCOME TAX' ? '#1ABC9C' : null, color: slidevalue === 'INCOME TAX' ? 'white' : null, cursor: 'pointer' }}><p>INCOME TAX</p></div>
                    <div style={{ backgroundColor: slidevalue === 'GST' ? '#1ABC9C' : null, color: slidevalue === 'GST' ? 'white' : null, cursor: 'pointer' }}><p>GST</p></div>
                    <div style={{ backgroundColor: slidevalue === 'JOB PORTAL' ? '#1ABC9C' : null, color: slidevalue === 'JOB PORTAL' ? 'white' : null, cursor: 'pointer' }}><p>JOB PORTAL</p></div>
                    <div style={{ backgroundColor: slidevalue === 'SOCIAL SERVICE' ? '#1ABC9C' : null, color: slidevalue === 'SOCIAL SERVICE' ? 'white' : null, cursor: 'pointer' }}><p>SOCIAL SERVICE</p></div>
                    <div style={{ backgroundColor: slidevalue === 'PENSION' ? '#1ABC9C' : null, color: slidevalue === 'PENSION' ? 'white' : null, cursor: 'pointer' }}><p>PENSION</p></div>
                </div>}
        </>
    )
}