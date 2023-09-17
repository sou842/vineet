import './AdminPanCardPerson.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AdminNavbar } from '../AdminNavbar/AdminNavbar'
import { Box, Image, useMediaQuery, useToast, Button } from '@chakra-ui/react'


export const AdminPanCardPerson = () => {
  const baseurl = process.env.REACT_APP_BASE_URL
  const [isSmallerThan1000] = useMediaQuery("(max-width: 1000px)")
  const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
  const { props } = useParams()
  const category = props.split('-')[0]
  const id = props.split('-')[1]

  const [formData, setFormData] = useState();
  const [document, setDocument] = useState(null);
  const [pdf, setPdf] = useState("")

  const [isComplete, setIscomplete] = useState(false)
  const [receipt, setReceipt] = useState("")

  const navigate = useNavigate()
  const toast = useToast()
  const handelSubmit = (e) => {
    e.preventDefault()

    const receiptData = new FormData()
    receiptData.append('receiptPdf', receipt)
    receiptData.append('panStatus', formData.panStatus)
    receiptData.append('acknowledgement', formData.acknowledgement)
    receiptData.append('slipGenerateDate', formData.slipGenerateDate)



    console.log();
    axios.patch(`${baseurl}/admin/user/status-change/${id}`, receiptData, {
      headers: { "Authorization": portalData.token }
    })
      .then((res) => {
        toast({
          title: res.data, status: 'success', duration: 5000, isClosable: true, position: 'top-center',
        })
        toast({ title: res.data, status: 'success', duration: 5000, isClosable: true, position: 'top-center', })
        navigate("/AdminPanCard")

      })
      .catch((err) => {
        toast({
          title: "Try again somthing went wrong!",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-center',
        })
        console.log(err);
      })

  }

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

  }



  useEffect(() => {
    axios.get(`${baseurl}/admin/individual-pan?category=${category}&id=${id}`, {
      headers: { "Authorization": portalData.token }
    })
      .then((res) => {
        console.log(res.data)
        setFormData(res.data.pans);
        setDocument(res.data.docs)
        setIscomplete(res.data.panStatus == "completed")
      })
      .catch((err) => {
        console.log(err);
      })


  }, [])

  return (
    <div>
      <AdminNavbar />
      <div className='AdminPanCardPerson_0'>
        <div style={isSmallerThan1000 ? null : { maxHeight: '100vh' }}>
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
                <tr>
                  <td>56.</td>
                  <td>Aadhaar Docs</td>
                  <td>
                    <Button w={'40%'} size={'sm'} colorScheme='green' isDisabled={document == null} onClick={(e) => window.open(`${baseurl}/${document.aadharDoc}`, "_blank")}>View</Button>
                  </td>
                </tr>
                <tr>
                  <td>57.</td>
                  <td>FormFront Docs</td>
                  <td>
                    <Button w={'40%'} size={'sm'} colorScheme='green' isDisabled={document == null} onClick={(e) => window.open(`${baseurl}/${document.form49Front}`, "_blank")}>View</Button>
                  </td>
                </tr>
                <tr>
                  <td>58.</td>
                  <td>FormBack Docs</td>
                  <td>
                    <Button w={'40%'} size={'sm'} colorScheme='green' isDisabled={document == null} onClick={(e) => window.open(`${baseurl}/${document.form49Back}`, "_blank")}>View</Button>
                  </td>
                </tr>
                {
                  document && document.parentAadharDoc ? <tr>
                    <td>59.</td>
                    <td>ParentAadhaar Docs</td>
                    <td>
                      <Button w={'40%'} size={'sm'} colorScheme='green' isDisabled={document == null} onClick={(e) => window.open(`${baseurl}/${document.parentAadharDoc}`, "_blank")}>View</Button>
                    </td>
                  </tr> : null
                }

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
                <tr>
                  <td>55.</td>
                  <td>PAN Fee</td>
                  <td>₹ {formData.PanFee}</td>
                </tr>
                <tr>
                  <td>56.</td>
                  <td>Aadhaar Docs</td>
                  <td>
                    <Button w={'40%'} size={'sm'} colorScheme='green' isDisabled={document == null} onClick={(e) => window.open(`${baseurl}/${document.aadharDoc}`, "_blank")}>View</Button>
                  </td>
                </tr>
                <tr>
                  <td>57.</td>
                  <td>FormFront Docs</td>
                  <td>

                    <Button w={'40%'} size={'sm'} colorScheme='green' isDisabled={document == null} onClick={(e) => window.open(`${baseurl}/${document.form49Front}`, "_blank")}>View</Button>

                  </td>
                </tr>
                <tr>
                  <td>58.</td>
                  <td>FormBack Docs</td>
                  <td>
                    <Button w={'40%'} size={'sm'} colorScheme='green' isDisabled={document == null} onClick={(e) => window.open(`${baseurl}/${document.form49Back}`, "_blank")}>View</Button>

                  </td>
                </tr>
              </tbody>
            </table> : null}

        </div>

        <div>
          <form onSubmit={handelSubmit}>
            <h1>CONFIRMMATION</h1>
            <p>Status</p>
            {/* <input type="text" placeholder='Update Acknowledgement' /> */}
            <select required value={formData && formData.panStatus} name='panStatus' onChange={handelChange}>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
            <p>Acknowledgement</p>
            <input type="number" placeholder='Acknowledgement Number' required value={formData && formData.acknowledgement} name='acknowledgement' onChange={handelChange} />
            <p>Slip Generate Date</p>
            <input type='date' value={formData && formData.slipGenerateDate} name='slipGenerateDate' onChange={handelChange} />
            <p>Receipt</p>
            <input type="file" name='receipt' onChange={(e) => setReceipt(e.target.files[0])} />
            <Button w={'40%'} type='submit' isDisabled={isComplete || formData && !formData.isDoneFromUser}  >SUBMIT</Button>
          </form>


          <p onClick={() => navigate('/AdminPanCard')} style={{ textAlign: 'center', margin: '10px', fontSize: '18px', cursor: 'pointer' }}>← BACK</p>
        </div>
      </div>
      {/* <Box  w={'90%'} display={'flex'} flexDirection={['column', 'column', 'row',]} justifyContent={'space-between'} gap={'10px'} m={'auto'} mt={['0.5cm','0.5cm','1cm']} mb={'1cm'}>
        <Box w={['100%', '100%', '30%']} m={'auto'} border={'1px solid grey'} h={'350px'} display={'flex'} justifyContent={'center'} alignItems={'center'} position="relative">
          <Image src='https://cdn-icons-png.flaticon.com/128/7188/7188242.png' />
          <Box position="absolute" top="10px" right="10px" borderRadius="full" bg="whiteAlpha.700" boxShadow="md" p={1} cursor={'pointer'}  >
            <Image position={'relative'} w={'25px'} src={'https://cdn-icons-png.flaticon.com/128/4208/4208397.png'} m={'6px'} />
          </Box>
        </Box>
        <Box w={['100%', '100%', '30%']} m={'auto'} border={'1px solid grey'} h={'350px'} display={'flex'} justifyContent={'center'} alignItems={'center'} position="relative">
          <Image src='https://cdn-icons-png.flaticon.com/128/7188/7188242.png' />
          <Box position="absolute" top="10px" right="10px" borderRadius="full" bg="whiteAlpha.700" boxShadow="md" p={1} cursor={'pointer'}  >
            <Image position={'relative'} w={'25px'} src={'https://cdn-icons-png.flaticon.com/128/4208/4208397.png'} m={'6px'} />
          </Box>
        </Box>
        <Box w={['100%', '100%', '30%']} m={'auto'} border={'1px solid grey'} h={'350px'} display={'flex'} justifyContent={'center'} alignItems={'center'} position="relative">
          <Image src='https://cdn-icons-png.flaticon.com/128/7188/7188242.png' />
          <Box position="absolute" top="10px" right="10px" borderRadius="full" bg="whiteAlpha.700" boxShadow="md" p={1} cursor={'pointer'}  >
            <Image position={'relative'} w={'25px'} src={'https://cdn-icons-png.flaticon.com/128/4208/4208397.png'} m={'6px'} />
          </Box>
        </Box>
      </Box> */}
    </div>
  )
}