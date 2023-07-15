import "./PanCard.css";
import { DashboardNav } from "../../Components/DashboradNav/DashboardNav.jsx";
import { DashboardFooter } from "../../Components/DashboradFooter/DashboradFooter.jsx";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const PanCard = () => {
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;

    console.log("selectedValue");
    navigate(selectedValue);
  };

  return (
    <div>
      <div>
        <DashboardNav />
      </div>
      <div className="pancard_0">
        <div>
          <div>
            <a href="/Dashboard">
              <p>Dashboard</p>
            </a>
          </div>
          <div>
            <select onChange={handleOptionChange}>
              <option value="">Services</option>
              <option value="/PanCard">Pan Card</option>
              <option value="">Electricity</option>
              <option value="">Mobile Recharge</option>
              <option value="">DTH Recharge</option>
              <option value="">ITR</option>
              <option value="">GST</option>
              <option value="">Online Job Portal</option>
            </select>
          </div>
          <div>
            <a href="#">
              <p>Receipt</p>
            </a>
          </div>
          <div>
            <a href="#">
              <p>Upload</p>
            </a>
          </div>
          <div>
            <a href="#">
              <p>Reject Pan by NSDL</p>
            </a>
          </div>
          <div>
            <a href="#">
              <p>Complite</p>
            </a>
          </div>
          <div>
            <a href="#">
              <p>Check Pan Status</p>
            </a>
          </div>
        </div>
        <div>
          <div>
            <a href="#">
              <p>PCW: Rs.0</p>
            </a>
          </div>
          <div>
            <a href="#">
              <p>OCW: Rs.0</p>
            </a>
          </div>
          <div>
            <Menu >
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="#0a9cf8"
              >
                ANIMESH GHOROI
              </MenuButton>
              <MenuList color={"black"} >
                <MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem>
                <MenuItem  onClick={()=>navigate('/ChangePassword')}>Change Password</MenuItem>
                <MenuItem  onClick={()=>navigate('/profile')}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>

          {/* <div>
            <select onChange={handleOptionChange}>
              <option value="/Profile">Profile</option>
              <option value="/ChangePassword">Change Password</option>
              <option value="/Logout">Logout</option>
            </select>
          </div> */}
        </div>
      </div>

      <div className="pancard_1">
        <p> Email:- helpdigitalindiaportal@gmail.com</p>
        <p> Phones:- 9368372889</p>
        <p> Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</p>
      </div>

      <div className="pancard_2">
        <div>New Pan Form Download</div>
        <div>Update Pan Form Download</div>
        <div>New Pan Card</div>
        <div>Update Pan Card</div>
        <div>Upload Pan Docs</div>
        <div>Cancel Pan Card</div>
        <div>Complete All PanCard</div>
        <div>Check Pan Status</div>
        <div>Link Aadhar to Pan</div>
        <div>Download E-Pan</div>
        <div>Download Slip By Acknow</div>
        <div>Dispensary Letter Case</div>
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

      <div>
        <DashboardFooter />
      </div>
    </div>
  );
};
