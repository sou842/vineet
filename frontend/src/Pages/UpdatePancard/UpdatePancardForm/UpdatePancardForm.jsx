import './UpdatePancardForm.css';
import { DashboardFooter } from '../../../Components/DashboradFooter/DashboradFooter'
import { PanCardNav } from '../../../Components/PanCardNav/PanCardNav'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import date from 'date-and-time';
import { city, city_data } from '../../../city.js'
import { Footer } from '../../../Components/Footer/Footer';
import { useToast, Box } from "@chakra-ui/react";
import { array1To31, monthsArray, yearsArray } from '../../../FromElement.js'
import { differenceInYears } from 'date-fns';


export const UpdatePancardForm = () => {
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
    const [correction_section_1, setCorrection_section_1] = useState(false);
    const [correction_section_2, setCorrection_section_2] = useState(false);
    const [correction_section_3, setCorrection_section_3] = useState(false);
    const [correction_section_4, setCorrection_section_4] = useState(false);
    const [correction_section_5, setCorrection_section_5] = useState(false);

    const { catagory } = useParams();
    const now = new Date();
    let currentDate = date.format(new Date(), 'YYYY-MMM-DD');
    let currentTime = date.format(new Date(), 'hh:mm:ss A');
    const navigate = useNavigate()
    const toast = useToast()

    // category: catagory.replace(/-/g, ' '),

    const [formData, setFormData] = useState({
        category: catagory.split('-')[0],
        date: currentDate+' '+currentTime,

        firstName: '',
        middleName: '',
        lastName: '',
        title: '',
        gender: '',
        dateOfBirth: '',
        monthOfBirth: '',
        yearOfBirth: '',
        Address: '',
        flatNumber: '',
        premisesName: '',
        roadName: '',
        area: '',
        cityDistrict: '',
        state: '',
        zipCode: '',
        country: 'India',
        telephoneISDCode: 'India',
        telephoneNumber: '',
        email: '',
        aadhaarNumber: '',
        aadhaarName: '',
        identityProof: '',
        addressProof: '',
        dobProof: '',
        declarationCapacity: '',
        verifierName: '',
        verifierPlace: '',
        verificationDate: currentDate,
        requiredOption: 'Both Physical PAN Card and e-PAN',
        isDoneFromUser: false,
        PanFee: 107,
        father_FName: '',
        father_MName: '',
        father_LName: '',
        NameOnCard: '',

        isUpload: false,
        // new added  
        ageOfTheUser: '',
        slipGenerateDate: "",
        acknowledgement: "",
        panStatus: "pending",

        numberofdocuments: '',
        pancardProof: '',
        panNumber: '',
        correction_section_1: '',
        correction_section_2: '',
        correction_section_3: '',
        correction_section_4: '',
        correction_section_5: '',
        madeFor: 'update'
    })

    const age_month = { "January": "1", "February": "2", "March": "3", "April": "4", "May": "5", "June": "6", "July": "7", "August": "8", "September": "9", "October": "10", "November": "11", "December": "12" }
    const birthdate = new Date(`${formData.yearOfBirth}-${age_month[formData.monthOfBirth]}-${formData.dateOfBirth}`)
    const age = differenceInYears(new Date(), birthdate);
    // console.log(age);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name == 'city' && value != '') {
            setFormData((prevData) => ({ ...prevData, ['areaCode']: city_data[value]['Area Code'] }))
            setFormData((prevData) => ({ ...prevData, ['aotype']: city_data[value]['AO Type'] }))
            setFormData((prevData) => ({ ...prevData, ['rangeCode']: city_data[value]['Range Code'] }))
            setFormData((prevData) => ({ ...prevData, ['aoNo']: city_data[value]['AO Number'] }))
        }
        if (name == 'title' && value == 'Shri' && value != '') {
            setFormData((prevData) => ({ ...prevData, ['gender']: 'Male' }));
        }
        if (name == 'title' && value == 'Smt' && value != '') {
            setFormData((prevData) => ({ ...prevData, ['gender']: 'Female' }));
        }
        if (name == 'title' && value == 'Kumari' && value != '') {
            setFormData((prevData) => ({ ...prevData, ['gender']: 'Female' }));
        }
        if (name == 'correction_section_1') {
            setFormData((prevData) => ({ ...prevData, ['correction_section_1']: !formData.correction_section_1 }));
        }
        if (name == 'firstName' || name == 'middleName' || name == 'lastName' || name == 'father_FName' || name == 'father_MName' || name == 'father_LName') {
            setFormData((prevData) => ({ ...prevData, [name]: value.charAt(0).toUpperCase() + value.slice(1) }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
            setFormData((prevData) => ({ ...prevData, ['ageOfTheUser']: age }));

        }

    }

    const handleBlur = () => {

        if (formData.middleName) {
            setFormData((prevData) => ({ ...prevData, ['aadhaarName']: formData.firstName + ' ' + formData.middleName + ' ' + formData.lastName }))
            setFormData((prevData) => ({ ...prevData, ['NameOnCard']: formData.firstName + ' ' + formData.middleName + ' ' + formData.lastName }))
            setFormData((prevData) => ({ ...prevData, ['verifierName']: formData.firstName + ' ' + formData.middleName + ' ' + formData.lastName }))
        } else {
            setFormData((prevData) => ({ ...prevData, ['aadhaarName']: formData.firstName + ' ' + formData.lastName }))
            setFormData((prevData) => ({ ...prevData, ['NameOnCard']: formData.firstName + ' ' + formData.lastName }));
            setFormData((prevData) => ({ ...prevData, ['verifierName']: formData.firstName + ' ' + formData.lastName }));
        }
        setFormData((prevData) => ({ ...prevData, ['correction_section_1']: correction_section_1 }));
        setFormData((prevData) => ({ ...prevData, ['correction_section_2']: correction_section_2 }));
        setFormData((prevData) => ({ ...prevData, ['correction_section_3']: correction_section_3 }));
        setFormData((prevData) => ({ ...prevData, ['correction_section_4']: correction_section_4 }));
        setFormData((prevData) => ({ ...prevData, ['correction_section_5']: correction_section_5 }));

        console.log('trigered')

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.aadhaarNumber.length == 0 || formData.zipCode.length == 0) {
            localStorage.setItem("VDP_form_data", JSON.stringify(formData))
            navigate('/UpdatePanEdit')
        }
        else if (formData.aadhaarNumber.length != 12) {
            toast({
                title: 'Aadhaar Number',
                description: "Aadhaar Number should have 12 Charecter",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-center',
            })
        } else if (formData.zipCode.length != 6 || formData.zipCode.length == 0) {

            toast({
                title: 'Zip Code',
                description: "PIN Code Number should have 6 Charecter",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-center',
            })
        } else {
            localStorage.setItem("VDP_form_data", JSON.stringify(formData))
            navigate('/UpdatePanEdit')
        }

    }



    useEffect(() => {

        setFormData((prevData) => ({ ...prevData, ['Address']: 'RESIDENCE ADDRESS' }))
        setFormData((prevData) => ({ ...prevData, ['identityProof']: 'AADHAR Card issued by UIDAL (In Copy)' }))
        setFormData((prevData) => ({ ...prevData, ['addressProof']: 'AADHAR Card issued by UIDAL (In Copy)' }))
        setFormData((prevData) => ({ ...prevData, ['dobProof']: 'AADHAR Card issued by UIDAL (In Copy)' }))


    }, [age])

    console.log(formData)

    return (
        <div style={{ backgroundColor: 'rgba(201, 201, 201, 0.249)' }}>
            <div><PanCardNav /></div>

            <div >

                <h1 className='individualPerson_head'>PANCARD UPDATE</h1>

                <form onSubmit={handleSubmit}>
                    {/* all */}
                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>Category of Applicant<i>*</i></p>
                                <input type="text" placeholder={catagory} disabled name='category' value={formData.category} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Date</p>
                                <input type="text" placeholder={currentDate} disabled name='date' value={formData.date} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>PAN Number of Applicant<i>*</i></p>
                                <input type="text" placeholder={'PAN Number'} name='panNumber' value={formData.panNumber} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Individual */}
                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>
                                    <input type="checkbox" name='correction_section_1' onBlur={handleBlur} checked={correction_section_1} onChange={() => setCorrection_section_1(!correction_section_1)} /> Full Name* (Full extended name, address, dob to be mentioned as appearing in proof of identity /address/ dob documents. Initials are not allowed)
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Title<i>*</i></p>
                                <select required name='title' value={formData.title} onChange={handleChange} >
                                    <option value="" disabled>Title</option>
                                    <option value="Shri">Shri</option>
                                    <option value="Smt">Smt</option>
                                    <option value="Kumari">Kumari</option>
                                </select>
                            </div>
                            <div>
                                <p>First name<i>*</i></p>
                                <input type="text" placeholder='First Name' onBlur={handleBlur} required name='firstName' value={formData.firstName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Middle Name</p>
                                <input type="text" placeholder='Middle Name' onBlur={handleBlur} name='middleName' value={formData.middleName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Last Name<i>*</i></p>
                                <input type="text" placeholder='Last Name' onBlur={handleBlur} required name='lastName' value={formData.lastName} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Name on Card</p>
                                <input type="text" placeholder='Name on Card' name='NameOnCard' disabled value={formData.NameOnCard} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" name='correction_section_2' onBlur={handleBlur} checked={correction_section_2} onChange={() => setCorrection_section_2(!correction_section_2)} />Details of Date of Birth
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Gender<i>*</i></p>
                                <select required name='gender' value={formData.gender} onChange={handleChange} >
                                    <option value="" disabled>Gender</option>
                                    {formData.gender ?
                                        <>
                                            <option value={formData.gender}>{formData.gender}</option>
                                            <option value="Transgender">Transgender</option>
                                        </>
                                        :
                                        <></>
                                    }
                                </select>
                            </div>

                            <div>
                                <p>Date of Birth<i>*</i></p>
                                <select required name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange}>
                                    <option value="" disabled>Date of Birth</option>
                                    {array1To31 && array1To31?.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <p>Month<i>*</i></p>
                                <select required name='monthOfBirth' value={formData.monthOfBirth} onChange={handleChange}>
                                    <option value="" disabled>Month</option>
                                    {monthsArray && monthsArray?.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <p>Year<i>*</i></p>
                                <select required name='yearOfBirth' value={formData.yearOfBirth} onChange={handleChange}>
                                    <option value="" disabled>Year</option>
                                    {yearsArray && yearsArray?.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <h2>Details of Parents ( applicable only for Individual applicants )</h2>
                        <div>
                            <div>
                                <p>If yes, please fill in mother's name in the appropriate space provide below.</p>
                                <select>
                                    <option>NO</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Gudiance</p>
                                <select>
                                    <option>Father</option>
                                </select>
                            </div>
                            <div>
                                <p>Father's First Name<i>*</i></p>
                                <input type="text" required placeholder='first Name' name='father_FName' value={formData.father_FName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Father's Middle Name</p>
                                <input type="text" placeholder='middle Name' name='father_MName' value={formData.father_MName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Father's Last Name<i>*</i></p>
                                <input type="text" required placeholder='last Name' name='father_LName' value={formData.father_LName} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p style={{ display: 'flex', alignItems: 'center' }}>
                                    <input onBlur={handleBlur} type="checkbox" name='correction_section_3' checked={correction_section_3} onChange={() => setCorrection_section_3(!correction_section_3)} /> Photo Mismatch *
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p style={{ display: 'flex', alignItems: 'center' }}>
                                    <input onBlur={handleBlur} type="checkbox" name='correction_section_4' checked={correction_section_4} onChange={() => setCorrection_section_4(!correction_section_4)} /> Signature Mismatch *
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <h2>Address for Communication(If you want to selected Office Address then Required Office Address Proof)</h2>
                        <div>
                            <div>
                                <p>Residence Address<i>*</i></p>
                                <select required name='Address' value={formData.Address} onChange={handleChange}>
                                    <option value={formData.Address}>{formData.Address}</option>
                                </select>
                            </div>
                        </div>

                        <h1>RESSIDENCE ADDRESS</h1>
                        <div>
                            <div>
                                <p>Flat/Door/Block Number<i>*</i></p>
                                <input type="text" placeholder='Flat/Door/Block Number' required name='flatNumber' value={formData.flatNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Name of Premises/Building/Village<i>*</i></p>
                                <input type="text" placeholder='Name of Premises/Building/Village' required name='premisesName' value={formData.premisesName} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Road/Street/Lane/Post Office<i>*</i></p>
                                <input type="text" placeholder='Road/Street/Lane/Post Office' required name='roadName' value={formData.roadName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Area/Locality/Taluka/Sub-Division<i>*</i></p>
                                <input type="text" placeholder='Area/Locality/Taluka/Sub-Division' required name='area' value={formData.area} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Town/City/District<i>*</i></p>
                                <input type="text" placeholder='Town/City/District' required name='cityDistrict' value={formData.cityDistrict} onChange={handleChange} />
                            </div>
                            <div>
                                <p>State/Union Territory<i>*</i></p>
                                <select required name='state' value={formData.state} onChange={handleChange}>
                                    <option value="" disabled>State/Union Territory</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                    <option value="Daman and Diu">Daman and Diu</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Puducherry">Puducherry</option>
                                    <option value="Ladakh">Ladakh</option>
                                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Zip Code<i>*</i></p>
                                <input type="number" placeholder='Zip Code' required name='zipCode' value={formData.zipCode} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Country<i>*</i></p>
                                <select required name='country' value={formData.country} onChange={handleChange}>
                                    <option value="" disabled>Country</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>Telephone ISD Code<i>*</i></p>
                                <select required name='telephoneISDCode' value={formData.telephoneISDCode} onChange={handleChange}>
                                    <option value="" disabled>Telephone ISD Code</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div>
                                <p>Telephone/Mobile number<i>*</i></p>
                                <input type="number" placeholder='Telephone/Mobile number' required name='telephoneNumber' value={formData.telephoneNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Email Id<i>*</i></p>
                                <input type="email" placeholder='Email ID' required name='email' value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p style={{ display: 'flex', alignItems: 'center' }}>
                                    <input onBlur={handleBlur} type="checkbox" name='correction_section_5' checked={correction_section_5} onChange={() => setCorrection_section_5(!correction_section_5)} />
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>AADHAAR Number<i>*</i></p>
                                <input type="number" placeholder='AADHAAR Number' required name='aadhaarNumber' value={formData.aadhaarNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Name as per AADHAAR</p>
                                <input type="text" placeholder={'Name as per AADHAAR'} disabled name='aadhaarName' value={formData.aadhaarName} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <p>Verification <i>*</i></p>
                        <div>
                            <div>
                                <p>I/We<i>*</i></p>
                                <input type="text" placeholder='Verifier Name' required name='verifierName' value={formData.verifierName} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>The applicant, in the capacity of <i>*</i></p>
                                <select required name='declarationCapacity' value={formData.declarationCapacity} onChange={handleChange}>
                                    <option value="" disabled>Select</option>
                                    <option value="HIMSELF/HERSELF">HIMSELF / HERSELF</option>
                                </select>
                                <p>do hereby declare that what is started above is true to the best of my/our information and belief.</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>I/We have enclosed <i>*</i></p>
                                <select required name='numberofdocuments' value={formData.numberofdocuments} onChange={handleChange}>
                                    <option value="" disabled>Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <p>(Number of documents) in support of proposed changes/corrections.</p>
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>Which of these documents are you submitting as an Identity Proof<i>*</i></p>
                                <select required name='identityProof' value={formData.identityProof} onChange={handleChange}>
                                    <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Which of these documents are you submitting as an Address Proof<i>*</i></p>
                                <select required name='addressProof' value={formData.addressProof} onChange={handleChange}>
                                    <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Which of these documents are you submitting as a DOB Proof<i>*</i></p>
                                <select required name='dobProof' value={formData.dobProof} onChange={handleChange}>
                                    <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Which of these documents are you submitting as a PAN Proof<i>*</i></p>
                                <select required name='pancardProof' value={formData.pancardProof} onChange={handleChange}>
                                    <option value="" disabled>Select PAN Proof</option>
                                    <option value="Copy of FIR">Copy of FIR</option>
                                    <option value="Copy of PAN Allotment Letter">Copy of PAN Allotment Letter</option>
                                    <option value="Copy of PAN Card">Copy of PAN Card</option>
                                    <option value="No Document">No Document</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>Verifier Place<i>*</i></p>
                                <input type="text" placeholder='Verifier Place' required name='verifierPlace' value={formData.verifierPlace} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Verification Date<i>*</i></p>
                                <input type="text" placeholder={currentDate} disabled name='verificationDate' value={formData.verificationDate} onChange={handleChange} />
                            </div>
                        </div>
                    </div>


                    {/* all */}
                    <div className="individualPerson_2">
                        <h2>Note : Physical PAN card will be delivered to applicant's address. e-PAN will be sent to applicant's e-mail.</h2>
                        <div>
                            <div>
                                <p>Select the required option<i>*</i></p>
                                <select required name='requiredOption' value={formData.requiredOption} onChange={handleChange}>
                                    <option value="Both Physical PAN Card and e-PAN">Both Physical PAN Card and e-PAN</option>
                                </select>
                            </div>
                            <div>
                                <p>PAN Fee</p>
                                <input type="number" placeholder='₹ 107' disabled />
                            </div>
                        </div>
                    </div>

                    <button className='individualPerson_3' type='submit'>NEXT</button>
                </form>
            </div>

            <div className='dashboard_1'>
                <p>आपका वॉलेट बैलेंस कम है. Balance : Rs. 0. पैन कार्ड अप्लाई करने के लिए कम से कम वॉलेट में Rs.107/- होना अनिवार्य है</p>
            </div>
            <div className='dashboard_1'>
                <p>हम आपसे अनुरोध करते हैं कि डिजिटल इंडिया पोर्टल द्वारा प्रदान की जा रही अन्य सुविधाएं जैसे बिजली बिल का भुगतान, मोबाइल रिचार्ज, डीटीएच रिचार्ज, GST रजिस्ट्रेशन, ITR फाइलिंग जैसी अन्य सुविधाओं का भी आप लाभ उठाएं और हम आपको भरोसा दिलाते हैं कि भविष्य में डिजिटल इंडिया पोर्टल आपको और भी सुविधाएं प्रदान करेगा डिजिटल इंडिया पोर्टल के साथ जुड़े रहने के लिए धन्यवाद</p>
            </div>

            <div><Footer /></div>
        </div>
    )
}