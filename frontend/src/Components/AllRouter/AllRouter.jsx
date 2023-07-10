import { Routes, Route } from 'react-router-dom';
import { Home } from '../../Pages/Home/Home';
import { About } from '../../Pages/About/About';
import { Services } from '../../Pages/Services/Services';
import { Contact } from '../../Pages/Contact/Contact';


export const AllRouter = () =>{

return (
    <Routes>
        <Route path={'/'} element={<Home/>}></Route>
        <Route path={'/About'} element={<About/>}></Route>
        <Route path={'/Services'} element={<Services/>}></Route>
        <Route path={'Contact'} element={<Contact/>}></Route>
    </Routes>
)
}