import './EditPan.css';
import { DashboardFooter } from '../../../Components/DashboradFooter/DashboradFooter'
import { PanCardNav } from '../../../Components/PanCardNav/PanCardNav'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import date from 'date-and-time';
import axios from 'axios';
import { city, city_data } from '../../../city.js'
import { Footer } from '../../../Components/Footer/Footer';
import { useToast, Box } from "@chakra-ui/react";
import { array1To31, monthsArray, yearsArray } from '../../../FromElement.js'

export const EditPan = () => {
  const VDP_form_data = JSON.parse(localStorage.getItem('VDP_form_data')) || null
  const portalData = JSON.parse(localStorage.getItem('digitalPortal')) || null
  const [sourceIncome, setSourceIncome] = useState(false);
  const [formEdit, setFormEdit] = useState(true);

  const catagory = VDP_form_data.category
  const now = new Date();
  let currentDate = date.format(now, 'YYYY-MMM-DD');
  const navigate = useNavigate()
  const toast = useToast()


  const [formData, setFormData] = useState({
    category: catagory.replace(/-/g, ' '),
    date: currentDate,
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
    } else {
      setFormData((prevData) => ({ ...prevData, ['aadhaarName']: formData.firstName + ' ' + formData.lastName }))
      setFormData((prevData) => ({ ...prevData, ['NameOnCard']: formData.firstName + ' ' + formData.lastName }));
    }
    console.log('false')
  }

  const handleSubmit = (event) => {
    event.preventDefault();


    if (catagory == 'Individual' && formData.aadhaarNumber.length != 12) {
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
      localStorage.setItem("VDP_form_data", JSON.stringify(formData))

      axios.post("http://localhost:8080/user/new-pan-card", formData, {
      headers: { "Authorization": portalData.token }
      }).then((res) => {
          // console.log(res.data);
          toast({
            title: 'SUBMITTED',
            description: "PAN CARD FORM SUBMITTED SUCCESSFULLY",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-center',
          })
          

      }) .catch((err) => {
          console.log(err);
      })

      navigate('/DashBoard')
    }


  }



  useEffect(() => {
    setFormData(VDP_form_data)
  }, [])

  // console.log(formData)

  return (
    <div style={{ backgroundColor: 'rgba(201, 201, 201, 0.249)' }}>
      <div><PanCardNav /></div>

      <div style={{ paddingTop: '1cm', paddingBottom: '1cm', backgroundColor:'white' }}>

        <h1 className='editpan_head'>PANCARD REVIEW</h1>

        <form onSubmit={handleSubmit}>
          {/* all */}
          <div className="editpan_2">
            <div>
              <div>
                <p>Category of Applicant<i>*</i></p>
                <input type="text" placeholder={catagory} disabled name='category' value={formData.category} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Category of Applicant<i>*</i></p>
                <input type="text" placeholder={currentDate} disabled name='date' value={formData.date} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
            <div>
              <div>
                <p>City<i>*</i></p>
                <select disabled={formEdit} name="city" required value={formData.city} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>City</option>
                  {city.map((ele, index) => (
                    <option key={index} value={ele}>{ele}</option>
                  ))}
                </select>
              </div>
              <div>
                <p>Area code<i>*</i></p>
                <input type="text" value={formData.areaCode} placeholder='Area code' disabled style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>AOType<i>*</i></p>
                <input type="text" value={formData.aotype} placeholder='AOType' disabled style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Range Code<i>*</i></p>
                <input type="text" value={formData.rangeCode} placeholder='Range Code' disabled style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>AO No<i>*</i></p>
                <input type="text" value={formData.aoNo} placeholder='AO No' disabled style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
          </div>

          {/* Individual */}
          {catagory == "Individual" ? <div className="editpan_2">
            <div>
              <div>
                <p>Title<i>*</i></p>
                <select required disabled={formEdit} name='title' value={formData.title} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>Title</option>
                  <option value="Shri">Shri</option>
                  <option value="Smt">Smt</option>
                  <option value="Kumari">Kumari</option>
                </select>
              </div>
              <div>
                <p>First name<i>*</i></p>
                <input type="text" disabled={formEdit} placeholder='First Name' onBlur={handleBlur} required name='firstName' value={formData.firstName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Middle Name</p>
                <input type="text" disabled={formEdit} placeholder='Middle Name' onBlur={handleBlur} name='middleName' value={formData.middleName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Last Name<i>*</i></p>
                <input type="text" disabled={formEdit} placeholder='Last Name' onBlur={handleBlur} required name='lastName' value={formData.lastName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
            <div>
              <div>
                <p>Name on Card</p>
                <input type="text" placeholder='Name on Card' name='NameOnCard' disabled value={formData.NameOnCard} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
            <div>
              <div>
                <p>Gender<i>*</i></p>
                <select disabled={formEdit} required name='gender' value={formData.gender} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
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
                <select disabled={formEdit} required name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>Date of Birth</option>
                  {array1To31 && array1To31?.map((ele, index) => (
                    <option key={index} value={ele}>{ele}</option>
                  ))}
                </select>
              </div>

              <div>
                <p>Month<i>*</i></p>
                <select disabled={formEdit} required name='monthOfBirth' value={formData.monthOfBirth} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>Month</option>
                  {monthsArray && monthsArray?.map((ele, index) => (
                    <option key={index} value={ele}>{ele}</option>
                  ))}
                </select>
              </div>

              <div>
                <p>Year<i>*</i></p>
                <select disabled={formEdit} required name='yearOfBirth' value={formData.yearOfBirth} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>Year</option>
                  {yearsArray && yearsArray?.map((ele, index) => (
                    <option key={index} value={ele}>{ele}</option>
                  ))}
                </select>
              </div>

            </div>
          </div> : null}

          {catagory == "Individual" ? <div className="editpan_2">
            <h2>Details of Parents ( applicable only for Individual applicants )</h2>
            <div>
              <div>
                <p>If yes, please fill in mother's name in the appropriate space provide below.</p>
                <select style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option>NO</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <p>Gudiance</p>
                <select disabled={formEdit} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option>Father</option>
                </select>
              </div>
              <div>
                <p>Father's First Name<i>*</i></p>
                <input type="text" disabled={formEdit} required placeholder='first Name' name='father_FName' value={formData.father_FName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Father's Middle Name</p>
                <input type="text" disabled={formEdit} placeholder='middle Name' name='father_MName' value={formData.father_MName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Father's Last Name<i>*</i></p>
                <input type="text" disabled={formEdit} required placeholder='last Name' name='father_LName' value={formData.father_LName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
          </div> : null}

          {catagory == "Individual" ? <div className="editpan_2">
            <h2>Address for Communication(If you want to selected Office Address then Required Office Address Proof)</h2>
            <div>
              <div>
                <p>Residence Address<i>*</i></p>
                <select disabled={formEdit} required name='Address' value={formData.Address} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value={formData.Address}>{formData.Address}</option>
                </select>
              </div>
            </div>

            <h1>RESSIDENCE ADDRESS</h1>
            <div>
              <div>
                <p>Flat/Door/Block Number<i>*</i></p>
                <input disabled={formEdit} type="text" placeholder='Flat/Door/Block Number' required name='flatNumber' value={formData.flatNumber} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Name of Premises/Building/Village<i>*</i></p>
                <input disabled={formEdit} type="text" placeholder='Name of Premises/Building/Village' required name='premisesName' value={formData.premisesName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
            <div>
              <div>
                <p>Road/Street/Lane/Post Office<i>*</i></p>
                <input disabled={formEdit} type="text" placeholder='Road/Street/Lane/Post Office' required name='roadName' value={formData.roadName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Area/Locality/Taluka/Sub-Division<i>*</i></p>
                <input disabled={formEdit} type="text" placeholder='Area/Locality/Taluka/Sub-Division' required name='area' value={formData.area} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
            <div>
              <div>
                <p>Town/City/District<i>*</i></p>
                <input disabled={formEdit} type="text" placeholder='Town/City/District' required name='cityDistrict' value={formData.cityDistrict} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>State/Union Territory<i>*</i></p>
                <select disabled={formEdit} required name='state' value={formData.state} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
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
                <input disabled={formEdit} type="number" placeholder='Zip Code' required name='zipCode' value={formData.zipCode} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Country<i>*</i></p>
                <select disabled={formEdit} required name='country' value={formData.country} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>Country</option>
                  <option value="India">India</option>
                </select>
              </div>
            </div>
          </div> : null}

          {catagory == "Individual" ? <div className="editpan_2">
            <div>
              <div>
                <p>Telephone ISD Code<i>*</i></p>
                <select disabled={formEdit} required name='telephoneISDCode' value={formData.telephoneISDCode} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>Telephone ISD Code</option>
                  <option value="India">India</option>
                </select>
              </div>
              <div>
                <p>Telephone/Mobile number<i>*</i></p>
                <input disabled={formEdit} type="number" placeholder='Telephone/Mobile number' required name='telephoneNumber' value={formData.telephoneNumber} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Email Id<i>*</i></p>
                <input disabled={formEdit} type="email" placeholder='Email ID' required name='email' value={formData.email} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
            {catagory != "Individual" ? <div>
              <div>
                <p>Registration Number</p>
                <input disabled={formEdit} type="number" placeholder='Registration Number' name='registrationNumber' value={formData.registrationNumber} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div> : null}
          </div> : null}

          {catagory == "Individual" ? <div className="editpan_2">
            <div>
              <div>
                <p>AADHAAR Number<i>*</i></p>
                <input disabled={formEdit} type="number" placeholder='AADHAAR Number' required name='aadhaarNumber' value={formData.aadhaarNumber} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Name as per AADHAAR</p>
                <input type="text" placeholder={'Name as per AADHAAR'} disabled name='aadhaarName' value={formData.aadhaarName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
          </div> : null}

          {catagory == "Individual" ? <div className="editpan_2">

            <div>
              <div>
                <p>Source Of Income<i>*</i></p>
                <select disabled={formEdit} required name='sourceOfIncome' value={formData.sourceOfIncome} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
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

          {catagory == "Individual" ? <div className="editpan_2">
            <div>
              <div>
                <p>Which of these documents are you submitting as an Identity Proof<i>*</i></p>
                <select disabled={formEdit} required name='identityProof' value={formData.identityProof} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <p>Which of these documents are you submitting as an Address Proof<i>*</i></p>
                <select disabled={formEdit} required name='addressProof' value={formData.addressProof} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <p>Which of these documents are you submitting as a DOB Proof<i>*</i></p>
                <select disabled={formEdit} required name='dobProof' value={formData.dobProof} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                </select>
              </div>
            </div>
          </div> : null}

          {catagory == "Individual" ? <div className="editpan_2">
            <div>
              <div>
                <p>You do hereby declare that whatever stated above is true in the capacity of<i>*</i></p>
                <select disabled={formEdit} required name='declarationCapacity' value={formData.declarationCapacity} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>Select</option>
                  <option value="HIMSELF/HERSELF">HIMSELF / HERSELF</option>
                  <option value="salaried Employee">REPRESENTATIVE ASSESSEE</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <p>Verifier Name<i>*</i></p>
                <input disabled={formEdit} type="text" placeholder='Verifier Name' required name='verifierName' value={formData.verifierName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Verifier Place<i>*</i></p>
                <input disabled={formEdit} type="text" placeholder='Verifier Place' required name='verifierPlace' value={formData.verifierPlace} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
              <div>
                <p>Verification Date<i>*</i></p>
                <input type="text" placeholder={currentDate} disabled name='verificationDate' value={formData.verificationDate} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
          </div> : null}


          {/* Others */}
          {catagory != "Individual" ? <div className="editpan_2">
            <div>
              <div style={{ width: '25%' }}>
                <p>Title<i>*</i></p>
                <select disabled={formEdit} required name='officetitle' value={formData.officetitle} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value={formData.officetitle} disabled>{formData.officetitle}</option>
                </select>
              </div>
              <div>
                <p>Full Name of Organization<i>*</i></p>
                <input disabled={formEdit} type="text" placeholder='Organization' name='organization' value={formData.organization} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
            <div>

              <div>
                <p>Date of Birth<i>*</i></p>
                <select disabled={formEdit} required name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>Date of Birth</option>
                  {array1To31 && array1To31?.map((ele, index) => (
                    <option key={index} value={ele}>{ele}</option>
                  ))}
                </select>
              </div>

              <div>
                <p>Month<i>*</i></p>
                <select disabled={formEdit} required name='monthOfBirth' value={formData.monthOfBirth} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>Month</option>
                  {monthsArray && monthsArray?.map((ele, index) => (
                    <option key={index} value={ele}>{ele}</option>
                  ))}
                </select>
              </div>

              <div>
                <p>Year<i>*</i></p>
                <select disabled={formEdit} required name='yearOfBirth' value={formData.yearOfBirth} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="" disabled>Year</option>
                  {yearsArray && yearsArray?.map((ele, index) => (
                    <option key={index} value={ele}>{ele}</option>
                  ))}
                </select>
              </div>

            </div>
          </div> : null}


          {catagory !== "Individual" ? (
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
                  >
                    <option value="" disabled>State/Union Territory</option>
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
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>                  </select>
                </div>
              </div>
              <div>
                <div>
                  <p>Office's Zip Code<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="number"
                    placeholder='Zip Code'
                    required
                    name='officezipCode'
                    value={formData.officezipCode}
                    onChange={handleChange}
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
                  >
                    <option value="" disabled>Country</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}


          {catagory !== "Individual" ? (
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
                  >
                    <option value="" disabled>Telephone ISD Code</option>
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <p>Telephone/Mobile number<i>*</i></p>
                  <input
                    disabled={formEdit}
                    type="number"
                    placeholder='Telephone/Mobile number'
                    required
                    name='telephoneNumber'
                    value={formData.telephoneNumber}
                    onChange={handleChange}
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
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
                    style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
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
                      style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}


          {catagory !== "Individual" ? (
            <div className="editpan_2">
              <h2>Source Of Income<i>*</i></h2>

              <div>
                <div>
                  <span style={{ display: 'flex', color: 'rgb(71, 71, 71)', margin: '10px', fontSize: '13px' }}>
                    <input disabled={formEdit} type="checkbox" name="sourceIncome" onClick={() => setSourceIncome(!sourceIncome)} />
                    <p style={{ marginLeft: '15px' }}>Are you are engaged in a business / profession?</p>
                  </span>
                  {sourceIncome ?
                    <select disabled={formEdit} required name='sourceOfIncome' value={formData.sourceOfIncome} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                      <option value="" disabled>Select Profession</option>
                      <option value="ARCHITECTURE">ARCHITECTURE</option>
                      <option value="BUILDERS AND DEVELOPERS">BUILDERS AND DEVELOPERS</option>
                    </select>
                    :
                    <select disabled={formEdit} required name='sourceOfIncome' value={formData.sourceOfIncome} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
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


          {catagory !== "Individual" ? (
            <div className="editpan_2">
              <h1>Representative Assessee</h1>
              <div>
                <div>
                  <p>Title<i>*</i></p>
                  <select disabled={formEdit} required name='title' value={formData.title} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                    <option value="" disabled>Title</option>
                    <option value="Shri">Shri</option>
                    <option value="Smt">Smt</option>
                    <option value="Kumari">Kumari</option>
                  </select>
                </div>
                <div>
                  <p>First name<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='First Name' onBlur={handleBlur} required name='firstName' value={formData.firstName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
                <div>
                  <p>Middle Name</p>
                  <input disabled={formEdit} type="text" placeholder='Middle Name' onBlur={handleBlur} name='middleName' value={formData.middleName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
                <div>
                  <p>Last Name<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Last Name' onBlur={handleBlur} required name='lastName' value={formData.lastName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
              </div>
              <div>
              </div>
              <div>
                <div>
                  <p>Flat/Door/Block Number<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Flat/Door/Block Number' required name='flatNumber' value={formData.flatNumber} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
                <div>
                  <p>Name of Premises/Building/Village<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Name of Premises/Building/Village' required name='premisesName' value={formData.premisesName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
              </div>
              <div>
                <div>
                  <p>Road/Street/Lane/Post Office<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Road/Street/Lane/Post Office' required name='roadName' value={formData.roadName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
                <div>
                  <p>Area/Locality/Taluka/Sub-Division<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Area/Locality/Taluka/Sub-Division' required name='area' value={formData.area} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
              </div>
              <div>
                <div>
                  <p>Town/City/District<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Town/City/District' required name='cityDistrict' value={formData.cityDistrict} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
                <div>
                  <p>State/Union Territory<i>*</i></p>
                  <select disabled={formEdit} required name='state' value={formData.state} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
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
                  <input disabled={formEdit} type="number" placeholder='Zip Code' required name='zipCode' value={formData.zipCode} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
                <div>
                  <p>Country<i>*</i></p>
                  <select disabled={formEdit} required name='country' value={formData.country} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                    <option value="" disabled>Country</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}


          {catagory != "Individual" ? <div className="editpan_2">
            <div>
              <div>
                <p>Which of these documents are you submitting as an Identity Proof<i>*</i></p>
                <select disabled={formEdit} required name='identityProof' value={formData.identityProof} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
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
                <select disabled={formEdit} required name='addressProof' value={formData.addressProof} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
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


          {catagory !== "Individual" ? (
            <div className="editpan_2">
              <div>
                <div>
                  <p>You do hereby declare that whatever stated above is true in the capacity of<i>*</i></p>
                  <select disabled={formEdit} required name='declarationCapacity' value={formData.declarationCapacity} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
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
                  <input disabled={formEdit} type="text" placeholder='Verifier Name' required name='verifierName' value={formData.verifierName} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
                <div>
                  <p>Verifier Place<i>*</i></p>
                  <input disabled={formEdit} type="text" placeholder='Verifier Place' required name='verifierPlace' value={formData.verifierPlace} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
                <div>
                  <p>Verification Date<i>*</i></p>
                  <input type="text" placeholder={currentDate} disabled name='verificationDate' value={formData.verificationDate} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
                </div>
              </div>
            </div>
          ) : null}


          {/* all */}
          <div className="editpan_2">
            <h2>Note : Physical PAN card will be delivered to applicant's address. e-PAN will be sent to applicant's e-mail.</h2>
            <div>
              <div>
                <p>Select the required option<i>*</i></p>
                <select disabled={formEdit} required name='requiredOption' value={formData.requiredOption} onChange={handleChange} style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }}>
                  <option value="Both Physical PAN Card and e-PAN">Both Physical PAN Card and e-PAN</option>
                </select>
              </div>
              <div>
                <p>PAN Fee</p>
                <input type="number" placeholder='₹ 107' disabled style={formEdit ? { borderBottom: '1px solid grey' } : { border: '1px solid grey' }} />
              </div>
            </div>
          </div>
          <div className='editpan_3'>
            <p style={{backgroundColor:formEdit?'#ffa600':null,color:formEdit?'white':'#ffa600',cursor:'pointer'}} onClick={()=>setFormEdit(!formEdit)}>EDIT FORM</p>
            <button type='submit'>SUBMIT</button>
          </div>
        </form>
      </div>

      <div><Footer /></div>
    </div>
  )
}


