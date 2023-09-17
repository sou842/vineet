import './EditPan.css';
import { DashboardFooter } from '../../../Components/DashboradFooter/DashboradFooter'
import { PanCardNav } from '../../../Components/PanCardNav/PanCardNav'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import date from 'date-and-time';
import axios from 'axios';
import { city, city_data } from '../../../city.js'
import { Footer } from '../../../Components/Footer/Footer';
import { useToast, Box, Button } from "@chakra-ui/react";
import { array1To31, monthsArray, yearsArray } from '../../../FromElement.js'

export const EditPan = () => {
  //    ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  const baseURL = process.env.REACT_APP_BASE_URL
  //     ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
  const VDP_form_data = JSON.parse(localStorage.getItem('VDP_form_data')) || null
  const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
  const [sourceIncome, setSourceIncome] = useState(false);
  const [formEdit, setFormEdit] = useState(true);

  const catagory = VDP_form_data && VDP_form_data.category
  const now = new Date();
  // let currentDate = date.format(now, 'YYYY-MMM-DD');
  let currentDate = date.format(new Date(), 'YYYY-MMM-DD');
  let currentTime = date.format(new Date(), 'hh:mm:ss A');
  const navigate = useNavigate()
  const toast = useToast()


  const [formData, setFormData] = useState({
    category: catagory && catagory.replace(/-/g, ' '),
    date: currentDate+" "+currentTime,
    city: '',
    areaCode: '',
    aotype: '',
    rangeCode: '',
    aoNo: '',
    firstName: '',
    middleName: '',
    lastName: '',
    title: "",
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
    sourceOfIncome: '',
    identityProof: '',
    addressProof: '',
    dobProof: '',
    declarationCapacity: '',
    verifierName: '',
    verifierPlace: '',
    verificationDate: currentDate,
    requiredOption: 'Both Physical PAN Card and e-PAN',
    isUploadDocs: false,
    aadharCardDocs: "",
    backForm: "",
    frontForm: "",
    isDoneFromUser: false,
    PanFee: 107,
    father_FName: '',
    father_MName: '',
    father_LName: '',
    NameOnCard: '',
    // newly added
    organization: '',
    officeName: '',
    registrationNumber: '',
    officetitle: '',
    officeflatNumber: '',
    officepremisesName: '',
    officeroadName: '',
    officearea: '',
    officecityDistrict: '',
    officestate: '',
    officezipCode: '',
    officecountry: 'India',
    slipGenerateDate: "",
    acknowledgement: "",
    panStatus: "pending"

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
    console.log('false')
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setFormEdit(!formEdit)

    if (!formEdit) {
      toast({ title: 'EDIT SAVE', status: 'success', duration: 2000, isClosable: true, position: 'top' })
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.aadhaarNumber.length == 0 || formData.zipCode.length == 0) {
      axios.post(`${baseURL}/user/new-pan-card`, formData, {
        headers: { "Authorization": portalData.token }
      }).then((res) => {

        if (res.data == "Apply successful for new pan card") {
          localStorage.removeItem('VDP_form_data')
          toast({ title: "Apply successful for new pan card", status: 'success', duration: 5000, isClosable: true, position: 'top-center', })
          navigate('/user/upload')
        }
        else {
          toast({ title: res.data, status: 'error', duration: 5000, isClosable: true, position: 'top-center', })
        }

      }).catch((err) => {
        console.log(err);
        toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top-center', })

      })

    }
    else if (catagory == 'Individual' && formData.aadhaarNumber.length != 12) {
      toast({ title: 'Aadhaar Number', description: "Aadhaar Number should have 12 Charecter", status: 'error', duration: 5000, isClosable: true, position: 'top-center', })
    } else if (formData.zipCode.length != 6) {
      toast({ title: 'Zip Code', description: "PIN Code Number should have 6 Charecter", status: 'error', duration: 5000, isClosable: true, position: 'top', })
    } else {
      // localStorage.setItem("VDP_form_data", JSON.stringify(formData))

      axios.post(`${baseURL}/user/new-pan-card`, formData, {
        headers: { "Authorization": portalData.token }
      }).then((res) => {
        console.log(res);
        if (res.data == "Apply successful for new pan card") {
          localStorage.removeItem('VDP_form_data')
          toast({ title: "Apply successful for new pan card", status: 'success', duration: 5000, isClosable: true, position: 'top', })
          navigate('/user/upload')

        }
        else {
          toast({ title: res.data, status: 'error', duration: 5000, isClosable: true, position: 'top', })
        }

      }).catch((err) => {
        console.log(err);
        toast({ title: "Somthing went wrong Please try again!", status: 'error', duration: 3000, isClosable: true, position: 'top', })
      })

    }

  }



  useEffect(() => {
    setFormData(VDP_form_data)
  }, [])

  console.log(formData)

  return (
    <div style={{ backgroundColor: 'rgba(201, 201, 201, 0.249)' }}>
      <div><PanCardNav /></div>

      <div style={{ paddingTop: '1cm', paddingBottom: '1cm', backgroundColor: 'white' }}>

        <h1 className='editpan_head'>PANCARD REVIEW</h1>

        {VDP_form_data ? <form onSubmit={handleSubmit}>
          {/* all */}
          {!formEdit ? <div className="editpan_2">
            <div>
              <div>
                <p>Category of Applicant<i>*</i></p>
                <input type="text" placeholder={catagory} disabled name='category' value={formData.category} onChange={handleChange} />
              </div>
              <div>
                <p>Date of Applicant<i>*</i></p>
                <input type="text" placeholder={currentDate} disabled name='date' value={formData.date} onChange={handleChange} />
              </div>
            </div>
            <div>
              <div>
                <p>City<i>*</i></p>
                <select disabled={formEdit} name="city" required value={formData.city} onChange={handleChange} >
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
          </div> : null}

          {/* Individual */}
          {catagory == "Individual" && formEdit ? <table className='form_details_1'>
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
                <td>Date of Applicant</td>
                <td>{formData.date}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{formData.city}</td>
              </tr>
              <tr>
                <td>Area code</td>
                <td>{formData.areaCode}</td>
              </tr>
              <tr>
                <td>AOType</td>
                <td>{formData.aotype}</td>
              </tr>
              <tr>
                <td>Range Code</td>
                <td>{formData.rangeCode}</td>
              </tr>
              <tr>
                <td>AO No</td>
                <td>{formData.aoNo}</td>
              </tr>
              <tr>
                <td>Title</td>
                <td>{formData.title}</td>
              </tr>
              <tr>
                <td>First name</td>
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
                <td>Name on Card</td>
                <td>{formData.NameOnCard}</td>
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
                <td>Flat/Door/Block Number</td>
                <td>{formData.flatNumber}</td>
              </tr>
              <tr>
                <td>Name of Premises/Building/Village</td>
                <td>{formData.premisesName}</td>
              </tr>
              <tr>
                <td>Road/Street/Lane/Post Office</td>
                <td>{formData.roadName}</td>
              </tr>
              <tr>
                <td>Area/Locality/Taluka/Sub-Division</td>
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
                <td>Email Id</td>
                <td>{formData.email}</td>
              </tr>
              <tr>
                <td>Registration Number</td>
                <td>{formData.registrationNumber}</td>
              </tr>
              <tr>
                <td>AADHAAR Number</td>
                <td>{formData.aadhaarNumber}</td>
              </tr>
              <tr>
                <td>Name as per AADHAAR</td>
                <td>{formData.aadhaarName}</td>
              </tr>
              <tr>
                <td>Source Of Income</td>
                <td>{formData.sourceOfIncome}</td>
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
                <td>{formData.dobProof}</td>
              </tr>
              <tr>
                <td>capacity</td>
                <td>{formData.declarationCapacity}</td>
              </tr>
              <tr>
                <td>Verifier Name</td>
                <td>{formData.verifierName}</td>
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

          {catagory === "Individual" && !formEdit ? (
            <div className="editpan_2">
              <div>
                <div>
                  <p>Title<i>*</i></p>
                  <select required disabled={formEdit} name='title' value={formData.title} onChange={handleChange}>
                    <option value="" disabled>Title</option>
                    <option value="Shri">Shri</option>
                    <option value="Smt">Smt</option>
                    <option value="Kumari">Kumari</option>
                  </select>
                </div>
                <div>
                  <p>Last Name<i>*</i></p>
                  <input type="text" disabled={formEdit} placeholder='Last Name' onBlur={handleBlur} required name='lastName' value={formData.lastName} onChange={handleChange} />
                </div>
                <div>
                  <p>Middle Name</p>
                  <input type="text" disabled={formEdit} placeholder='Middle Name' onBlur={handleBlur} name='middleName' value={formData.middleName} onChange={handleChange} />
                </div>
                <div>
                  <p>First name</p>
                  <input type="text" disabled={formEdit} placeholder='First Name' onBlur={handleBlur} name='firstName' value={formData.firstName} onChange={handleChange} />
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
                  <select disabled={formEdit} required name='gender' value={formData.gender} onChange={handleChange}>
                    <option value="" disabled>Gender</option>
                    {formData.gender ? (
                      <>
                        <option value={formData.gender}>{formData.gender}</option>
                        <option value="Transgender">Transgender</option>
                      </>
                    ) : (
                      <></>
                    )}
                  </select>
                </div>

                <div>
                  <p>Date of Birth<i>*</i></p>
                  <select disabled={formEdit} required name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange}>
                    <option value="" disabled>Date of Birth</option>
                    {array1To31 && array1To31?.map((ele, index) => (
                      <option key={index} value={ele}>{ele}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p>Month<i>*</i></p>
                  <select disabled={formEdit} required name='monthOfBirth' value={formData.monthOfBirth} onChange={handleChange}>
                    <option value="" disabled>Month</option>
                    {monthsArray && monthsArray?.map((ele, index) => (
                      <option key={index} value={ele}>{ele}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p>Year<i>*</i></p>
                  <select disabled={formEdit} required name='yearOfBirth' value={formData.yearOfBirth} onChange={handleChange}>
                    <option value="" disabled>Year</option>
                    {yearsArray && yearsArray?.map((ele, index) => (
                      <option key={index} value={ele}>{ele}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          {catagory === "Individual" && !formEdit ? (
            <div className="editpan_2">
              <h2>Details of Parents ( applicable only for Individual applicants )</h2>
              <div>
                <div>
                  <p>If yes, please fill in mother's name in the appropriate space provide below.</p>
                  <select disabled={formEdit}>
                    <option>NO</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <p>Gudiance</p>
                  <select disabled={formEdit}>
                    <option>Father</option>
                  </select>
                </div>
                <div>
                  <p>Father's Last Name<i>*</i></p>
                  <input type="text" disabled={formEdit} required placeholder='last Name' name='father_LName' value={formData.father_LName} onChange={handleChange} />
                </div>
                <div>
                  <p>Father's Middle Name</p>
                  <input type="text" disabled={formEdit} placeholder='middle Name' name='father_MName' value={formData.father_MName} onChange={handleChange} />
                </div>
                <div>
                  <p>Father's First Name</p>
                  <input type="text" disabled={formEdit} placeholder='first Name' name='father_FName' value={formData.father_FName} onChange={handleChange} />
                </div>
              </div>
            </div>
          ) : null}

          {catagory === "Individual" && !formEdit ? (
            <div className="editpan_2">
              <h2>Address for Communication(If you want to selected Office Address then Required Office Address Proof)</h2>
              <div>
                <div>
                  <p>Residence Address<i>*</i></p>
                  <select disabled={formEdit} required name='Address' value={formData.Address} onChange={handleChange}>
                    <option value={formData.Address}>{formData.Address}</option>
                  </select>
                </div>
              </div>

              <h1>RESSIDENCE ADDRESS</h1>
              <div>
                <div>
                  <p>Flat/Door/Block Number<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Flat/Door/Block Number' required name='flatNumber' value={formData.flatNumber} onChange={handleChange} />
                </div>
                <div>
                  <p>Name of Premises/Building/Village<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Name of Premises/Building/Village' required name='premisesName' value={formData.premisesName} onChange={handleChange} />
                </div>
              </div>
              <div>
                <div>
                  <p>Road/Street/Lane/Post Office<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Road/Street/Lane/Post Office' required name='roadName' value={formData.roadName} onChange={handleChange} />
                </div>
                <div>
                  <p>Area/Locality/Taluka/Sub-Division<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Area/Locality/Taluka/Sub-Division' required name='area' value={formData.area} onChange={handleChange} />
                </div>
              </div>
              <div>
                <div>
                  <p>Town/City/District<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Town/City/District' required name='cityDistrict' value={formData.cityDistrict} onChange={handleChange} />
                </div>
                <div>
                  <p>State/Union Territory<i>*</i></p>
                  <select disabled={formEdit} required name='state' value={formData.state} onChange={handleChange}>
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
                  <input disabled={formEdit} type="text" maxLength={6} placeholder='Zip Code' required name='zipCode' value={formData.zipCode} onChange={handleChange} />
                </div>
                <div>
                  <p>Country<i>*</i></p>
                  <select disabled={formEdit} required name='country' value={formData.country} onChange={handleChange}>
                    <option value="" disabled>Country</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          {catagory === "Individual" && !formEdit ? (
            <div className="editpan_2">
              <div>
                <div>
                  <p>Telephone ISD Code<i>*</i></p>
                  <select disabled={formEdit} required name='telephoneISDCode' value={formData.telephoneISDCode} onChange={handleChange}>
                    <option value="" disabled>Telephone ISD Code</option>
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <p>Telephone/Mobile number<i>*</i></p>
                  <input disabled={formEdit} type="text" maxLength={10} placeholder='Telephone/Mobile number' required name='telephoneNumber' value={formData.telephoneNumber} onChange={handleChange} />
                </div>
                <div>
                  <p>Email Id<i>*</i></p>
                  <input disabled={formEdit} type="email" placeholder='Email ID' required name='email' value={formData.email} onChange={handleChange} />
                </div>
              </div>
              {catagory !== "Individual" ? (
                <div>
                  <div>
                    <p>Registration Number</p>
                    <input disabled={formEdit} type="number" placeholder='Registration Number' name='registrationNumber' value={formData.registrationNumber} onChange={handleChange} />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {catagory === "Individual" && !formEdit ? (
            <div className="editpan_2">
              <div>
                <div>
                  <p>AADHAAR Number<i>*</i></p>
                  <input disabled={formEdit} type="text" maxLength={12} placeholder='AADHAAR Number' required name='aadhaarNumber' value={formData.aadhaarNumber} onChange={handleChange} />
                </div>
                <div>
                  <p>Name as per AADHAAR</p>
                  <input type="text" placeholder={'Name as per AADHAAR'} disabled name='aadhaarName' value={formData.aadhaarName} onChange={handleChange} />
                </div>
              </div>
            </div>
          ) : null}

          {catagory === "Individual" && !formEdit ? (
            <div className="editpan_2">
              <div>
                <div>
                  <p>Source Of Income<i>*</i></p>
                  <select disabled={formEdit} required name='sourceOfIncome' value={formData.sourceOfIncome} onChange={handleChange}>
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
            </div>
          ) : null}

          {catagory === "Individual" && !formEdit ? (
            <div className="editpan_2">
              <div>
                <div>
                  <p>Which of these documents are you submitting as an Identity Proof<i>*</i></p>
                  <select disabled={formEdit} required name='identityProof' value={formData.identityProof} onChange={handleChange}>
                    <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <p>Which of these documents are you submitting as an Address Proof<i>*</i></p>
                  <select disabled={formEdit} required name='addressProof' value={formData.addressProof} onChange={handleChange}>
                    <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <p>Which of these documents are you submitting as a DOB Proof<i>*</i></p>
                  <select disabled={formEdit} required name='dobProof' value={formData.dobProof} onChange={handleChange}>
                    <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          {catagory === "Individual" && !formEdit ? (
            <div className="editpan_2">
              <div>
                <div>
                  <p>You do hereby declare that whatever stated above is true in the capacity of<i>*</i></p>
                  <select disabled={formEdit} required name='declarationCapacity' value={formData.declarationCapacity} onChange={handleChange}>
                    <option value="" disabled>Select</option>
                    <option value="HIMSELF/HERSELF">HIMSELF / HERSELF</option>
                    <option value="salaried Employee">REPRESENTATIVE ASSESSEE</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <p>Verifier Name<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Verifier Name' required name='verifierName' value={formData.verifierName} onChange={handleChange} />
                </div>
                <div>
                  <p>Verifier Place<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Verifier Place' required name='verifierPlace' value={formData.verifierPlace} onChange={handleChange} />
                </div>
                <div>
                  <p>Verification Date<i>*</i></p>
                  <input type="text" placeholder={currentDate} disabled name='verificationDate' value={formData.verificationDate} onChange={handleChange} />
                </div>
              </div>
            </div>
          ) : null}


          {/* Others */}

          {catagory !== "Individual" && formEdit ? <table className='form_details_1'>
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
                <td>City</td>
                <td>{formData.city}</td>
              </tr>
              <tr>
                <td>Area code</td>
                <td>{formData.areaCode}</td>
              </tr>
              <tr>
                <td>AOType</td>
                <td>{formData.aotype}</td>
              </tr>
              <tr>
                <td>Range Code</td>
                <td>{formData.rangeCode}</td>
              </tr>
              <tr>
                <td>AO No</td>
                <td>{formData.aoNo}</td>
              </tr>
              {/* <!-- Add more rows for each field and its corresponding value --> */}
              <tr>
                <td>Organization Title</td>
                <td>{formData.officetitle}</td>
              </tr>
              <tr>
                <td>Full Name of Organization</td>
                <td>{formData.organization}</td>
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
                <td>Office Address</td>
                <td>{formData.Address}</td>
              </tr>
              <tr>
                <td>Name of the Office</td>
                <td>{formData.officeName}</td>
              </tr>
              <tr>
                <td>Office's Flat/Door/Block Number</td>
                <td>{formData.officeflatNumber}</td>
              </tr>
              <tr>
                <td>Office's Name of Premises/Building/Village</td>
                <td>{formData.officepremisesName}</td>
              </tr>
              <tr>
                <td>Office's Road/Street/Lane/Post Office</td>
                <td>{formData.officeroadName}</td>
              </tr>
              <tr>
                <td>Office's Area/Locality/Taluka/Sub-Division</td>
                <td>{formData.officearea}</td>
              </tr>
              <tr>
                <td>Office's Town/City/District</td>
                <td>{formData.officecityDistrict}</td>
              </tr>
              <tr>
                <td>Office's State/Union Territory</td>
                <td>{formData.officestate}</td>
              </tr>
              <tr>
                <td>Office's Zip Code</td>
                <td>{formData.officezipCode}</td>
              </tr>
              <tr>
                <td>Office's Country</td>
                <td>{formData.officecountry}</td>
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
                <td>Registration Number</td>
                <td>{formData.registrationNumber}</td>
              </tr>
              <tr>
                <td>Source Of Income</td>
                <td>{formData.sourceOfIncome}</td>
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
                <td>Identity Proof</td>
                <td>{formData.identityProof}</td>
              </tr>
              <tr>
                <td>Address Proof</td>
                <td>{formData.addressProof}</td>
              </tr>
              <tr>
                <td>Capacity</td>
                <td>{formData.declarationCapacity}</td>
              </tr>
              <tr>
                <td>Verifier Name</td>
                <td>{formData.verifierName}</td>
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


          {catagory !== "Individual" && !formEdit ? (
            <div className="editpan_2">
              <div>
                <div style={{ width: '25%' }}>
                  <p>Organization Title<i>*</i></p>
                  <select
                    disabled={formEdit}
                    required
                    name='officetitle'
                    value={formData.officetitle}
                    onChange={handleChange}
                  >
                    <option value={formData.officetitle} disabled>{formData.officetitle}</option>
                  </select>
                </div>
                <div>
                  <p>Full Name of Organization<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="text"
                    placeholder='Organization'
                    name='organization'
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <p>Date of Birth<i>*</i></p>
                  <select
                    disabled={formEdit}
                    required
                    name='dateOfBirth'
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Date of Birth</option>
                    {array1To31 && array1To31?.map((ele, index) => (
                      <option key={index} value={ele}>{ele}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p>Month<i>*</i></p>
                  <select
                    disabled={formEdit}
                    required
                    name='monthOfBirth'
                    value={formData.monthOfBirth}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Month</option>
                    {monthsArray && monthsArray?.map((ele, index) => (
                      <option key={index} value={ele}>{ele}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p>Year<i>*</i></p>
                  <select
                    disabled={formEdit}
                    required
                    name='yearOfBirth'
                    value={formData.yearOfBirth}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Year</option>
                    {yearsArray && yearsArray?.map((ele, index) => (
                      <option key={index} value={ele}>{ele}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          {catagory !== "Individual" && !formEdit ? (
            <div className="editpan_2">
              <h2>Address for Communication (If you want to select Office Address then Required Office Address Proof)</h2>
              <div>
                <div>
                  <p>Office Address<i>*</i></p>
                  <select
                    disabled={formEdit}
                    required
                    name='address'
                    value={formData.Address}
                    onChange={handleChange}
                  >
                    <option value={formData.Address}>{formData.Address}</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <p>Name of the Office<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="text"
                    placeholder='Name of the Office'
                    required
                    name='officeName'
                    value={formData.officeName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <h1>OFFICE ADDRESS</h1>
              <div>
                <div>
                  <p>Office's Flat/Door/Block Number<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="text"
                    placeholder='Flat/Door/Block Number'
                    required
                    name='officeflatNumber'
                    value={formData.officeflatNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Office's Name of Premises/Building/Village<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="text"
                    placeholder='Name of Premises/Building/Village'
                    required
                    name='officepremisesName'
                    value={formData.officepremisesName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <p>Office's Road/Street/Lane/Post Office<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="text"
                    placeholder='Road/Street/Lane/Post Office'
                    required
                    name='officeroadName'
                    value={formData.officeroadName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Office's Area/Locality/Taluka/Sub-Division<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="text"
                    placeholder='Area/Locality/Taluka/Sub-Division'
                    required
                    name='officearea'
                    value={formData.officearea}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <p>Office's Town/City/District<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="text"
                    placeholder='Town/City/District'
                    required
                    name='officecityDistrict'
                    value={formData.officecityDistrict}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Office's State/Union Territory<i>*</i></p>
                  <select
                    disabled={formEdit}
                    required
                    name='officestate'
                    value={formData.officestate}
                    onChange={handleChange}
                  >
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
                  <input
                    disabled={formEdit}
                    type="text"
                    maxLength={6}
                    placeholder='Zip Code'
                    required
                    name='officezipCode'
                    value={formData.officezipCode}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Office's Country<i>*</i></p>
                  <select
                    disabled={formEdit}
                    required
                    name='officecountry'
                    value={formData.officecountry}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Country</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          {catagory !== "Individual" && !formEdit ? (
            <div className="editpan_2">
              <div>
                <div>
                  <p>Telephone ISD Code<i>*</i></p>
                  <select
                    disabled={formEdit}
                    required
                    name='telephoneISDCode'
                    value={formData.telephoneISDCode}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Telephone ISD Code</option>
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <p>Telephone/Mobile number<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="text"
                    maxLength={10}
                    placeholder='Telephone/Mobile number'
                    required
                    name='telephoneNumber'
                    value={formData.telephoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Email Id<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="email"
                    placeholder='Email ID'
                    required
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {catagory !== "Individual" ? (
                <div>
                  <div>
                    <p>Registration Number</p>
                    <input
                      disabled={formEdit}
                      type="number"
                      placeholder='Registration Number'
                      name='registrationNumber'
                      value={formData.registrationNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {catagory !== "Individual" && !formEdit ? (
            <div className="editpan_2">
              <h2>Source Of Income<i>*</i></h2>

              <div>
                <div>
                  <span style={{ display: 'flex', color: 'rgb(71, 71, 71)', margin: '10px', fontSize: '13px' }}>
                    <input disabled={formEdit} type="checkbox" name="sourceIncome" onClick={() => setSourceIncome(!sourceIncome)} />
                    <p style={{ marginLeft: '15px' }}>Are you engaged in a business / profession?</p>
                  </span>
                  {sourceIncome ?
                    <select disabled={formEdit} required name='sourceOfIncome' value={formData.sourceOfIncome} onChange={handleChange}>
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
                    <select disabled={formEdit} required name='sourceOfIncome' value={formData.sourceOfIncome} onChange={handleChange}>
                      <option value="" disabled>Source Of Income</option>
                      <option value="Income from Other source">Income from Other source</option>
                      <option value="Income from House Property">Income from House Property</option>
                      <option value="Capital Gains">Capital Gains</option>
                    </select>
                  }
                </div>
              </div>
            </div>
          ) : null}

          {catagory !== "Individual" && !formEdit ? (
            <div className="editpan_2">
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
            </div>
          ) : null}

          {catagory !== "Individual" && !formEdit ? (
            <div className="editpan_2">
              <div>
                <div>
                  <p>Which of these documents are you submitting as an Identity Proof<i>*</i></p>
                  <select disabled={formEdit} required name='identityProof' value={formData.identityProof} onChange={handleChange}>
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
                  <select disabled={formEdit} required name='addressProof' value={formData.addressProof} onChange={handleChange}>
                    <option value="" disabled>Select</option>
                    <option value="Agreement">Agreement</option>
                    <option value="Cretificate of Registration Number issued by any other Competent Authority">Cretificate of Registration Number issued by any other Competent Authority</option>
                    <option value="Cretificate of Registration Number issued by Registrar of Co-op Society">Cretificate of Registration Number issued by Registrar of Co-op Society</option>
                    <option value="Cretificate of Registration Number issued by Charity Commissioner">Cretificate of Registration Number issued by Charity Commissioner</option>
                    <option value="Any document originating from any Center or State Govt. Department establishing identity of such person">Any document originating from any Center or State Govt. Department establishing identity of such person</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          {catagory !== "Individual" && !formEdit ? (
            <div className="editpan_2">
              <div>
                <div>
                  <p>You do hereby declare that whatever stated above is true in the capacity of<i>*</i></p>
                  <select disabled={formEdit} required name='declarationCapacity' value={formData.declarationCapacity} onChange={handleChange}>
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
                  <input disabled={formEdit} type="text" placeholder='Verifier Name' required name='verifierName' value={formData.verifierName} onChange={handleChange} />
                </div>
                <div>
                  <p>Verifier Place<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Verifier Place' required name='verifierPlace' value={formData.verifierPlace} onChange={handleChange} />
                </div>
                <div>
                  <p>Verification Date<i>*</i></p>
                  <input type="text" placeholder={currentDate} disabled name='verificationDate' value={formData.verificationDate} onChange={handleChange} />
                </div>
              </div>
            </div>
          ) : null}


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
        </form> : <Button onClick={() => navigate('/Dashboard')} h={'50px'} display={'block'} bg={'blue.300'} w={['80%', '60%', '40%']} m={'auto'}>DashBoard</Button>}
      </div>

      <div><Footer /></div>
    </div>
  )
}


