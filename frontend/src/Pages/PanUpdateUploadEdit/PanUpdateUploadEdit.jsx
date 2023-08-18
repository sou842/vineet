import { useEffect, useState } from "react"
import { PanCardNav } from "../../Components/PanCardNav/PanCardNav"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { city, city_data } from '../../city.js';
import { array1To31, monthsArray, yearsArray } from '../../FromElement.js'
import { useToast } from "@chakra-ui/react"
import { differenceInYears } from 'date-fns';



export const PanUpdateUploadEdit = () => {
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null;
    const navigate = useNavigate()
    const toast = useToast()
    const { id } = useParams()
    const [correction_section_1, setCorrection_section_1] = useState(false);
    const [correction_section_2, setCorrection_section_2] = useState(false);
    const [correction_section_3, setCorrection_section_3] = useState(false);
    const [correction_section_4, setCorrection_section_4] = useState(false);
    const [correction_section_5, setCorrection_section_5] = useState(false);
    const [formData, setFormData] = useState();

    const age_month = { "January": "1", "February": "2", "March": "3", "April": "4", "May": "5", "June": "6", "July": "7", "August": "8", "September": "9", "October": "10", "November": "11", "December": "12" }
    const birthdate = new Date(`${formData&&formData.yearOfBirth}-${age_month[formData&&formData.monthOfBirth]}-${formData&&formData.dateOfBirth}`)
    const age = differenceInYears(new Date(), birthdate);


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
            // setFormData((prevData) => ({ ...prevData, ['ageOfTheUser']: age }));

        }
    }
// /pan-update/

    const handleSubmit = (event) => {
        event.preventDefault();
        toast({ title: 'UPLOADING...', status: 'success', duration: 4000, isClosable: true, position: 'top' })

        axios.patch(`http://localhost:8080/user/pan-update/${id}`, formData, {
            headers: { "Authorization": portalData.token }
        }).then((data) => {
            // console.log(data.data)
            navigate('/user/upload')
        })
            .catch((err) => {
                console.log(err)
                toast({ title: 'Try Again, Something Wrong!!!', status: 'error', duration: 4000, isClosable: true, position: 'top' })
            })

    }


    useEffect(() => {

        axios.get(`http://localhost:8080/user/pan-update-single/${id}`, {
            headers: { "Authorization": portalData.token }
        }).then((data) => {
            setFormData(data.data)
            setCorrection_section_1(data.data.correction_section_1)
            setCorrection_section_2(data.data.correction_section_2)
            setCorrection_section_3(data.data.correction_section_3)
            setCorrection_section_4(data.data.correction_section_4)
            setCorrection_section_5(data.data.correction_section_5)

        })
        .catch((err) => {
            console.log(err)
        })

    }, [age])

    console.log(formData)

    return (
        <div style={{ backgroundColor: 'rgba(201, 201, 201, 0.249)' }}>
            <div><PanCardNav /></div>
            <div>
                {formData &&
                    <form onSubmit={handleSubmit}>
                        {/* all */}
                        <div className="individualPerson_2">
                            <div>
                                <div>
                                    <p>Category of Applicant<i>*</i></p>
                                    <input type="text" placeholder={formData.catagory} disabled name='category' value={formData.category} onChange={handleChange} />
                                </div>
                                <div>
                                    <p>Date</p>
                                    <input type="text" placeholder={formData.currentDate} disabled name='date' value={formData.date} onChange={handleChange} />
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

                        {/* {residenceIndividual  ? <div className="individualPerson_2">
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
                        </div> : null} */}

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
                                    <input type="text" placeholder={formData.currentDate} disabled name='verificationDate' value={formData.verificationDate} onChange={handleChange} />
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
                }
            </div>
        </div>
    )
}