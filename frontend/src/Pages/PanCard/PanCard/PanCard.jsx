import "./PanCard.css";
import { useNavigate } from "react-router-dom";
import { PanCardNav } from "../../../Components/PanCardNav/PanCardNav";
import {
  ModalOverlay, Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Button, Heading, Box
} from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import { Footer } from "../../../Components/Footer/Footer";
import form49A from '../../../assets/Form49A.pdf'
import ContactUs from "../../contact us with time/ContactUs";

export const PanCard = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleForm49A = (e) => {
    window.open('https://digitalindiaportal.co.in/users/pancard/Form49A.pdf')
  }





  useEffect(() => {
    onOpen()
  }, [])
  return (
    <div>
      <div>
        <PanCardNav />
      </div>
<Box m={'1cm auto'}>
  <ContactUs/>
</Box>

      {/* <div className="pancard_1">
        <p> Email:- helpdigitalindiaportal@gmail.com</p>
        <p> Phones:- 9368372889</p>
        <p> Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</p>
      </div> */}

      <div className="pancard_2">
        <div><a target='_blank' onClick={handleForm49A} href={form49A} download="form49A" ><p>New Pan Form Download</p></a></div>
        <div><a href="#"><p>Update Pan Form Download</p></a></div>
        <div><a href="/NewPanCard"><p>New Pan Card</p></a></div>
        <div><a href="/UpdatePancard"><p>Update Pan Card</p></a></div>
        <div><a href="#"><p>Upload Pan Docs</p></a></div>
        <div><a href="#"><p>Cancel Pan Card</p></a></div>
        <div><a href="#"><p>Complete All PanCard</p></a></div>
        <div><a href="#"><p>Check Pan Status</p></a></div>
        <div><a href="#"><p>Link Aadhar to Pan</p></a></div>
        <div><a href="#"><p>Download E-Pan</p></a></div>
        <div><a href="#"><p>Download Slip By Acknow</p></a></div>
        <div><a href="#"><p>Dispensary Letter Case</p></a></div>
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
      {/* <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please Note :</ModalHeader>
          <ModalCloseButton />
          <ModalBody m={'10px'} mt={'0'} mb={'15px'}>
            <Heading size={'sm'}>संचालक भाइयों अब आप इसी पेज पर नीचे दिए गए <Heading size={'sm'} color={'red'} as={'span'}> Download slip by acknow पर click </Heading> करके अपनी सब पुरानी स्लिप डाउनलोड कर सकते है </Heading>
          </ModalBody>
        </ModalContent>
      </Modal> */}



      <div>
        <Footer />
      </div>
    </div>
  );
};
