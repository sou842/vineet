import { Avatar, Wrap, WrapItem } from "@chakra-ui/react"
import './AdminNavbar.css'

export const AdminNavbar = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null


    return (
        <div>
            {/* <div className='AdminNavbar_1'>
                <div>
                    <a href="/">
                        <img src="https://digitalindiaportal.co.in/images/logo.png" alt="logo_1" />
                    </a>
                </div>
                <div>
                    VINEET DIGITAL PORTAL
                </div>
                <div>
                    <Wrap>
                        <WrapItem>
                            <Avatar color={'black'} bg='#00aeff' size={['md', 'md', 'lg']} name={portalData && portalData.username.match(/\b\w/g).join('').toUpperCase()} src={portalData && portalData.avatar} />
                        </WrapItem>
                    </Wrap>
                </div>
            </div>  */}
         </div>
    )
}