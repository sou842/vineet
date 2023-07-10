import './Services.css';
import { Footer } from "../../Components/Footer/Footer"
import { Navbar } from "../../Components/Navbar/Navbar"



export const Services = () =>{


return (
    <div>
        <div><Navbar/></div>


        <div className='services_0'>
            <h1>Services Offered</h1>
            <div className='services_1'>
                <div>
                    <b>Pan Card</b>
                    <p>Fee - Rs. 107</p>
                </div>
                <div>
                    <b>Mobile & DTH Recharge</b>
                    <p>Fee - As per applicable</p>
                </div>
                <div>
                    <b>Electricity Bill</b>
                    <p>Fee - As per applicable</p>
                </div>
                <div>
                    <b>ITR</b>
                    <p>Fee - Rs. 299</p>
                </div>
                <div>
                    <b>GST</b>
                    <p>Fee - Rs. 499</p>
                </div>
                <div>
                    <b>Digital Signature</b>
                    <p>Fee - Coming Soon</p>
                </div>
                <div>
                    <b>Fee - Coming Soon</b>
                    <p>Fee - Coming Soon</p>
                </div>
                <div>
                    <b>National Pension System</b>
                    <p>Fee - Free</p>
                </div>
                <div>
                    <b>Job Portal</b>
                    <p>Fee - Free</p>
                </div>
            </div>
            <div className='services_2'>
                <p>We request you to also take advantage of other facilities provided by Digital India Portal like Pan Card, Electricity Bill Payment, Mobile Recharge, DTH Recharge, GST Registration, ITR Filing and we assure you that in future Digital India Portal will provide you more facilities Thank you for staying connected with Digital India Portal</p>
            </div>
        </div>


        <div><Footer/></div>
    </div>
)
}