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
            <div className="contact_2">
                <p>आप सभी को सावधान किया जाता है की डिजिटल इंडिया पोर्टल ने अभी तक किसी भी सर्विस के लिए कोई पैसा नहीं लिया है और ना किसी सर्विस के लिए कोई पैसा लिया जा रहा है डिजिटल इंडिया पोर्टल आपको अवगत करा रहा है कि बाजार में डिजिटल इंडिया पोर्टल के नाम पर बहुत से लोग ठगी कर रहे हैं आपसे निवेदन रहेगा कि किसी को भी किसी भी प्रकार का शुल्क ना दें क्योंकि डिजिटल इंडिया पोर्टल की सभी सेवाएं निशुल्क प्रदान की जा रही है अगर आपसे कोई पैसे की मांग कर रहा है तो आप उसकी सूचना ऊपर दिए गए नंबरों पर अथवा ईमेल पर डिजिटल इंडिया पोर्टल के साथ साझा करें</p>
            </div>
        </div>



        <div><Footer/></div>
    </div>
)
}