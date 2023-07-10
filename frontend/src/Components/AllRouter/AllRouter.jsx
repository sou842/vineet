import { Routes, Route } from 'react-router-dom';
import { Home } from '../../Pages/Home/Home';
import { About } from '../../Pages/About/About';


export const AllRouter = () =>{

return (
    <Routes>
        <Route path={'/'} element={<Home/>}></Route>
        <Route path={'/About'} element={<About/>}></Route>
    </Routes>
)
}