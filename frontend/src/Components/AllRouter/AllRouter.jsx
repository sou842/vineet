import { Routes, Route } from 'react-router-dom';
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





export const AllRouter = () =>{
    const portalData=JSON.parse(localStorage.getItem("digitalPortal"))
    // console.log(portalData);

return (
    <Routes>
        <Route path={'/'} element={<Home/>}></Route>
        <Route path={'/About'} element={<About/>}></Route>
        <Route path={'/Services'} element={<Services/>}></Route>
        <Route path={'Contact'} element={<Contact/>}></Route>
        <Route path={'/Privacy'} element={<Privacy/>}></Route>
        <Route path={'/Signup'} element={<Signup/>}></Route>
        <Route path={'/Signin'} element={<Signin/>}></Route>
        <Route path={'/Dashboard'} element={portalData?<Dashboard/>:<Signin/>}></Route>
        <Route path={'/Profile'} element={portalData?<Profile/>:<Signin/>}></Route>
        <Route path={'/PanCard'} element={<PanCard/>}></Route>
        <Route path={'/NewPanCard'} element={<NewPanCard/>}></Route>
        <Route path={'/NewPanCardAllState'} element={<NewPanCardAllState/>}></Route>
        <Route path={'/user/change-password'} element={portalData?<ChangePassword/>:<Signin/>}></Route>
        <Route path={'/user/upload'} element={portalData?<Upload/>:<Signin/>}></Route>
        <Route path={'/user/upload-document/:id'} element={portalData?<UploadDocument/>:<Signin/>}></Route>
        <Route path={'/user/final-confirm-apply/:id'} element={portalData?<FinalApplyConfirm/>:<Signin/>}></Route>
        <Route path={'/user/applied-success'} element={portalData?<PanApplySuccess/>:<Signin/>}></Route>
        <Route path={'/user/pan-receipt'} element={portalData?<Receipt/>:<Signin/>}></Route>
        <Route path={'/user/pan-edit'} element={portalData?<EditPan/>:<Signin/>}></Route>
        <Route path={'*'} element={<h1>404 Page Not Found</h1>}></Route>
        <Route path={'/PanCardForm/:catagory'} element={<PanCardForm/>}></Route>
        <Route path={'/user/upload/PanUploadEdit/:id'} element={<PanUploadEdit/>}></Route>
        <Route path={'/AdminDash'} element={<AdminDash/>}></Route>
        <Route path={'/AdminUser'} element={<AdminUser/>}></Route>
        <Route path={'/AminPerson/:id'} element={<AminPerson/>}></Route>
        <Route path={'/AdminPanCard'} element={<AdminPanCard/>}></Route>
        <Route path={'/AdminPanCard/AdminPanCardPerson/:id'} element={<AdminPanCardPerson/>}></Route>
    </Routes>
)
}