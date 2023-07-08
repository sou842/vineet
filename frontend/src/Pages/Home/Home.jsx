import './Home.css'
import { Navbar } from "../../Components/Navbar/Navbar"
import { Footer } from '../../Components/Footer/Footer'


export const Home = () =>{

return (
    <div>
        <Navbar />
        <div className='home_0'>
        <div className="home_01">
            <h1>WELCOME TO VINEET INDIA PORTAL</h1>
            <div>
                <p>Email:- helpdigitalindiaportal@gmail.com</p>
                <p>"Dear User & Visitors, please be informed that this portal is totally free of cost, no cost is asked for its registration.If anyone asks any money for the same, Please don't do so and kindly reach out to given Numbers and Email"</p>
            </div>
        </div>
        <div className="home_02">
            <h1>SERVICES</h1>
            <div>
                <div><a href="#">PAN CARD</a></div>
                <div><a href="#">MOBILE & DTH</a></div>
                <div><a href="#">Electricity Bill</a></div>
                <div><a href="#">ITR</a></div>
                <div><a href="#">GST</a></div>
                <div><a href="#">DIGITAL SIGNATURE</a></div>
                <div><a href="#">UTI</a></div>
                <div><a href="#">NATIONAL PENSION SYSTEM</a></div>
                <div><a href="#">JOB PORTAL</a></div>
            </div>
        </div>
        </div>
        <Footer />
    </div>
)
}