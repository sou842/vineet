import './NewPanCardAllState.css';
import { DashboardNav } from '../../Components/DashboradNav/DashboardNav'
import { DashboardFooter } from '../../Components/DashboradFooter/DashboradFooter';
import { useNavigate } from "react-router-dom"
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav';
import { useToast } from '@chakra-ui/react';


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
                <PanCardNav/>
            </div>
            
            <div>
                <div className='newPanCardAllState_1'>
                    <p> Email:- helpdigitalindiaportal@gmail.com</p>
                    <p> Phones:- 9368372889</p>
                    <p> Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</p>
                </div>

                <h1 className='newPanCardAllState_head'>NEW PANCARD</h1>

                <div className='newPanCardAllState_2'>
                    <div><a href="/IndividualPerson/individual"><p>Individual Person</p></a></div>
                    <div><a href="/IndividualPerson/:catagory"><p>Artificial Judicial Person</p></a></div>
                    <div><a href="/IndividualPerson/:catagory"><p>Associatio of Person</p></a></div>
                    <div><a href="/IndividualPerson/:catagory"><p>Trust</p></a></div>
                    <div><a href="/IndividualPerson/:catagory"><p>Body of Individual</p></a></div>
                    <div><a href="/IndividualPerson/:catagory"><p>Flim</p></a></div>
                    <div><a href="/IndividualPerson/:catagory"><p>Government</p></a></div>
                    <div><a href="/IndividualPerson/:catagory"><p>Limited Liability Partnership</p></a></div>
                    <div><a href="/IndividualPerson/:catagory"><p>Local Authority</p></a></div>
                </div>
            </div>

            <div className='dashboard_1'>
                <p>हम आपसे अनुरोध करते हैं कि डिजिटल इंडिया पोर्टल द्वारा प्रदान की जा रही अन्य सुविधाएं जैसे बिजली बिल का भुगतान, मोबाइल रिचार्ज, डीटीएच रिचार्ज, GST रजिस्ट्रेशन, ITR फाइलिंग जैसी अन्य सुविधाओं का भी आप लाभ उठाएं और हम आपको भरोसा दिलाते हैं कि भविष्य में डिजिटल इंडिया पोर्टल आपको और भी सुविधाएं प्रदान करेगा डिजिटल इंडिया पोर्टल के साथ जुड़े रहने के लिए धन्यवाद</p>
            </div>

            <div><DashboardFooter /></div>
        </div>
    )
}
