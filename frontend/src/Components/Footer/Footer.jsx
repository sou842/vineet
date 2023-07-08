import './Footer.css'


export const Footer = () =>{


return (
    <footer>
        <div className="footer_0">
            <div>
                <h1>ADDRESS</h1>
                <div>
                <p>Number: +91 9903149299</p>
                <p>Number: +91 8963031521</p>
                <p> Email: helpVineetIndiaportal@gmail.com</p>
                <p>DIGITAL INDIA CENTRE,Pooja Market, Near Petrol Pump,Daurala, Meerut, Uttar Pradesh - 250221</p>
                </div>
            </div>
            <div>
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Email' />
                <input type="text" placeholder='Number'/>
                {/* <input type="text" placeholder='Massage'/> */}
                <textarea placeholder='Massage'></textarea>
            </div>
        </div>
        <div className="footer_1">© 2017-2023 Digital India Portal. All rights reserved</div>
    </footer>
)
}