import { AdminNavbar } from '../AdminNavbar/AdminNavbar.jsx';
import { AdminSlider } from '../AdminSlider/AdminSlider';
import './AdminDash.css';
import { Link } from "react-router-dom"


export const AdminDash = () =>{


return (
    <div>
    <div><AdminNavbar/></div>
    <div className='AdminDash_0'>
        <div style={{width:'24%',height:'100%'}}>
            <AdminSlider slidevalue={'AdminDash'}/>
        </div>

        <div style={{width:'75%'}}>
        <Link to={'/AdminUser'}>Adminuser</Link>
        </div>
    </div>
    </div>
)
}