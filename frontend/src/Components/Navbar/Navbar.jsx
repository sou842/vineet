import './Navbar.css'


export const Navbar = () =>{
    const portalData=JSON.parse(localStorage.getItem("digitalPortal"))||null

return (
    <nav>
        <div className='navbar_1'>
        <div>
           <a href="/">
            <img  src="https://digitalindiaportal.co.in/images/logo.png" alt="logo_1" />
            </a>
        </div>
        <div>
            VINEET DIGITAL PORTAL
        </div>
        <div>
            LOGO
        </div>
        </div>

        <div className='navbar_2'>
        <div><a href="/"><p>HOME</p></a></div>
        <div><a href="/About"><p>ABOUT</p></a></div>
        <div><a href="/Services"><p>SERVICES</p></a></div>
        <div><a href="/Privacy"><p>PRIVACY POLICY</p></a></div>
        <div><a href="/Contact"><p>CONTACT US</p></a></div>
        {
            portalData?<div><a href="/Dashboard"><p>DASHBOARD</p></a></div>:<div><a href="/signin"><p>LOGIN</p></a></div>
        }

        </div>

    </nav>
)
}