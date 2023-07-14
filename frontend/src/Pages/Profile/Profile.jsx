import { DashboardNav } from '../../Components/DashboradNav/DashboardNav';
import './Profile.css'
import {useNavigate} from "react-router-dom"


export const Profile = () =>{
    const navigate = useNavigate()

    const handleOptionChange = (event) => {
      const selectedValue = event.target.value;
  
      console.log(selectedValue)
      navigate(selectedValue)
    };

return (
    <div>
        <div><DashboardNav /></div>

        <div className='profile_0'>
        <div>
          <div><a href="/Dashboard"><p>Dashboard</p></a></div>
          <div>
            <select>
              <option value=""><a href="#">Services</a></option>
              <option value=""><a href="#">Pan Card</a></option>
              <option value=""><a href="#">Electricity</a></option>
              <option value=""><a href="#">Mobile Recharge</a></option>
              <option value=""><a href="#">DTH Recharge</a></option>
              <option value=""><a href="#">ITR</a></option>
              <option value=""><a href="#">GST</a></option>
              <option value=""><a href="#">Online Job Portal</a></option>
            </select>
          </div>
          <div><a href="#"><p>Traning Manual</p></a></div>
          <div><a href="#"><p>Downloads</p></a></div>
          <div><a href="#"><p>Ledger</p></a></div>
          <div><a href="#"><p>Add Money</p></a></div>
        </div>
        <div>
          <div><a href="#"><p>PCW: Rs.0</p></a></div>
          <div><a href="#"><p>OCW: Rs.0</p></a></div>
          <div>
            <select onChange={handleOptionChange}>
              <option value="">Vineet</option>
              <option value="/Profile">Profile</option>
              <option value="/ChangePassword">Change Password</option>
              <option value="/Logout">Logout</option>
            </select>
          </div>
        </div>
      </div>

        <div className='profile_1'>
          <p> Email:- helpdigitalindiaportal@gmail.com</p>
          <p> Phones:- 9368372889</p>
          <p> Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</p>
        </div>

        <div className='profile_2'>
        <h1>My Profile</h1>
        <div>
            <b>Vender ID</b>
            <p></p>
        </div>
        <div>
            <b>Email</b>
            <p></p>
        </div>
        <div>
            <b>Person Name</b>
            <p></p>
        </div>
        <div>
            <b>Person Contact</b>
            <p></p>
        </div>
        <div>
            <b>Date of Birth</b>
            <p></p>
        </div>
        <div>
            <b>Address</b>
            <p></p>
        </div> 
        <div>
            <b>City</b>
            <p></p>
        </div>
        <div>
            <b>State</b>
            <p></p>
        </div>
        <div>
            <b>Country</b>
            <p></p>
        </div>
        <div>
            <b>Pin Code</b>
            <p></p>
        </div>
        <div>
            <b>Landline</b>
            <p></p>
        </div> 
        <div>
            <b>Retailer Shop Name</b>
            <p></p>
        </div>
        <div>
            <b>Franshise</b>
            <p></p>
        </div>
        <div>
            <b>Business</b>
            <p></p>
        </div>
        <div>
            <b>Joining Date & Time</b>
            <p></p>
        </div>
        <button>EDIT PROFILE</button>
        </div>
    </div>
)
}