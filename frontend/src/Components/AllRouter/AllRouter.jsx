import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Home } from '../../Pages/Home/Home';
import { About } from '../../Pages/About/About';
import { Services } from '../../Pages/Services/Services';
import { Contact } from '../../Pages/Contact/Contact';
import { Privacy } from '../../Pages/Privacy/Privacy';
import Signup from '../../Pages/Register/Signup';
import Signin from '../../Pages/Login/Signin';
import { Dashboard } from '../../Pages/User/Dashboard';
import { Profile } from '../../Pages/Profile/Profile';
import { PanCard } from '../../Pages/PanCard/PanCard/PanCard';
import { NewPanCard } from '../../Pages/PanCard/NewPanCard/NewPanCard';
import { NewPanCardAllState } from '../../Pages/PanCard/NewPanCardAllState/NewPanCardAllState';
import ChangePassword from '../../Pages/ChangePassword/ChangePassword';
import Upload from '../../Pages/upload/Upload';
import UploadDocument from '../../Pages/upload document/UploadDocument';
import FinalApplyConfirm from '../../Pages/finalApply/FinalApplyConfirm';
import PanApplySuccess from '../../Pages/PanCard/PanApplySuccess/PanApplySuccess';
import Receipt from '../../Pages/PanCard/Receipt/Receipt';
import { EditPan } from '../../Pages/PanCard/EditPan/EditPan';
import { PanCardForm } from '../../Pages/PanCard/PanCardForm/PanCardForm';
import { PanUploadEdit } from '../../Pages/PanUploadEdit/PanUploadEdit';
import { AdminDash } from '../../Admin/AdminDash/AdminDash';
import { AdminUser } from '../../Admin/AdminUser/AdminUser';
import { AminPerson } from '../../Admin/AminPerson/AminPerson';
import { AdminPanCard } from '../../Admin/AdminPanCard/AdminPanCard';
import { AdminPanCardPerson } from '../../Admin/AdminPanCardPerson/AdminPanCardPerson';
import Login from '../../Admin/AdminLogin/Login.jsx'
import { PanCardCompleted } from '../../Pages/PanCard/PanCardCompleted/PanCardCompleted';
import { UpdatePancard } from '../../Pages/UpdatePancard/UpdatePancard/UpdatePancard';
import { UpdatePancardForm } from '../../Pages/UpdatePancard/UpdatePancardForm/UpdatePancardForm';




export const AllRouter = () =>{
    const portalData=JSON.parse(localStorage.getItem("digitalPortal"))
    const adminData=JSON.parse(localStorage.getItem("VDPadmin"))

return (
    <Routes>
        <Route path={'/'} element={<Home/>}></Route>
        <Route path={'/About'} element={<About/>}></Route>
        <Route path={'/Services'} element={<Services/>}></Route>
        <Route path={'Contact'} element={<Contact/>}></Route>
        <Route path={'/Privacy'} element={<Privacy/>}></Route>
        <Route path={'/Signup'} element={<Signup/>}></Route>
        <Route path={'/Signin'} element={<Signin/>}></Route>
        <Route path={'/Dashboard'} element={portalData?<Dashboard/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/Profile'} element={portalData?<Profile/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/PanCard'} element={portalData?<PanCard/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/NewPanCard'} element={portalData?<NewPanCard/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/NewPanCardAllState'} element={portalData?<NewPanCardAllState/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/user/change-password'} element={portalData?<ChangePassword/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/user/upload'} element={portalData?<Upload/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/user/upload-document/:id'} element={portalData?<UploadDocument/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/user/final-confirm-apply/:id'} element={portalData?<FinalApplyConfirm/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/user/applied-success'} element={portalData?<PanApplySuccess/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/user/pan-receipt'} element={portalData?<Receipt/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/user/pan-edit'} element={portalData?<EditPan/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'*'} element={<h1>404 Page Not Found</h1>}></Route>
        <Route path={'/PanCardForm/:catagory'} element={portalData?<PanCardForm/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/user/upload/PanUploadEdit/:id'} element={portalData?<PanUploadEdit/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/AdminDash'} element={adminData?<AdminDash/>:<Navigate to={'/admin/login'}/>}></Route>
        <Route path={'/AdminUser'} element={<AdminUser/>}></Route>
        <Route path={'/AdminUser/AminPerson/:id'} element={<AminPerson/>}></Route>
        <Route path={'/AdminPanCard'} element={<AdminPanCard/>}></Route>
        <Route path={'/AdminPanCard/AdminPanCardPerson/:id'} element={<AdminPanCardPerson/>}></Route>
        <Route path={'/admin/login'} element={<Login/>}></Route>
        <Route path={'/user/PanCardCompleted'} element={portalData?<PanCardCompleted/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/UpdatePancard'} element={portalData?<UpdatePancard/>:<Navigate to={'/Signin'}/>}></Route>
        <Route path={'/UpdatePancardForm/:catagory'} element={portalData?<UpdatePancardForm/>:<Navigate to={'/Signin'}/>}></Route>
    </Routes>
)
}