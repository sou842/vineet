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
import { UpdatePanEdit } from '../../Pages/UpdatePancard/UpdatePanEdit/UpdatePanEdit';
import { AdminUpdatePanCard } from '../../Admin/AdminUpdatePanCard/AdminUpdatePanCard';
import { PanUpdateUploadEdit } from '../../Pages/PanUpdateUploadEdit/PanUpdateUploadEdit';
import NotFoundPage from '../../Pages/NotFoundPage/NotFoundPage';
import { PayDetails } from '../../Pages/PayDetails/PayDetails';
import {AdminPayData} from '../../Admin/AdminPayData/AdminPayData.jsx'
import { MobileRecharge } from '../../Pages/MobileRecharge/MobileRecharge';
import { DTHRecharge } from '../../Pages/DTHRecharge/DTHRecharge';
import { MobileRechargeTransaction } from '../../Pages/MobileRechargeTransaction/MobileRechargeTransaction';
import { DTHRechargeTransaction } from '../../Pages/DTHRechargeTransaction/DTHRechargeTransaction.jsx';
import { AdminMobile } from '../../Admin/AdminMobile/AdminMobile';
import { AdminDTH } from '../../Admin/AdminDTH/AdminDTH';
import AdminNotifications from '../../Admin/AdminNotifications/AdminNotifications';



export const AllRouter = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal"))
    const adminData = JSON.parse(localStorage.getItem("VDPadmin"))

    return (
        <Routes>
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'/About'} element={<About />}></Route>
            <Route path={'/Services'} element={<Services />}></Route>
            <Route path={'Contact'} element={<Contact />}></Route>
            <Route path={'/Privacy'} element={<Privacy />}></Route>
            <Route path={'/Signup'} element={<Signup />}></Route>
            <Route path={'/Signin'} element={<Signin />}></Route>
            <Route path={'/Dashboard'} element={portalData ? <Dashboard /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/Profile'} element={portalData ? <Profile /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/PanCard'} element={portalData ? <PanCard /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/NewPanCard'} element={portalData ? <NewPanCard /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/NewPanCardAllState'} element={portalData ? <NewPanCardAllState /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/user/change-password'} element={portalData ? <ChangePassword /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/user/upload'} element={portalData ? <Upload /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/user/upload-document/:id'} element={portalData ? <UploadDocument /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/user/final-confirm-apply/:id'} element={portalData ? <FinalApplyConfirm /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/user/applied-success'} element={portalData ? <PanApplySuccess /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/user/pan-receipt'} element={portalData ? <Receipt /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/user/pan-edit'} element={portalData ? <EditPan /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'*'} element={<NotFoundPage/>}></Route>
            <Route path={'/PanCardForm/:catagory'} element={portalData ? <PanCardForm /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/user/upload/PanUploadEdit/:id'} element={portalData ? <PanUploadEdit /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/AdminDash'} element={adminData ? <AdminDash /> : <Navigate to={'/admin/login'} />}></Route>
            <Route path={'/AdminUser'} element={<AdminUser />}></Route>
            <Route path={'/AdminUser/AminPerson/:id'} element={<AminPerson />}></Route>
            <Route path={'/AdminPanCard'} element={<AdminPanCard />}></Route>
            <Route path={'/AdminPanCard/AdminPanCardPerson/:props'} element={<AdminPanCardPerson />}></Route>
            <Route path={'/admin/login'} element={<Login />}></Route>
            <Route path={'/user/PanCardCompleted'} element={portalData ? <PanCardCompleted /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/UpdatePancard'} element={portalData ? <UpdatePancard /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/UpdatePancardForm/:catagory'} element={portalData ? <UpdatePancardForm /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/UpdatePanEdit'} element={portalData ? <UpdatePanEdit /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/AdminUpdatePanCard'} element={portalData ? <AdminUpdatePanCard /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/user/upload/PanUpdateUploadEdit/:id'} element={portalData ? <PanUpdateUploadEdit /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/PayDetails'} element={portalData ? <PayDetails /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/AdminPayData'} element={portalData ? <AdminPayData /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/MobileRecharge'} element={portalData ? <MobileRecharge /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/DTHRecharge'} element={portalData ? <DTHRecharge /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/MobileRechargeTransaction'} element={portalData ? <MobileRechargeTransaction /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/DTHRechargeTransaction'} element={portalData ? <DTHRechargeTransaction /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/AdminMobile'} element={portalData ? <AdminMobile /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/AdminDTH'} element={portalData ? <AdminDTH /> : <Navigate to={'/Signin'} />}></Route>
            <Route path={'/Admin-notifications'} element={portalData ? <AdminNotifications /> : <Navigate to={'/Signin'} />}></Route>


        </Routes>
    )
}