import {
  Avatar,
  Box,
  Image,
  Text,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast
} from "@chakra-ui/react";
import { AuthorContext } from "../../Components/AllContext/AllContext";
import { useContext } from "react";
import "./AdminNavbar.css";
import { useNavigate } from "react-router-dom";

export const AdminNavbar = ({ value }) => {
  const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
  const adminData = JSON.parse(localStorage.getItem("VDPadmin")) || null;
  const { side, setSide } = useContext(AuthorContext);
  const navigate = useNavigate();
  const toast=useToast()

const handelAdminLogout=()=>{
    //########################################
  const baseurl=process.env.REACT_APP_BASE_URL
  //########################################
    localStorage.removeItem("VDPadmin")
    toast({
        title: 'Logout Succesfull',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position:"top-left"
          })
    window.location="/"
}

  return (
    <div>
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={"10px"}
        pl={"15px"}
        pr={"15px"}
        mt={"0"}
        gap={"10px"}
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      >
        <Box display={"flex"} alignItems={"end"}>
          {value && (
            <Image
              onClick={() => setSide(!side)}
              cursor={"pointer"}
              w={"30px"}
              h={"30px"}
              src={"https://cdn-icons-png.flaticon.com/128/1828/1828859.png"}
            />
          )}
          <Text
            fontSize={"20px"}
            fontWeight={"bold"}
            ml={"10px"}
            color={"blue.400"}
            onClick={() => navigate("/AdminDash")}
            cursor={"pointer"}
          >
            Hi,{adminData.adminName}
          </Text>
        </Box>
        <Box display={"flex"} gap={"10px"}>
          <img
            width={"30px"}
            height={"30px"}
            src="https://cdn-icons-png.flaticon.com/128/646/646094.png"
            alt=""
          />
          <Menu>
            <MenuButton>
              <Avatar
                color={"black"}
                bg="#00aeff"
                size={["sm"]}
                name={
                  portalData &&
                  portalData.username.match(/\b\w/g).join("").toUpperCase()
                }
                src={portalData && portalData.avatar}
              />
            </MenuButton>
            <MenuList>
              <MenuItem fontWeight={'bold'}>Hello,{adminData.adminName.toUpperCase()}</MenuItem>
              <MenuItem color={'red'} onClick={handelAdminLogout}>Logout</MenuItem>
             
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </div>
  );
};
