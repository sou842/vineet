import './NewPanCardAllState.css';
import { useNavigate } from "react-router-dom"
import { PanCardNav } from '../../../Components/PanCardNav/PanCardNav';
import { Box, useToast } from '@chakra-ui/react';
import { Footer } from '../../../Components/Footer/Footer';
import ContactUs from '../../contact us with time/ContactUs';


export const NewPanCardAllState = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const handleLogout = () => {
        localStorage.removeItem("digitalPortal")

        toast({
            title: 'Logout Succesfull.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        window.location = '/'
    }

    return (
        <div>
            <div>
                <PanCardNav />
            </div>
            <Box w={['90%', '80%', '65%']} m={'1cm auto'}>
                <ContactUs />
            </Box>

            <div>


                <h1 className='newPanCardAllState_head'>NEW PANCARD</h1>

                <div className='newPanCardAllState_2'>
                    <div><a href="/PanCardForm/Individual"><p>Individual Person</p></a></div>
                    <div><a href="/PanCardForm/Artificial-Judicial-Person"><p>Artificial Judicial Person</p></a></div>
                    <div><a href="/PanCardForm/Association-of-Person"><p>Association of Person</p></a></div>
                    <div><a href="/PanCardForm/Trust"><p>Trust</p></a></div>
                    <div><a href="/PanCardForm/Body-of-Individual"><p>Body of Individual</p></a></div>
                    <div><a href="/PanCardForm/Firm"><p>Firm</p></a></div>
                    <div><a href="/PanCardForm/Government"><p>Government</p></a></div>
                    <div><a href="/PanCardForm/Limited-Liability-Partnership"><p>Limited Liability Partnership</p></a></div>
                    <div><a href="/PanCardForm/Local-Authority"><p>Local Authority</p></a></div>
                </div>
            </div>

            <div className='dashboard_1'>
                <p>हम आपसे अनुरोध करते हैं कि डिजिटल इंडिया पोर्टल द्वारा प्रदान की जा रही अन्य सुविधाएं जैसे बिजली बिल का भुगतान, मोबाइल रिचार्ज, डीटीएच रिचार्ज, GST रजिस्ट्रेशन, ITR फाइलिंग जैसी अन्य सुविधाओं का भी आप लाभ उठाएं और हम आपको भरोसा दिलाते हैं कि भविष्य में डिजिटल इंडिया पोर्टल आपको और भी सुविधाएं प्रदान करेगा डिजिटल इंडिया पोर्टल के साथ जुड़े रहने के लिए धन्यवाद</p>
            </div>

            <div><Footer /></div>
        </div>
    )
}
