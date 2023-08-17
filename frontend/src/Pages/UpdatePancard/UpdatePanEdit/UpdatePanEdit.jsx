import './UpdatePanEdit.css';
import { PanCardNav } from '../../../Components/PanCardNav/PanCardNav'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import date from 'date-and-time';
import axios from 'axios';
import { city, city_data } from '../../../city.js'
import { Footer } from '../../../Components/Footer/Footer';
import { useToast, Box } from "@chakra-ui/react";
import { array1To31, monthsArray, yearsArray } from '../../../FromElement.js'

export const UpdatePanEdit = () => {
    const VDP_form_data = JSON.parse(localStorage.getItem('VDP_form_data')) || null
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
    const [residenceIndividual, setResidenceIndividual] = useState(false);
    const [formEdit, setFormEdit] = useState(true);
    const [correction_section_1, setCorrection_section_1] = useState(false);
    const [correction_section_2, setCorrection_section_2] = useState(false);
    const [correction_section_3, setCorrection_section_3] = useState(false);
    const [correction_section_4, setCorrection_section_4] = useState(false);
    const [correction_section_5, setCorrection_section_5] = useState(false);

    const catagory = VDP_form_data.category
    const now = new Date();
    let currentDate = date.format(now, 'YYYY-MMM-DD');
    const navigate = useNavigate()
    const toast = useToast()


    const [formData, setFormData] = useState({
        category: catagory.split('-')[0],
        date: currentDate,

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
        representativetitle: '',
        representativelastName: '',
        representativefirstName: '',
        representativemiddleName: '',
        representativeflatNumber: '',
        representativepremisesName: '',
        representativeroadName: '',
        representativearea: '',
        representativecityDistrict: '',
        representativestate: '',
        representativezipCode: '',
        representativecountry: '',
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

        if (name == 'firstName' || name == 'middleName' || name == 'lastName' || name == 'father_FName' || name == 'father_MName' || name == 'father_LName') {
            setFormData((prevData) => ({ ...prevData, [name]: value.charAt(0).toUpperCase() + value.slice(1) }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
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

    }

    const handleEdit = (e) => {
        e.preventDefault()
        setFormEdit(!formEdit)

        if (!formEdit) {
            toast({ title: 'EDIT SAVE', status: 'success', duration: 2000, isClosable: true, position: 'top' })
        }

    }
    // ${baseurl}/user/pan-update
    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.aadhaarNumber.length == 0 || formData.zipCode.length == 0) {
            axios.post("http://localhost:8080/user/pan-update", formData, {
                headers: { "Authorization": portalData.token }
            }).then((res) => {
                toast({
                    title: 'SUBMITED',
                    description: "PAN CARD FORM SUBMITTED SUCCESSFULLY",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-center',
                })

            }).catch((err) => {
                console.log(err);
            })

            navigate('/user/upload')
        }
        else if (catagory == 'Individual' && formData.aadhaarNumber.length != 12) {
            toast({
                title: 'Aadhaar Number',
                description: "Aadhaar Number should have 12 Charecter",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-center',
            })
        } else if (formData.zipCode.length != 6) {
            toast({
                title: 'Zip Code',
                description: "PIN Code Number should have 6 Charecter",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-center',
            })
        } else {
            // localStorage.setItem("VDP_form_data", JSON.stringify(formData))

            axios.post("http://localhost:8080/user/pan-update", formData, {
                headers: { "Authorization": portalData.token }
            }).then((res) => {
                console.log(res.data);
                toast({
                    title: 'SUBMITED',
                    description: "PAN CARD FORM SUBMITTED SUCCESSFULLY",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-center',
                })

            }).catch((err) => {
                console.log(err);
            })

            // navigate('/user/upload')
        }

    }



    useEffect(() => {
        setFormData(VDP_form_data)
        setCorrection_section_1(VDP_form_data.correction_section_1)
        setCorrection_section_2(VDP_form_data.correction_section_2)
        setCorrection_section_3(VDP_form_data.correction_section_3)
        setCorrection_section_4(VDP_form_data.correction_section_4)
        setCorrection_section_5(VDP_form_data.correction_section_5)
    }, [])

    console.log(formData)

    return (
        <div style={{ backgroundColor: 'rgba(201, 201, 201, 0.249)' }}>
            <div><PanCardNav /></div>

            <div style={{ paddingTop: '1cm', paddingBottom: '1cm', backgroundColor: 'white' }}>

                <h1 className='editpan_head'>PANCARD REVIEW</h1>

                <form onSubmit={handleSubmit}>
                    {/* all */}
                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}


                    {/* Others */}

                    {formEdit ? <table className='form_details_1'>
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Category of Applicant</td>
                                <td>{formData.category}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>{formData.date}</td>
                            </tr>
                            <tr>
                                <td>Pan Card</td>
                                <td>{formData.panNumber}</td>
                            </tr>
                            <tr>
                                <td>Title</td>
                                <td>{formData.title}</td>
                            </tr>
                            <tr>
                                <td>First Name</td>
                                <td>{formData.firstName}</td>
                            </tr>
                            <tr>
                                <td>Middle Name</td>
                                <td>{formData.middleName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{formData.lastName}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{formData.gender}</td>
                            </tr>
                            <tr>
                                <td>Date of Birth</td>
                                <td>{formData.dateOfBirth}</td>
                            </tr>
                            <tr>
                                <td>Month</td>
                                <td>{formData.monthOfBirth}</td>
                            </tr>
                            <tr>
                                <td>Year</td>
                                <td>{formData.yearOfBirth}</td>
                            </tr>
                            <tr>
                                <td>Father's First Name</td>
                                <td>{formData.father_FName}</td>
                            </tr>
                            <tr>
                                <td>Father's Middle Name</td>
                                <td>{formData.father_MName}</td>
                            </tr>
                            <tr>
                                <td>Father's Last Name</td>
                                <td>{formData.father_LName}</td>
                            </tr>
                            <tr>
                                <td>Residence Address</td>
                                <td>{formData.Address}</td>
                            </tr>
                            <tr>
                                <td>Flat/Door/Block</td>
                                <td>{formData.flatNumber}</td>
                            </tr>
                            <tr>
                                <td>Premises/Building/Village</td>
                                <td>{formData.premisesName}</td>
                            </tr>
                            <tr>
                                <td>Road/Street/Lane/Post Office</td>
                                <td>{formData.roadName}</td>
                            </tr>
                            <tr>
                                <td>Area/Locality</td>
                                <td>{formData.area}</td>
                            </tr>
                            <tr>
                                <td>Town/City/District</td>
                                <td>{formData.cityDistrict}</td>
                            </tr>
                            <tr>
                                <td>State/Union Territory</td>
                                <td>{formData.state}</td>
                            </tr>
                            <tr>
                                <td>Zip Code</td>
                                <td>{formData.zipCode}</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{formData.country}</td>
                            </tr>
                            <tr>
                                <td>Telephone ISD Code</td>
                                <td>{formData.telephoneISDCode}</td>
                            </tr>
                            <tr>
                                <td>Telephone/Mobile number</td>
                                <td>{formData.telephoneNumber}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{formData.email}</td>
                            </tr>
                            <tr>
                                <td>Aadhaar Number</td>
                                <td>{formData.aadhaarNumber}</td>
                            </tr>
                            <tr>
                                <td>AADHAAR Name</td>
                                <td>{formData.aadhaarName}</td>
                            </tr>
                            <tr>
                                <td>RA Title</td>
                                <td>{formData.representativetitle}</td>
                            </tr>
                            <tr>
                                <td>RA First name</td>
                                <td>{formData.representativefirstName}</td>
                            </tr>
                            <tr>
                                <td>RA Middle Name</td>
                                <td>{formData.representativemiddleName}</td>
                            </tr>
                            <tr>
                                <td>RA Last Name</td>
                                <td>{formData.representativelastName}</td>
                            </tr>
                            <tr>
                                <td>RA Flat/Door/Block Number</td>
                                <td>{formData.representativeflatNumber}</td>
                            </tr>
                            <tr>
                                <td>RA Name of Premises/Building/Village</td>
                                <td>{formData.representativepremisesName}</td>
                            </tr>
                            <tr>
                                <td>RA Road/Street/Lane/Post Office</td>
                                <td>{formData.representativeroadName}</td>
                            </tr>
                            <tr>
                                <td>RA Area/Locality/Taluka/Sub-Division</td>
                                <td>{formData.representativearea}</td>
                            </tr>
                            <tr>
                                <td>RA Town/City/District</td>
                                <td>{formData.representativecityDistrict}</td>
                            </tr>
                            <tr>
                                <td>RA State/Union Territory</td>
                                <td>{formData.representativestate}</td>
                            </tr>
                            <tr>
                                <td>RA Zip Code</td>
                                <td>{formData.representativezipCode}</td>
                            </tr>
                            <tr>
                                <td>RA Country</td>
                                <td>{formData.representativecountry}</td>
                            </tr>
                            <tr>
                                <td>Verifier Name</td>
                                <td>{formData.verifierName}</td>
                            </tr>
                            <tr>
                                <td>Applicant</td>
                                <td>{formData.declarationCapacity}</td>
                            </tr>
                            <tr>
                                <td>Number of documents</td>
                                <td>{formData.numberofdocuments}</td>
                            </tr>
                            <tr>
                                <td>Identity Proof</td>
                                <td>{formData.identityProof}</td>
                            </tr>
                            <tr>
                                <td>Address Proof</td>
                                <td>{formData.addressProof}</td>
                            </tr>
                            <tr>
                                <td>DOB Proof</td>
                                <td>{formData.verificationDate}</td>
                            </tr>
                            <tr>
                                <td>Pancard Proof</td>
                                <td>{formData.pancardProof}</td>
                            </tr>
                            <tr>
                                <td>Verifier Place</td>
                                <td>{formData.verifierPlace}</td>
                            </tr>
                            <tr>
                                <td>Verification Date</td>
                                <td>{formData.verificationDate}</td>
                            </tr>
                            <tr>
                                <td>PAN Fee</td>
                                <td>₹ {formData.PanFee}</td>
                            </tr>
                        </tbody>
                    </table> : null}

                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}

                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}

                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}

                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}

                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}

                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}

                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}

                    {!formEdit && residenceIndividual ? <div className="individualPerson_2">
                        <h1>Representative Assessee</h1>
                        <div>
                            <div>
                                <p>Title<i>*</i></p>
                                <select required name='representativetitle' value={formData.representativetitle} onChange={handleChange} >
                                    <option value="" disabled>Title</option>
                                    <option value="Shri">Shri</option>
                                    <option value="Smt">Smt</option>
                                    <option value="Kumari">Kumari</option>
                                </select>
                            </div>
                            <div>
                                <p>Last Name<i>*</i></p>
                                <input type="text" placeholder='Last Name' onBlur={handleBlur} required name='representativelastName' value={formData.representativelastName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Middle Name</p>
                                <input type="text" placeholder='Middle Name' onBlur={handleBlur} name='representativemiddleName' value={formData.representativemiddleName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>First name</p>
                                <input type="text" placeholder='First Name' onBlur={handleBlur} name='representativefirstName' value={formData.representativefirstName} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                        </div>

                        <div>
                            <div>
                                <p>Flat/Door/Block Number<i>*</i></p>
                                <input type="text" placeholder='Flat/Door/Block Number' required name='representativeflatNumber' value={formData.representativeflatNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Name of Premises/Building/Village<i>*</i></p>
                                <input type="text" placeholder='Name of Premises/Building/Village' required name='representativepremisesName' value={formData.representativepremisesName} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Road/Street/Lane/Post Office<i>*</i></p>
                                <input type="text" placeholder='Road/Street/Lane/Post Office' required name='representativeroadName' value={formData.representativeroadName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Area/Locality/Taluka/Sub-Division<i>*</i></p>
                                <input type="text" placeholder='Area/Locality/Taluka/Sub-Division' required name='representativearea' value={formData.representativearea} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Town/City/District<i>*</i></p>
                                <input type="text" placeholder='Town/City/District' required name='representativecityDistrict' value={formData.representativecityDistrict} onChange={handleChange} />
                            </div>
                            <div>
                                <p>State/Union Territory<i>*</i></p>
                                <select required name='representativestate' value={formData.representativestate} onChange={handleChange}>
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
                                <input type="number" placeholder='Zip Code' required name='representativezipCode' value={formData.representativezipCode} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Country<i>*</i></p>
                                <select required name='representativecountry' value={formData.representativecountry} onChange={handleChange}>
                                    <option value="" disabled>Country</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                        </div>
                    </div> : null}

                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}

                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}

                    {!formEdit ? <div className="individualPerson_2">
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
                    </div> : null}


                    {/* all */}
                    {!formEdit ? <div className="editpan_2">
                        <h2>Note : Physical PAN card will be delivered to applicant's address. e-PAN will be sent to applicant's e-mail.</h2>
                        <div>
                            <div>
                                <p>Select the required option<i>*</i></p>
                                <select disabled={formEdit} required name='requiredOption' value={formData.requiredOption} onChange={handleChange} >
                                    <option value="Both Physical PAN Card and e-PAN">Both Physical PAN Card and e-PAN</option>
                                </select>
                            </div>
                            <div>
                                <p>PAN Fee</p>
                                <input type="number" placeholder='₹ 107' disabled />
                            </div>
                        </div>
                    </div> : null}


                    <div className='editpan_3'>
                        <p style={{ backgroundColor: formEdit ? '#00aeff' : null, color: 'rgb(59, 59, 59)', cursor: 'pointer' }} onClick={handleEdit}>{formEdit ? 'EDIT' : 'SAVE'}</p>
                        {formEdit ? <button type='submit'>SUBMIT</button> : null}
                    </div>
                </form>
            </div>

            <div><Footer /></div>
        </div>
    )
}


