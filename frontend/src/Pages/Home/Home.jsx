import './Home.css'
import { Navbar } from "../../Components/Navbar/Navbar"
import { Footer } from '../../Components/Footer/Footer'


export const Home = () =>{

return (
    <div>
        <div><Navbar /></div>
        <div className='home_0'>
        <div className="home_01">
            <h1>WELCOME TO VINEET INDIA PORTAL</h1>
            <div>
                <p><b>Email:-</b> helpdigitalindiaportal@gmail.com</p>
                <p>"Dear User & Visitors, please be informed that this portal is totally free of cost, no cost is asked for its registration.If anyone asks any money for the same, Please don't do so and kindly reach out to given Numbers and Email"</p>
            </div>
        </div>
        <div className="home_02">
            <h1>SERVICES</h1>
            <div>
                <div><a href="#"><p>PAN CARD</p></a></div>
                <div><a href="#"><p>MOBILE & DTH</p></a></div>
                <div><a href="#"><p>Electricity Bill</p></a></div>
                <div><a href="#"><p>ITR</p></a></div>
                <div><a href="#"><p>GST</p></a></div>
                <div><a href="#"><p>DIGITAL SIGNATURE</p></a></div>
                <div><a href="#"><p>UTI</p></a></div>
                <div><a href="#"><p>NATIONAL PENSION</p></a></div>
                <div><a href="#"><p>JOB PORTAL</p></a></div>
            </div>
        </div>
        </div>
        <div><Footer /></div>
    </div>
)
}