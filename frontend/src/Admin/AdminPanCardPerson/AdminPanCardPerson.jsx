import './AdminPanCardPerson.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


export const AdminPanCardPerson = () => {
    const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
    const { id } = useParams()
    const [formData, setFormData] = useState();
    const navigate = useNavigate()

    // 64d0e7c891159f838c47020d
    useEffect(() => {
        axios.get(`http://localhost:8080/admin/individual-pan/${id}`, {
            headers: { "Authorization": portalData.token }
        })
            .then((res) => {
                console.log(res.data)
                setFormData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // console.log(formData&&formData.category== "Individual" )

    return (
        <div>
            <div className='AdminPanCardPerson_0'>
            <div>
            {formData != undefined && formData.category == 'Individual' ?
                <table >
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

               {formData != undefined && formData.category != 'Individual' ?
            <table >
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
          </table>: null}

            </div>

                <div>
                    <form>
                        <h1>CONFIRMMATION</h1>
                        <p>Acknowledgement</p>
                        <input type="text" placeholder='Update Acknowledgement' />
                        <p>Slip Generate Date</p>
                        <input type='date' />
                        <p>Receipt</p>
                        <input type="file" />
                        <button type='submit'>SUBMIT</button>
                    </form>
                    <p onClick={()=> navigate('/AdminPanCard')} style={{textAlign:'center',margin:'10px',fontSize:'18px',cursor:'pointer'}}>← BACK</p>
                </div>
            </div>
        </div>
    )
}