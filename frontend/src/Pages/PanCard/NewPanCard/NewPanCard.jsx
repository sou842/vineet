import "./NewPanCard.css";
import { DashboardNav } from "../../../Components/DashboradNav/DashboardNav.jsx";
import { DashboardFooter } from "../../../Components/DashboradFooter/DashboradFooter.jsx";
import { PanCardNav } from '../../../Components/PanCardNav/PanCardNav.jsx'
import { useNavigate } from "react-router-dom";
import { Footer } from "../../../Components/Footer/Footer";
import ContactUs from "../../contact us with time/ContactUs";
import { Box } from "@chakra-ui/react";


export const NewPanCard = () => {
  const navigate = useNavigate();


  return (
    <div>
      <div>
        <PanCardNav />
      </div>
      <Box w={['90%', '80%', '65%']} m={'1cm auto'}>
        <ContactUs />
      </Box>


      <Box w={['90%','80%','65%']} m={'1cm auto'}>
        <Box bg={'blue.400'} fontWeight={'bold'} m={'10px'} textAlign={'center'} color={'whiteAlpha.900'} p={'10px'} borderRadius={'15px'}><a href="/NewPanCardAllState"><p>New Pan Card With Aadhaar <br /> <i style={{color:'#424242',fontWeight:'lighter'}}>(All States)</i></p></a></Box>
        <Box bg={'blue.400'} fontWeight={'bold'} m={'10px'} textAlign={'center'} color={'whiteAlpha.900'} p={'10px'} borderRadius={'15px'}><a href="#"><p>New Pan Card Without Aadhaar <br /><i style={{color:'#424242',fontWeight:'lighter'}}>(Only ASSAM, JAMMU AND KASHMIR, MEGHALAYA)</i></p></a></Box>
      </Box>

      <div className="pancard_1">
        <p>
          आपको सूचित किया जाता है कि फोटो का बैकग्राउंड हल्के कलर का होना चाहिए
          तथा फोटो साफ और क्लियर हो अगर आप खराब फोटो अपलोड करेंगे तो आपका आवेदन
          होल्ड पर लग जाएगा जिसमें पोर्टल की कोई जिम्मेदारी नहीं होगी उसके
          जिम्मेदार आप स्वयं होंगे
        </p>
      </div>
      <div className="pancard_1">
        <p>
          फार्म भरने से पूर्व यह सुनिश्चित कर ले की आयकर विभाग द्वारा जारी किया
          गया नया फार्म आपके पास है या नहीं यदि नहीं तो नीचे दिए गए फार्म
          डाउनलोड के बटन पर क्लिक करके नया फॉर्म डाउनलोड करें अन्यथा आपका यह
          फार्म निश्चित तौर पर निरस्त कर दिया जाएगा
        </p>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};
