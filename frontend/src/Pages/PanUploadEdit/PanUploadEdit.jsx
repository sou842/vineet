import { useEffect, useState } from "react"
import { PanCardNav } from "../../Components/PanCardNav/PanCardNav"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { city, city_data } from '../../city.js';
import { array1To31, monthsArray, yearsArray } from '../../FromElement.js'
import { useToast } from "@chakra-ui/react"



export const PanUploadEdit = () => {
    const baseURL = process.env.REACT_APP_BASE_URL
    const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null;
    const [residenceIndividual, setResidenceIndividual] = useState(true);
    const [sourceIncome, setSourceIncome] = useState(false);
    const [formData, setFormData] = useState();
    const navigate = useNavigate()
    const toast = useToast()
    const { id } = useParams()
    const catagory = 'Individual';


    // for patch
    // bseurl/user//pan-update/:id

    const handleBlur = () => {
        if (formData.middleName) {
            setFormData((prevData) => ({ ...prevData, ['aadhaarName']: formData.firstName + ' ' + formData.middleName + ' ' + formData.lastName }))
            setFormData((prevData) => ({ ...prevData, ['NameOnCard']: formData.firstName + ' ' + formData.middleName + ' ' + formData.lastName }))
        } else {
            setFormData((prevData) => ({ ...prevData, ['aadhaarName']: formData.firstName + ' ' + formData.lastName }))
            setFormData((prevData) => ({ ...prevData, ['NameOnCard']: formData.firstName + ' ' + formData.lastName }));
        }
        console.log('false')
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        toast({ title: 'UPLOADING...', status: 'success', duration: 4000, isClosable: true, position: 'top' })

        axios.patch(`${baseURL}/user/pan-edit/${id}`, formData, {
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

    const handleChange = (event) => {
        const { name, value } = event.target;

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
        }
        else if (name == 'zipCode') {
            if (isNaN(value) == false) setFormData((prevData) => ({ ...prevData, ['zipCode']: value }))
        }
        else if (name == 'representativezipCode') {
            if (isNaN(value) == false) setFormData((prevData) => ({ ...prevData, ['representativezipCode']: value }))
        }
        else if (name == 'officezipCode') {
            if (isNaN(value) == false) setFormData((prevData) => ({ ...prevData, ['officezipCode']: value }))
        }
        else if (name == 'aadhaarNumber') {
            if (isNaN(value) == false) setFormData((prevData) => ({ ...prevData, ['aadhaarNumber']: value }))
        }
        else if (name == 'telephoneNumber') {
            if (isNaN(value) == false) setFormData((prevData) => ({ ...prevData, ['telephoneNumber']: value }))
        }
        else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    }

    useEffect(() => {

        axios.get(`${baseURL}/user/upload-pan-card/${id}`, {
            headers: { "Authorization": portalData.token }
        }).then((data) => {
            // console.log(data.data)
            setFormData(data.data)
        })
            .catch((err) => {
                console.log(err)
            })

    }, [])


    return (
        <div style={{ backgroundColor: 'rgba(201, 201, 201, 0.249)' }}>
            <div><PanCardNav /></div>

            <div>
                {formData && <form onSubmit={handleSubmit}>
                    {/* all */}
                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>Category of Applicant<i>*</i></p>
                                <input type="text" placeholder={formData.category} disabled name='category' value={formData.category} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Category of Applicant<i>*</i></p>
                                <input type="text" placeholder={formData.date} disabled name='date' value={formData.date} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>City<i>*</i></p>
                                <select name="city" required value={formData.city} onChange={handleChange}>
                                    <option value="" disabled>City</option>
                                    {city.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <p>Area code<i>*</i></p>
                                <input type="text" value={formData.areaCode} placeholder='Area code' disabled />
                            </div>
                            <div>
                                <p>AOType<i>*</i></p>
                                <input type="text" value={formData.aotype} placeholder='AOType' disabled />
                            </div>
                            <div>
                                <p>Range Code<i>*</i></p>
                                <input type="text" value={formData.rangeCode} placeholder='Range Code' disabled />
                            </div>
                            <div>
                                <p>AO No<i>*</i></p>
                                <input type="text" value={formData.aoNo} placeholder='AO No' disabled />
                            </div>
                        </div>
                    </div>

                    {/* Individual */}
                    {formData.category == "Individual" ? <div className="individualPerson_2">
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
                                <p>Last Name<i>*</i></p>
                                <input type="text" placeholder='Last Name' onBlur={handleBlur} required name='lastName' value={formData.lastName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Middle Name</p>
                                <input type="text" placeholder='Middle Name' onBlur={handleBlur} name='middleName' value={formData.middleName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>First name</p>
                                <input type="text" placeholder='First Name' onBlur={handleBlur} name='firstName' value={formData.firstName} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Name on Card</p>
                                <input type="text" placeholder='Name on Card' name='NameOnCard' disabled value={formData.NameOnCard} onChange={handleChange} />
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

                    {formData.category == "Individual" ? <div className="individualPerson_2">
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
                                <p>Father's Last Name<i>*</i></p>
                                <input type="text" required placeholder='last Name' name='father_LName' value={formData.father_LName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Father's Middle Name</p>
                                <input type="text" placeholder='middle Name' name='father_MName' value={formData.father_MName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Father's First Name</p>
                                <input type="text" placeholder='first Name' name='father_FName' value={formData.father_FName} onChange={handleChange} />
                            </div>
                        </div>
                    </div> : null}

                    {formData.category == "Individual" ? <div className="individualPerson_2">
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
                                <input type="text" maxLength={6} placeholder='Zip Code' required name='zipCode' value={formData.zipCode} onChange={handleChange} />
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

                    {formData.category == "Individual" ? <div className="individualPerson_2">
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
                                <input type="text" maxLength={10} placeholder='Telephone/Mobile number' required name='telephoneNumber' value={formData.telephoneNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Email Id<i>*</i></p>
                                <input type="email" placeholder='Email ID' required name='email' value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                        {catagory == "Artificial" ? <div>
                            <div>
                                <p>Registration Number</p>
                                <input type="number" placeholder='Registration Number' name='registrationNumber' value={formData.registrationNumber} onChange={handleChange} />
                            </div>
                        </div> : null}
                    </div> : null}

                    {formData.category == "Individual" ? <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>AADHAAR Number<i>*</i></p>
                                <input type="text" maxLength={12} placeholder='AADHAAR Number' required name='aadhaarNumber' value={formData.aadhaarNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Name as per AADHAAR</p>
                                <input type="text" placeholder={'Name as per AADHAAR'} disabled name='aadhaarName' value={formData.aadhaarName} onChange={handleChange} />
                            </div>
                        </div>
                    </div> : null}

                    {formData.category == "Individual" ? <div className="individualPerson_2">

                        <div>
                            <div>
                                <p>Source Of Income<i>*</i></p>
                                <select required name='sourceOfIncome' value={formData.sourceOfIncome} onChange={handleChange}>
                                    <option value="" disabled>Source Of Income</option>
                                    <option value="No Income">No Income</option>
                                    <option value="salaried Employee">salaried Employee</option>
                                    <option value="Income from House Property">Income from House Property</option>
                                    <option value="Income from Other source">Income from Other source</option>
                                    <option value="engaged in a business / profession">engaged in a business / profession</option>
                                    <option value="Capital Gains">Capital Gains</option>
                                </select>
                            </div>
                        </div>
                    </div> : null}

                    {formData.category == "Individual" && formData.representativezipCode ? <div className="individualPerson_2">
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
                                <input type="text" maxLength={6} placeholder='Zip Code' required name='representativezipCode' value={formData.representativezipCode} onChange={handleChange} />
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

                    {formData.category == "Individual" ? <div className="individualPerson_2">
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
                    </div> : null}

                    {formData.category == "Individual" ? <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>You do hereby declare that whatever stated above is true in the capacity of<i>*</i></p>
                                <select required name='declarationCapacity' value={formData.declarationCapacity} onChange={handleChange}>
                                    <option value="" disabled>Select</option>
                                    <option value="HIMSELF/HERSELF">HIMSELF / HERSELF</option>
                                    <option value="salaried Employee">REPRESENTATIVE ASSESSEE</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Verifier Name<i>*</i></p>
                                <input type="text" placeholder='Verifier Name' required name='verifierName' value={formData.verifierName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Verifier Place<i>*</i></p>
                                <input type="text" placeholder='Verifier Place' required name='verifierPlace' value={formData.verifierPlace} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Verification Date<i>*</i></p>
                                <input type="text" placeholder={'Verification Date'} disabled name='verificationDate' value={formData.verificationDate} onChange={handleChange} />
                            </div>
                        </div>
                    </div> : null}

                    {/* Others */}
                    {formData.category != "Individual" ? <div className="individualPerson_2">
                        <div>
                            <div style={{ width: '25%' }}>
                                <p>Title<i>*</i></p>
                                <select required name='officetitle' value={formData.officetitle} onChange={handleChange} >
                                    <option value={formData.officetitle} disabled>{formData.officetitle}</option>
                                </select>
                            </div>
                            <div>
                                <p>Full Name of Organization<i>*</i></p>
                                <input type="text" placeholder='Organization' name='organization' value={formData.organization} onChange={handleChange} />
                            </div>
                        </div>
                        <div>

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

                    {formData.category != "Individual" ? <div className="individualPerson_2">
                        <h2>Address for Communication(If you want to selected Office Address then Required Office Address Proof)</h2>
                        <div>
                            <div>
                                <p>Office Address<i>*</i></p>
                                <select required name='Address' value={formData.Address} onChange={handleChange}>
                                    <option value={formData.Address}>{formData.Address}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Name of the Office<i>*</i></p>
                                <input type="text" placeholder='Name of the Office' required name='officeName' value={formData.officeName} onChange={handleChange} />
                            </div>
                        </div>
                        <h1>OFFICE ADDRESS</h1>
                        <div>
                            <div>
                                <p>Office's Flat/Door/Block Number<i>*</i></p>
                                <input type="text" placeholder='Flat/Door/Block Number' required name='officeflatNumber' value={formData.officeflatNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Office's Name of Premises/Building/Village<i>*</i></p>
                                <input type="text" placeholder='Name of Premises/Building/Village' required name='officepremisesName' value={formData.officepremisesName} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Office's Road/Street/Lane/Post Office<i>*</i></p>
                                <input type="text" placeholder='Road/Street/Lane/Post Office' required name='officeroadName' value={formData.officeroadName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Office's Area/Locality/Taluka/Sub-Division<i>*</i></p>
                                <input type="text" placeholder='Area/Locality/Taluka/Sub-Division' required name='officearea' value={formData.officearea} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Office's Town/City/District<i>*</i></p>
                                <input type="text" placeholder='Town/City/District' required name='officecityDistrict' value={formData.officecityDistrict} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Office's State/Union Territory<i>*</i></p>
                                <select required name='officestate' value={formData.officestate} onChange={handleChange}>
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
                                <p>Office's Zip Code<i>*</i></p>
                                <input type="text" maxLength={6} placeholder='Zip Code' required name='officezipCode' value={formData.officezipCode} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Office's Country<i>*</i></p>
                                <select required name='officecountry' value={formData.officecountry} onChange={handleChange}>
                                    <option value="" disabled>Country</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                        </div>
                    </div> : null}

                    {formData.category != "Individual" ? <div className="individualPerson_2">
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
                                <input type="text" maxLength={10} placeholder='Telephone/Mobile number' required name='telephoneNumber' value={formData.telephoneNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Email Id<i>*</i></p>
                                <input type="email" placeholder='Email ID' required name='email' value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                        {catagory == "Artificial" ? <div>
                            <div>
                                <p>Registration Number</p>
                                <input type="number" placeholder='Registration Number' name='registrationNumber' value={formData.registrationNumber} onChange={handleChange} />
                            </div>
                        </div> : null}
                    </div> : null}

                    {formData.category != "Individual" ? <div className="individualPerson_2">
                        <h2>Source Of Income<i>*</i></h2>
                        <div>
                            <div>
                                <span style={{ display: 'flex', color: 'rgb(71, 71, 71)', margin: '10px', fontSize: '13px' }}>
                                    <input type="checkbox" name="sourceIncome" onClick={() => setSourceIncome(!sourceIncome)} />
                                    <p style={{ marginLeft: '15px' }}>Are you are engaged in a business / profession?</p>
                                </span>
                                {sourceIncome ?
                                    <select required name='sourceOfIncome' value={formData.sourceOfIncome} onChange={handleChange}>
                                        <option value="" disabled>Select Profession</option>
                                        <option value="ARCHITECTURE">ARCHITECTURE</option>
                                        <option value="BUILDERS AND DEVELOPERS">BUILDERS AND DEVELOPERS</option>\
                                        <option value="CHARTERED ACCOUNTANT/ACCOUNTANCY">CHARTERED ACCOUNTANT/ACCOUNTANCY</option>
                                        <option value="CINEMA HALLS OTHER THEATRES">CINEMA HALLS OTHER THEATRES</option>
                                        <option value="COMPANY SECRETARY">COMPANY SECRETARY</option>
                                        <option value="ENGINEERING">ENGINEERING</option>
                                        <option value="FILMS,TV AND SUCH OTHER ENTERTAINMENT">FILMS,TV AND SUCH OTHER ENTERTAINMENT</option>
                                        <option value="GOVERNMENT CONTRACTORS">GOVERNMENT CONTRACTORS</option>
                                        <option value="INFORMATION TECHNOLOGY">INFORMATION TECHNOLOGY</option>
                                        <option value="INSURANCE AGENCY">INSURANCE AGENCY</option>
                                        <option value="INTERIOR DECORATION">INTERIOR DECORATION</option>
                                        <option value="LEGAL PRACTITIONER AND SOLICITORS">LEGAL PRACTITIONER AND SOLICITORS</option>
                                        <option value="MEDICAL PROFESSION AND BUSINESS">MEDICAL PROFESSION AND BUSINESS</option>
                                        <option value="MEMBERS OF STOCK EXCHANGE,SHARE BROKERS AND SUB-BROKERS">MEMBERS OF STOCK EXCHANGE,SHARE BROKERS AND SUB-BROKERS</option>
                                        <option value="OPERATION OF SHIPS,HOVERCRAFT,AIRCRAFT OR HELICOPTERS">OPERATION OF SHIPS,HOVERCRAFT,AIRCRAFT OR HELICOPTERS</option>
                                        <option value="OWNERSHIP OF HORSES OR JOCKEYS">OWNERSHIP OF HORSES OR JOCKEYS</option>
                                        <option value="PERFORMING ARTS AND YATRA">PERFORMING ARTS AND YATRA</option>
                                        <option value="PLYING TAXIS,LORRIES,TRUCKS,BUSES OR OTHER COMMERCIAL VEHICLES">PLYING TAXIS,LORRIES,TRUCKS,BUSES OR OTHER COMMERCIAL VEHICLES</option>
                                        <option value="TECHNICAL CONSULTANCY">TECHNICAL CONSULTANCY</option>
                                        <option value="OTHRES">OTHRES</option>
                                    </select>
                                    :
                                    <select required name='sourceOfIncome' value={formData.sourceOfIncome} onChange={handleChange}>
                                        <option value="" disabled>Source Of Income</option>
                                        <option value="Capital Gains">Capital Gains</option>
                                        <option value="Income from Other source">Income from Other source</option>
                                        <option value="Income from House Property">Income from House Property</option>
                                    </select>
                                }
                            </div>
                        </div>
                    </div> : null}

                    {formData.category != "Individual" ? <div className="individualPerson_2">
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
                                <input type="text" maxLength={6} placeholder='Zip Code' required name='representativezipCode' value={formData.representativezipCode} onChange={handleChange} />
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

                    {formData.category != "Individual" ? <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>Which of these documents are you submitting as an Identity Proof<i>*</i></p>
                                <select required name='identityProof' value={formData.identityProof} onChange={handleChange}>
                                    <option value="" disabled>Select</option>
                                    <option value="Agreement">Agreement</option>
                                    <option value="Cretificate of Registration Number issued by any other Competent Authority">Cretificate of Registration Number issued by any other Competent Authority</option>
                                    <option value="Cretificate of Registration Number issued by Charity Commissioner">Cretificate of Registration Number issued by Charity Commissioner</option>
                                    <option value="Cretificate of Registration Number issued by Registrar of Co-op Society">Cretificate of Registration Number issued by Registrar of Co-op Society</option>
                                    <option value="Any document originating from any Center or State Govt. Department establishing identity of such person">Any document originating from any Center or State Govt. Department establishing identity of such person</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Which of these documents are you submitting as an Address Proof<i>*</i></p>
                                <select required name='addressProof' value={formData.addressProof} onChange={handleChange}>
                                    <option value="" disabled>Select</option>
                                    <option value="Agreement">Agreement</option>
                                    <option value="Cretificate of Registration Number issued by any other Competent Authority">Cretificate of Registration Number issued by any other Competent Authority</option>
                                    <option value="Cretificate of Registration Number issued by Registrar of Co-op Society">Cretificate of Registration Number issued by Registrar of Co-op Society</option>
                                    <option value="Cretificate of Registration Number issued by Charity Commissioner">Cretificate of Registration Number issued by Charity Commissioner</option>
                                    <option value="Any document originating from any Center or State Govt. Department establishing identity of such person">Any document originating from any Center or State Govt. Department establishing identity of such person</option>
                                </select>
                            </div>
                        </div>
                    </div> : null}

                    {formData.category != "Individual" ? <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>You do hereby declare that whatever stated above is true in the capacity of<i>*</i></p>
                                <select required name='declarationCapacity' value={formData.declarationCapacity} onChange={handleChange}>
                                    <option value="" disabled>Select Capacity</option>
                                    <option value="AUTHORIZED SIGNATUREE">AUTHORIZED SIGNATUREE</option>
                                    <option value="DIRECTOR">DIRECTOR</option>
                                    <option value="KARTA">KARTA</option>
                                    <option value="PARTNER">PARTNER</option>
                                    <option value="REPRESENTATIVE ASSESSEE">REPRESENTATIVE ASSESSEE</option>
                                    <option value="TRUSTEE">TRUSTEE</option>

                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Verifier Name<i>*</i></p>
                                <input type="text" placeholder='Verifier Name' required name='verifierName' value={formData.verifierName} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Verifier Place<i>*</i></p>
                                <input type="text" placeholder='Verifier Place' required name='verifierPlace' value={formData.verifierPlace} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Verification Date<i>*</i></p>
                                <input type="text" placeholder={'Verification Date'} disabled name='verificationDate' value={formData.verificationDate} onChange={handleChange} />
                            </div>
                        </div>
                    </div> : null}


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

                    <button className='individualPerson_3' type='submit'>SUBMIT</button>
                </form>}
            </div>
        </div>
    )
}