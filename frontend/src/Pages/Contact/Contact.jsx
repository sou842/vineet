import './Contact.css';
import {Navbar} from '../../Components/Navbar/Navbar.jsx'
import {Footer} from '../../Components/Footer/Footer.jsx'

export const Contact = () =>{


return (
    <div>
        <div><Navbar/></div>


        <div className='contact_0'>
            <h1>CONTECT US</h1>
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
                <p>आप सभी से सलाह दी जाती है कि स्मार्ट डिजिटल सर्विस पोर्टल ने अब तक किसी भी सेवा के लिए कोई शुल्क नहीं लिया है, और किसी भी सेवा के लिए कोई शुल्क नहीं लिया जा रहा है। स्मार्ट डिजिटल सर्विस पोर्टल आपको सूचित कर रहा है कि बाजार में स्मार्ट डिजिटल सर्विस पोर्टल के नाम पर कई लोग धोखाधड़ी कर रहे हैं। अनुरोध है कि आप किसी से भी किसी भी तरीके से कोई भी शुल्क न दें क्योंकि स्मार्ट डिजिटल सर्विस पोर्टल की सभी सेवाएं मुफ्त प्रदान की जा रही हैं। अगर कोई आपसे पैसे मांग रहा है, तो कृपया इसे ऊपर दिए गए नंबरों या ईमेल के माध्यम से रिपोर्ट करें, और इसे स्मार्ट डिजिटल सर्विस पोर्टल के साथ साझा करें।</p>
            </div>
        </div>



        <div><Footer/></div>
    </div>
)
}