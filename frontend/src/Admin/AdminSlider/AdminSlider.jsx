import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, Wrap, WrapItem, useMediaQuery, useToast } from '@chakra-ui/react';
import './AdminSlider.css';


export const AdminSlider = ({ slidevalue }) => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null

    console.log(slidevalue)

    return (
        <div className='AdminSlider_0'>
            {/* <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}> */}
            <div >
                <Wrap style={{display:'flex',justifyContent:'center',marginBottom:'15px'}}>
                    <WrapItem>
                        <Avatar color={'black'} bg='#00aeff' size={['md', 'md', 'lg','xl']} name={portalData && portalData.username.match(/\b\w/g).join('').toUpperCase()} src={portalData && portalData.avatar} />
                    </WrapItem>
                </Wrap>
                <div>
                <h1 style={{fontSize:'17px'}}>{portalData && portalData.username}</h1>

                </div>
            </div>
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