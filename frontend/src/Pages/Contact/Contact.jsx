import './Contact.css';
import {Navbar} from '../../Components/Navbar/Navbar.jsx'
import {Footer} from '../../Components/Footer/Footer.jsx'

export const Contact = () =>{


return (
    <div>
        <div><Navbar/></div>


        <div className='contact_0'>
            <h1>Contact Us</h1>
            <div className='contact_1'>
                <div>
                <input type="text" placeholder='Name'/>
                <input type="email" placeholder='Email'/>
                </div>
                <div>
                <input type="number" placeholder='Modile'/>
                <input type="text" placeholder='City'/>
                </div>
                <div>
                <textarea placeholder='Massage'></textarea>
                </div>
                <div>
                <button>SUBMIT</button>
                </div>
            </div>
        </div>



        <div><Footer/></div>
    </div>
)
}