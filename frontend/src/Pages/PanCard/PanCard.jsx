import "./PanCard.css";
import { DashboardNav } from "../../Components/DashboradNav/DashboardNav.jsx";
import { DashboardFooter } from "../../Components/DashboradFooter/DashboradFooter.jsx";
import { useNavigate } from "react-router-dom";
import { PanCardNav } from "../../Components/PanCardNav/PanCardNav";
import { ModalOverlay, Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure,Button, Heading} from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";

export const PanCard = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
useEffect(()=>{
onOpen()
},[])
  return (
    <div>
      <div>
        <DashboardNav />
        <PanCardNav />
      </div>


      <div className="pancard_1">
        <p> Email:- helpdigitalindiaportal@gmail.com</p>
        <p> Phones:- 9368372889</p>
        <p> Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</p>
      </div>

      <div className="pancard_2">
        <div><a href="#">New Pan Form Download</a></div>
        <div><a href="#">Update Pan Form Download</a></div>
        <div><a href="/NewPanCard">New Pan Card</a></div>
        <div><a href="#">Update Pan Card</a></div>
        <div><a href="#">Upload Pan Docs</a></div>
        <div><a href="#">Cancel Pan Card</a></div>
        <div><a href="#">Complete All PanCard</a></div>
        <div><a href="#">Check Pan Status</a></div>
        <div><a href="#">Link Aadhar to Pan</a></div>
        <div><a href="#">Download E-Pan</a></div>
        <div><a href="#">Download Slip By Acknow</a></div>
        <div><a href="#">Dispensary Letter Case</a></div>
      </div>

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

{/* initial instruction modal */}
<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay  />
        <ModalContent>
          <ModalHeader>Please Note :</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size={'sm'}>संचालक भाइयों अब आप इसी पेज पर नीचे दिए गए Download slip by acknow पर click करके अपनी सब पुरानी स्लिप डाउनलोड कर सकते है </Heading>
          </ModalBody>
        </ModalContent>
      </Modal>



      <div>
        <DashboardFooter />
      </div>
    </div>
  );
};
