import './About.css'
import {Navbar} from '../../Components/Navbar/Navbar.jsx';
import {Footer} from '../../Components/Footer/Footer.jsx';
export const About = () =>{


return (
    <div>
        <div>
            <Navbar/>
        </div>

        <div>
            <div className="about_1">
                <h1>About Us</h1>
                <div><p>Digital India is owned company by experts who have been in the e-gov services industry since 2017. The company establishes business relationships with operators, consumers, merchants and vendors networks, financial institutions and infrastructure providers. Digital India plays a critical role ensuring the success of the system, allowing to all parties to maximize the benefits.</p></div>
                <div><p>Digital India is a allied services provider company that offers e-governance services , high successful electronic payment solutions and services for telecommunications operators, utility operators within the region.</p></div>
                <div><p>Digital India brings in a great opportunity for retailer to make use of various web based services to serve their clients with a low investment cost DigitalIndia Portal.</p></div>
                <div><p>Digital India Portal provides consumers this convenience by creating a franchise network of conventional mom and pop stores located in the consumer's neighborhood. These franchisees are equipped with a multifunctional terminal, which is connected to the service providers' servers and executes transactions on a real-time basis. DigitalIndia Portal has contractual agreements with service providers and is authorized to issue legally valid reservations and receipts to consumers.</p></div>
            </div>
            <div className="about_1">
                <h1>Mission</h1>
                <div><p>Connecting the middle and low-income groups and providing world-class service</p></div>
                <div><p>Bring convenience to the consumer's doorstep, enabling them to access a diversified range of services through a vibrant delivery mechanism</p></div>
                <div><p>We wish to create innovative products and solutions catering to vast audience and contributing positively to the growth of our nation "Sab Kuch DIGITAL"</p></div>
            </div>
            <div className="about_1">
                <h1>Vision</h1>
                <div><p>Empower the youth with entrepreneurial opportunities while contributing to the country's growth.</p></div>
                <div><p>Be India's first and largest "Fast Moving Consumer Services" company</p></div>
                <div><p>We wish to create innovative products and solutions catering to vast audience and contributing positively to the growth of our nation</p></div>
                <div><p>To be the most preferred cutting-edge solution provider in the sphere of Travel and IT related services globally.</p></div>
            </div>
        </div>




        <div>
            <Footer/>
        </div>
    </div>
)
}