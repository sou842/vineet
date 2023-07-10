import './Navbar.css'


export const Navbar = () =>{


return (
    <nav>
        <div className='navbar_1'>
        <div>
            <img src="https://digitalindiaportal.co.in/images/logo.png" alt="logo_1" />
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
        <div><a href="#"><p>SERVICES</p></a></div>
        <div><a href="#"><p>PRIVACY POLICY</p></a></div>
        <div><a href="#"><p>CONTACT US</p></a></div>
        <div><a href="#"><p>LOGIN</p></a></div>

        </div>

    </nav>
)
}