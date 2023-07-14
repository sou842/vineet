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
import { PanCard } from '../../Pages/PanCard/PanCard';


export const AllRouter = () =>{

return (
    <Routes>
        <Route path={'/'} element={<Home/>}></Route>
        <Route path={'/About'} element={<About/>}></Route>
        <Route path={'/Services'} element={<Services/>}></Route>
        <Route path={'Contact'} element={<Contact/>}></Route>
        <Route path={'/Privacy'} element={<Privacy/>}></Route>
        <Route path={'/Signup'} element={<Signup/>}></Route>
        <Route path={'/Signin'} element={<Signin/>}></Route>
        <Route path={'/Dashboard'} element={<Dashboard/>}></Route>
        <Route path={'/Profile'} element={<Profile/>}></Route>
        <Route path={'/PanCard'} element={<PanCard/>}></Route>
    </Routes>
)
}