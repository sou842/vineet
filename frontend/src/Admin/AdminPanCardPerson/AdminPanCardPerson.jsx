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
                  <th>No.</th>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>Category of Applicant</td>
                  <td>{formData.category}</td>
                </tr>
                <tr>
                <td>2.</td>
                  <td>Date of Applicant</td>
                  <td>{formData.date}</td>
                </tr>
                <tr>
                <td>3.</td>
                  <td>City</td>
                  <td>{formData.city}</td>
                </tr>
                <tr>
                <td>4.</td>
                  <td>Area code</td>
                  <td>{formData.areaCode}</td>
                </tr>
                <tr>
                <td>5.</td>
                  <td>AOType</td>
                  <td>{formData.aotype}</td>
                </tr>
                <tr>
                <td>6.</td>
                  <td>Range Code</td>
                  <td>{formData.rangeCode}</td>
                </tr>
                <tr>
                <td>7.</td>
                  <td>AO No</td>
                  <td>{formData.aoNo}</td>
                </tr>
                <tr>
                <td>8.</td>
                  <td>Title</td>
                  <td>{formData.title}</td>
                </tr>
                <tr>
                <td>9.</td>
                  <td>First name</td>
                  <td>{formData.firstName}</td>
                </tr>
                <tr>
                <td>10.</td>
                  <td>Middle Name</td>
                  <td>{formData.middleName}</td>
                </tr>
                <tr>
                <td>11.</td>
                  <td>Last Name</td>
                  <td>{formData.lastName}</td>
                </tr>
                <tr>
                <td>12.</td>
                  <td>Name on Card</td>
                  <td>{formData.NameOnCard}</td>
                </tr>
                <tr>
                <td>13.</td>
                  <td>Gender</td>
                  <td>{formData.gender}</td>
                </tr>
                <tr>
                <td>14.</td>
                  <td>Date of Birth</td>
                  <td>{formData.dateOfBirth}</td>
                </tr>
                <tr>
                <td>15.</td>
                  <td>Month</td>
                  <td>{formData.monthOfBirth}</td>
                </tr>
                <tr>
                <td>16.</td>
                  <td>Year</td>
                  <td>{formData.yearOfBirth}</td>
                </tr>
                <tr>
                <td>17.</td>
                  <td>Father's First Name</td>
                  <td>{formData.father_FName}</td>
                </tr>
                <tr>
                <td>18.</td>
                  <td>Father's Middle Name</td>
                  <td>{formData.father_MName}</td>
                </tr>
                <tr>
                <td>19.</td>
                  <td>Father's Last Name</td>
                  <td>{formData.father_LName}</td>
                </tr>
                <tr>
                <td>20.</td>
                  <td>Residence Address</td>
                  <td>{formData.Address}</td>
                </tr>
                <tr>
                <td>21.</td>
                  <td>Flat/Door/Block Number</td>
                  <td>{formData.flatNumber}</td>
                </tr>
                <tr>
                <td>22.</td>
                  <td>Name of Premises/Building/Village</td>
                  <td>{formData.premisesName}</td>
                </tr>
                <tr>
                <td>23.</td>
                  <td>Road/Street/Lane/Post Office</td>
                  <td>{formData.roadName}</td>
                </tr>
                <tr>
                <td>24.</td>
                  <td>Area/Locality/Taluka/Sub-Division</td>
                  <td>{formData.area}</td>
                </tr>
                <tr>
                <td>25.</td>
                  <td>Town/City/District</td>
                  <td>{formData.cityDistrict}</td>
                </tr>
                <tr>
                <td>26.</td>
                  <td>State/Union Territory</td>
                  <td>{formData.state}</td>
                </tr>
                <tr>
                <td>27.</td>
                  <td>Zip Code</td>
                  <td>{formData.zipCode}</td>
                </tr>
                <tr>
                <td>28.</td>
                  <td>Country</td>
                  <td>{formData.country}</td>
                </tr>
                <tr>
                <td>29.</td>
                  <td>Telephone ISD Code</td>
                  <td>{formData.telephoneISDCode}</td>
                </tr>
                <tr>
                <td>30.</td>
                  <td>Telephone/Mobile number</td>
                  <td>{formData.telephoneNumber}</td>
                </tr>
                <tr>
                <td>31.</td>
                  <td>Email Id</td>
                  <td>{formData.email}</td>
                </tr>
                <tr>
                <td>32.</td>
                  <td>Registration Number</td>
                  <td>{formData.registrationNumber}</td>
                </tr>
                <tr>
                <td>33.</td>
                  <td>AADHAAR Number</td>
                  <td>{formData.aadhaarNumber}</td>
                </tr>
                <tr>
                <td>34.</td>
                  <td>Name as per AADHAAR</td>
                  <td>{formData.aadhaarName}</td>
                </tr>
                <tr>
                <td>35.</td>
                  <td>Source Of Income</td>
                  <td>{formData.sourceOfIncome}</td>
                </tr>
                {/* .... */}
                <tr>
                  <td>36.</td>
                  <td>RA Title</td>
                  <td>{formData.representativetitle}</td>
                </tr>
                <tr>
                  <td>37.</td>
                  <td>RA First name</td>
                  <td>{formData.representativefirstName}</td>
                </tr>
                <tr>
                  <td>38.</td>
                  <td>RA Middle Name</td>
                  
                  <td>{formData.representativemiddleName}</td>
                </tr>
                <tr>
                  <td>39.</td>
                  <td>RA Last Name</td>
                  <td>{formData.representativelastName}</td>
                </tr>
                <tr>
                  <td>40.</td>
                  <td>RA Flat/Door/Block Number</td>
                  <td>{formData.representativeflatNumber}</td>
                </tr>
                <tr>
                  <td>41.</td>
                  <td>RA Name of Premises/Building/Village</td>
                  <td>{formData.representativepremisesName}</td>
                </tr>
                <tr>
                  <td>42.</td>
                  <td>RA Road/Street/Lane/Post Office</td>
                  <td>{formData.representativeroadName}</td>
                </tr>
                <tr>
                  <td>43.</td>
                  <td>RA Area/Locality/Taluka/Sub-Division</td>
                  <td>{formData.representativearea}</td>
                </tr>
                <tr>
                  <td>44.</td>
                  <td>RA Town/City/District</td>
                  <td>{formData.representativecityDistrict}</td>
                </tr>
                <tr>
                  <td>45.</td>
                  <td>RA State/Union Territory</td>
                  <td>{formData.representativestate}</td>
                </tr>
                <tr>
                  <td>46.</td>
                  <td>RA Zip Code</td>
                  <td>{formData.representativezipCode}</td>
                </tr>
                <tr>
                  <td>47.</td>
                  <td>RA Country</td>
                  <td>{formData.representativecountry}</td>
                </tr>
                {/* .... */}
                <tr>
                <td>48.</td>
                  <td>Identity Proof</td>
                  <td>{formData.identityProof}</td>
                </tr>
                <tr>
                <td>49.</td>
                  <td>Address Proof</td>
                  <td>{formData.addressProof}</td>
                </tr>
                <tr>
                <td>50.</td>
                  <td>DOB Proof</td>
                  <td>{formData.dobProof}</td>
                </tr>
                <tr>
                <td>51.</td>
                  <td>capacity</td>
                  <td>{formData.declarationCapacity}</td>
                </tr>
                <tr>
                <td>52.</td>
                  <td>Verifier Name</td>
                  <td>{formData.verifierName}</td>
                </tr>
                <tr>
                <td>53.</td>
                  <td>Verifier Place</td>
                  <td>{formData.verifierPlace}</td>
                </tr>
                <tr>
                <td>54.</td>
                  <td>Verification Date</td>
                  <td>{formData.verificationDate}</td>
                </tr>
                <tr>
                <td>55.</td>
                  <td>PAN Fee</td>
                  <td>₹ {formData.PanFee}</td>
                </tr>
              </tbody>

            </table> : null}

          {formData != undefined && formData.category != 'Individual' ?
            <table >
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>Category of Applicant</td>
                  <td>{formData.category}</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>City</td>
                  <td>{formData.city}</td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>Area code</td>
                  <td>{formData.areaCode}</td>
                </tr>
                <tr>
                  <td>4.</td>
                  <td>AOType</td>
                  <td>{formData.aotype}</td>
                </tr>
                <tr>
                  <td>5.</td>
                  <td>Range Code</td>
                  <td>{formData.rangeCode}</td>
                </tr>
                <tr>
                  <td>6.</td>
                  <td>AO No</td>
                  <td>{formData.aoNo}</td>
                </tr>
                <tr>
                  <td>7.</td>
                  <td>Organization Title</td>
                  <td>{formData.officetitle}</td>
                </tr>
                <tr>
                  <td>8.</td>
                  <td>Full Name of Organization</td>
                  <td>{formData.organization}</td>
                </tr>
                <tr>
                  <td>9.</td>
                  <td>Date of Birth</td>
                  <td>{formData.dateOfBirth}</td>
                </tr>
                <tr>
                  <td>10.</td>
                  <td>Month</td>
                  <td>{formData.monthOfBirth}</td>
                </tr>
                <tr>
                  <td>11.</td>
                  <td>Year</td>
                  <td>{formData.yearOfBirth}</td>
                </tr>
                <tr>
                  <td>12.</td>
                  <td>Office Address</td>
                  <td>{formData.Address}</td>
                </tr>
                <tr>
                  <td>13.</td>
                  <td>Name of the Office</td>
                  <td>{formData.officeName}</td>
                </tr>
                <tr>
                  <td>14.</td>
                  <td>Office's Flat/Door/Block Number</td>
                  <td>{formData.officeflatNumber}</td>
                </tr>
                <tr>
                  <td>15.</td>
                  <td>Office's Name of Premises/Building/Village</td>
                  <td>{formData.officepremisesName}</td>
                </tr>
                <tr>
                  <td>16.</td>
                  <td>Office's Road/Street/Lane/Post Office</td>
                  <td>{formData.officeroadName}</td>
                </tr>
                <tr>
                  <td>17.</td>
                  <td>Office's Area/Locality/Taluka/Sub-Division</td>
                  <td>{formData.officearea}</td>
                </tr>
                <tr>
                  <td>18.</td>
                  <td>Office's Town/City/District</td>
                  <td>{formData.officecityDistrict}</td>
                </tr>
                <tr>
                  <td>19.</td>
                  <td>Office's State/Union Territory</td>
                  <td>{formData.officestate}</td>
                </tr>
                <tr>
                  <td>20.</td>
                  <td>Office's Zip Code</td>
                  <td>{formData.officezipCode}</td>
                </tr>
                <tr>
                  <td>21.</td>
                  <td>Office's Country</td>
                  <td>{formData.officecountry}</td>
                </tr>
                <tr>
                  <td>22.</td>
                  <td>Telephone ISD Code</td>
                  <td>{formData.telephoneISDCode}</td>
                </tr>
                <tr>
                  <td>23.</td>
                  <td>Telephone/Mobile number</td>
                  <td>{formData.telephoneNumber}</td>
                </tr>
                <tr>
                  <td>24.</td>
                  <td>Email</td>
                  <td>{formData.email}</td>
                </tr>
                <tr>
                  <td>25.</td>
                  <td>Registration Number</td>
                  <td>{formData.registrationNumber}</td>
                </tr>
                <tr>
                  <td>26.</td>
                  <td>Source Of Income</td>
                  <td>{formData.sourceOfIncome}</td>
                </tr>
                <tr>
                  <td>27.</td>
                  <td>RA Title</td>
                  <td>{formData.representativetitle}</td>
                </tr>
                <tr>
                  <td>28.</td>
                  <td>RA First name</td>
                  <td>{formData.representativefirstName}</td>
                </tr>
                <tr>
                  <td>29.</td>
                  <td>RA Middle Name</td>
                  <td>{formData.representativemiddleName}</td>
                </tr>
                <tr>
                  <td>30.</td>
                  <td>RA Last Name</td>
                  <td>{formData.representativelastName}</td>
                </tr>
                <tr>
                  <td>31.</td>
                  <td>RA Flat/Door/Block Number</td>
                  <td>{formData.representativeflatNumber}</td>
                </tr>
                <tr>
                  <td>32.</td>
                  <td>RA Name of Premises/Building/Village</td>
                  <td>{formData.representativepremisesName}</td>
                </tr>
                <tr>
                  <td>33.</td>
                  <td>RA Road/Street/Lane/Post Office</td>
                  <td>{formData.representativeroadName}</td>
                </tr>
                <tr>
                  <td>34.</td>
                  <td>RA Area/Locality/Taluka/Sub-Division</td>
                  <td>{formData.representativearea}</td>
                </tr>
                <tr>
                  <td>35.</td>
                  <td>RA Town/City/District</td>
                  <td>{formData.representativecityDistrict}</td>
                </tr>
                <tr>
                  <td>36.</td>
                  <td>RA State/Union Territory</td>
                  <td>{formData.representativestate}</td>
                </tr>
                <tr>
                  <td>37.</td>
                  <td>RA Zip Code</td>
                  <td>{formData.representativezipCode}</td>
                </tr>
                <tr>
                  <td>38.</td>
                  <td>RA Country</td>
                  <td>{formData.representativecountry}</td>
                </tr>
                <tr>
                  <td>39</td>
                  <td>Identity Proof</td>
                  <td>{formData.identityProof}</td>
                </tr>
                <tr>
                  <td>40.</td>
                  <td>Address Proof</td>
                  <td>{formData.addressProof}</td>
                </tr>
                <tr>
                  <td>41.</td>
                  <td>Capacity</td>
                  <td>{formData.declarationCapacity}</td>
                </tr>
                <tr>
                  <td>42.</td>
                  <td>Verifier Name</td>
                  <td>{formData.verifierName}</td>
                </tr>
                <tr>
                  <td>43.</td>
                  <td>Verifier Place</td>
                  <td>{formData.verifierPlace}</td>
                </tr>
                <tr>
                  <td>44.</td>
                  <td>Verification Date</td>
                  <td>{formData.verificationDate}</td>
                </tr>
                <tr>
                  <td>45.</td>
                  <td>PAN Fee</td>
                  <td>₹ {formData.PanFee}</td>
                </tr>
              </tbody>
            </table> : null}

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
          <p onClick={() => navigate('/AdminPanCard')} style={{ textAlign: 'center', margin: '10px', fontSize: '18px', cursor: 'pointer' }}>← BACK</p>
        </div>
      </div>
    </div>
  )
}