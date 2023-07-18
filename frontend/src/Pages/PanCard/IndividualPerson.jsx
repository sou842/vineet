import './IndividualPerson.css';
import { DashboardFooter } from '../../Components/DashboradFooter/DashboradFooter'
import { PanCardNav } from '../../Components/PanCardNav/PanCardNav'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import date from 'date-and-time';
import axios from 'axios';

import {city, city_data} from  '../../city.js'
import { Footer } from '../../Components/Footer/Footer';



export const IndividualPerson = () => {
    const portalData=JSON.parse(localStorage.getItem('digitalPortal'))||null
    const { catagory } = useParams();
    const now = new Date();

    let currentDate = date.format(now, 'YYYY-MMM-DD');

    const [formData, setFormData] = useState({
        category: catagory,
        date: currentDate,
        city: '',
        areaCode: '',
        aotype: '',
        rangeCode: '',
        aoNo: '',
        firstName: '',
        middleName: '',
        lastName: '',
        title:"",
        gender: '',
        dateOfBirth: '',
        monthOfBirth: '',
        yearOfBirth: '',
        residenceAddress: '',
        flatNumber: '',
        premisesName: '',
        roadName: '',
        area: '',
        cityDistrict: '',
        state: '',
        zipCode: '',
        country: '',
        telephoneISDCode: '',
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
        requiredOption: '',
        documents:[],
        PanFee: 107
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        if(name=='city' && value!=''){
            setFormData((prevData) => ({...prevData,['areaCode']: city_data[value]['Area Code']}))
            setFormData((prevData) => ({...prevData,['aotype']: city_data[value]['AO Type']}))
            setFormData((prevData) => ({...prevData,['rangeCode']: city_data[value]['Range Code']}))
            setFormData((prevData) => ({...prevData,['aoNo']: city_data[value]['AO Number']}))
        }

        
        setFormData((prevData) => ({...prevData,[name]: value}));
    };


    console.log(formData);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
       axios.post("http://localhost:8080/user/new-pan-card",formData,{
        headers: {
            "Authorization": portalData.token
          }
    
       }).then((res)=>{
        console.log(res.data);
       })
       .catch((err)=>{
        console.log(err);
       })
    };
    return (
        <div style={{backgroundColor:'rgba(201, 201, 201, 0.249)'}}>
            <div><PanCardNav /></div>

            <div >
                <div className='individualPerson_1'>
                    <p> Email:- helpdigitalindiaportal@gmail.com</p>
                    <p> Phones:- 9368372889</p>
                    <p> Time:- (10am to 5pm रविवार अवकाश/Lunch Time:- 2:00PM TO 2:30PM)</p>
                </div>

                <h1 className='individualPerson_head'>NEW PANCARD</h1>

                <form onSubmit={handleSubmit}>
                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>Category of Applicant<i>*</i></p>
                                <input type="text" placeholder={catagory} disabled name='category' value={formData.category} onChange={handleChange} />
                            </div>
                            <div>
                                <p>Category of Applicant<i>*</i></p>
                                <input type="text" placeholder={currentDate} disabled name='date' value={formData.date} onChange={handleChange}/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>City*</p>
                                <select name="city" required value={formData.city} onChange={handleChange}>
                                    <option value="">City</option>
                                    {city.map((ele,index)=>(
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <p>Area code*</p>
                                <input type="text" value={formData.areaCode} placeholder='Area code' disabled />
                            </div>
                            <div>
                                <p>AOType*</p>
                                <input type="text" value={formData.aotype} placeholder='AOType' disabled />
                            </div>
                            <div>
                                <p>Range Code*</p>
                                <input type="text" value={formData.rangeCode} placeholder='Range Code' disabled />
                            </div>
                            <div>
                                <p>AO No*</p>
                                <input type="text" value={formData.aoNo} placeholder='AO No' disabled />
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <div>
                        <div>
                                <p>Title<i>*</i></p>
                                <select required name='title' value={formData.title} onChange={handleChange} >
                                    <option value="">Select</option>
                                    <option value="Shri">Shri</option>
                                    <option value="Smt">Smt</option>
                                    <option value="Kumari">Kumari</option>
                                </select>
                            </div>




                            <div>
                                <p>First name<i>*</i></p>
                                <input type="text" placeholder='First Name' required name='firstName' value={formData.firstName} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>Middle Name</p>
                                <input type="text" placeholder='Middle Name' name='middleName' value={formData.middleName} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>Last Name<i>*</i></p>
                                <input type="text" placeholder='Last Name' required name='lastName' value={formData.lastName} onChange={handleChange}/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Gender<i>*</i></p>
                                <select required name='gender' value={formData.gender} onChange={handleChange} >
                                    <option value="">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Transgender">Transgender</option>
                                </select>
                            </div>

                            <div>
                                <p>Date of Birth<i>*</i></p>
                                <select required name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange}>
                                    <option value="">Date of Birth</option>
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
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                            </div>

                            <div>
                                <p>Month<i>*</i></p>
                                <select required name='monthOfBirth' value={formData.monthOfBirth} onChange={handleChange}>
                                    <option value="">Month</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </div>

                            <div>
                                <p>Year<i>*</i></p>
                                <select required name='yearOfBirth' value={formData.yearOfBirth} onChange={handleChange}>
                                    <option value="">Year</option>
                                    <option value="1894">1894</option>
                                    <option value="1895">1895</option>
                                    <option value="1896">1896</option>
                                    <option value="1897">1897</option>
                                    <option value="1898">1898</option>
                                    <option value="1899">1899</option>
                                    <option value="1900">1900</option>
                                    <option value="1901">1901</option>
                                    <option value="1902">1902</option>
                                    <option value="1903">1903</option>
                                    <option value="1904">1904</option>
                                    <option value="1905">1905</option>
                                    <option value="1906">1906</option>
                                    <option value="1907">1907</option>
                                    <option value="1908">1908</option>
                                    <option value="1909">1909</option>
                                    <option value="1910">1910</option>
                                    <option value="1911">1911</option>
                                    <option value="1912">1912</option>
                                    <option value="1913">1913</option>
                                    <option value="1914">1914</option>
                                    <option value="1915">1915</option>
                                    <option value="1916">1916</option>
                                    <option value="1917">1917</option>
                                    <option value="1918">1918</option>
                                    <option value="1919">1919</option>
                                    <option value="1920">1920</option>
                                    <option value="1921">1921</option>
                                    <option value="1922">1922</option>
                                    <option value="1923">1923</option>
                                    <option value="1924">1924</option>
                                    <option value="1925">1925</option>
                                    <option value="1926">1926</option>
                                    <option value="1927">1927</option>
                                    <option value="1928">1928</option>
                                    <option value="1929">1929</option>
                                    <option value="1930">1930</option>
                                    <option value="1931">1931</option>
                                    <option value="1932">1932</option>
                                    <option value="1933">1933</option>
                                    <option value="1934">1934</option>
                                    <option value="1935">1935</option>
                                    <option value="1936">1936</option>
                                    <option value="1937">1937</option>
                                    <option value="1938">1938</option>
                                    <option value="1939">1939</option>
                                    <option value="1940">1940</option>
                                    <option value="1941">1941</option>
                                    <option value="1942">1942</option>
                                    <option value="1943">1943</option>
                                    <option value="1944">1944</option>
                                    <option value="1945">1945</option>
                                    <option value="1946">1946</option>
                                    <option value="1947">1947</option>
                                    <option value="1948">1948</option>
                                    <option value="1949">1949</option>
                                    <option value="1950">1950</option>
                                    <option value="1951">1951</option>
                                    <option value="1952">1952</option>
                                    <option value="1953">1953</option>
                                    <option value="1954">1954</option>
                                    <option value="1955">1955</option>
                                    <option value="1956">1956</option>
                                    <option value="1957">1957</option>
                                    <option value="1958">1958</option>
                                    <option value="1959">1959</option>
                                    <option value="1960">1960</option>
                                    <option value="1961">1961</option>
                                    <option value="1962">1962</option>
                                    <option value="1963">1963</option>
                                    <option value="1964">1964</option>
                                    <option value="1965">1965</option>
                                    <option value="1966">1966</option>
                                    <option value="1967">1967</option>
                                    <option value="1968">1968</option>
                                    <option value="1969">1969</option>
                                    <option value="1970">1970</option>
                                    <option value="1971">1971</option>
                                    <option value="1972">1972</option>
                                    <option value="1973">1973</option>
                                    <option value="1974">1974</option>
                                    <option value="1975">1975</option>
                                    <option value="1976">1976</option>
                                    <option value="1977">1977</option>
                                    <option value="1978">1978</option>
                                    <option value="1979">1979</option>
                                    <option value="1980">1980</option>
                                    <option value="1981">1981</option>
                                    <option value="1982">1982</option>
                                    <option value="1983">1983</option>
                                    <option value="1984">1984</option>
                                    <option value="1985">1985</option>
                                    <option value="1986">1986</option>
                                    <option value="1987">1987</option>
                                    <option value="1988">1988</option>
                                    <option value="1989">1989</option>
                                    <option value="1990">1990</option>
                                    <option value="1991">1991</option>
                                    <option value="1992">1992</option>
                                    <option value="1993">1993</option>
                                    <option value="1994">1994</option>
                                    <option value="1995">1995</option>
                                    <option value="1996">1996</option>
                                    <option value="1997">1997</option>
                                    <option value="1998">1998</option>
                                    <option value="1999">1999</option>
                                    <option value="2000">2000</option>
                                    <option value="2001">2001</option>
                                    <option value="2002">2002</option>
                                    <option value="2003">2003</option>
                                    <option value="2004">2004</option>
                                    <option value="2005">2005</option>
                                    <option value="2006">2006</option>
                                    <option value="2007">2007</option>
                                    <option value="2008">2008</option>
                                    <option value="2009">2009</option>
                                    <option value="2010">2010</option>
                                    <option value="2011">2011</option>
                                    <option value="2012">2012</option>
                                    <option value="2013">2013</option>
                                    <option value="2014">2014</option>
                                    <option value="2015">2015</option>
                                    <option value="2016">2016</option>
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <h2>Address for Communication(If you want to selected Office Address then Required Office Address Proof)</h2>
                        <div>
                            <div>
                                <p>Residence Address<i>*</i></p>
                                <select required name='residenceAddress' value={formData.residenceAddress} onChange={handleChange}>
                                    {/* <option value="">Address</option> */}
                                    <option value="Residence Address">Residence Address</option>
                                </select>
                            </div>
                        </div>
                        <h1>Residential Address</h1>
                        <div>
                            <div>
                                <p>Flat/Door/Block Number<i>*</i></p>
                                <input type="text" placeholder='Flat/Door/Block Number' required  name='flatNumber' value={formData.flatNumber} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>Name of Premises/Building/Village<i>*</i></p>
                                <input type="text" placeholder='Name of Premises/Building/Village' required name='premisesName' value={formData.premisesName} onChange={handleChange}/>
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
                                <input type="text" placeholder='Town/City/District' required name='cityDistrict' value={formData.cityDistrict} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>State/Union Territory<i>*</i></p>
                                <select required name='state' value={formData.state} onChange={handleChange}>
                                    <option value="">State/Union Territory</option>
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
                                <input type="number" placeholder='Zip Code' required  name='zipCode' value={formData.zipCode} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>Country<i>*</i></p>
                                <select required name='country' value={formData.country} onChange={handleChange}>
                                    <option value="">Country</option>
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
                                    <option value="">Telephone ISD Code</option>
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div>
                                <p>Telephone/Mobile number<i>*</i></p>
                                <input type="text" placeholder='Telephone/Mobile number' required  name='telephoneNumber' value={formData.telephoneNumber} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>Email Id<i>*</i></p>
                                <input type="text" placeholder='Email ID' required name='email' value={formData.email} onChange={handleChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>AADHAAR Number<i>*</i></p>
                                <input type="number" placeholder='AADHAAR Number' required name='aadhaarNumber' value={formData.aadhaarNumber} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>Name as per AADHAAR</p>
                                <input type="text" placeholder={formData.firstName?`${formData.firstName} ${formData.middleName} ${formData.lastName}`:'Name as per AADHAAR'} disabled name='aadhaarName' value={formData.aadhaarName} onChange={handleChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>Source Of Income<i>*</i></p>
                                <select required name='sourceOfIncome' value={formData.sourceOfIncome} onChange={handleChange}>
                                    <option value="">Source Of Income</option>
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

                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>Which of these documents are you submitting as an Identity Proof<i>*</i></p>
                                <select required name='identityProof' value={formData.identityProof} onChange={handleChange}>
                                    {/* <option value={''}>Select</option> */}
                                    <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Which of these documents are you submitting as an Address Proof<i>*</i></p>
                                <select required name='addressProof' value={formData.addressProof} onChange={handleChange}>
                                    {/* <option value={''}>Select</option> */}
                                    <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Which of these documents are you submitting as a DOB Proof<i>*</i></p>
                                <select required name='dobProof' value={formData.dobProof} onChange={handleChange}>
                                    {/* <option value={''}>Select</option> */}
                                    <option value="AADHAR Card issued by UIDAL (In Copy)">AADHAR Card issued by UIDAL (In Copy)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <div>
                            <div>
                                <p>You do hereby declare that whatever stated above is true in the capacity of<i>*</i></p>
                                <select required name='declarationCapacity' value={formData.declarationCapacity} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="HIMSELF/HERSELF">HIMSELF / HERSELF</option>
                                    <option value="salaried Employee">REPRESENTATIVE ASSESSEE</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Verifier Name<i>*</i></p>
                                <input type="text" placeholder='Verifier Name' required name='verifierName' value={formData.verifierName} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>Verifier Place<i>*</i></p>
                                <input type="text" placeholder='Verifier Place' required name='verifierPlace' value={formData.verifierPlace} onChange={handleChange}/>
                            </div>
                            <div>
                                <p>Verification Date<i>*</i></p>
                                <input type="text" placeholder={currentDate} disabled name='verificationDate' value={formData.verificationDate} onChange={handleChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="individualPerson_2">
                        <h2>Note : Physical PAN card will be delivered to applicant's address. e-PAN will be sent to applicant's e-mail.</h2>
                        <div>
                            <div>
                                <p>Select the required option<i>*</i></p>
                                <select required name='requiredOption' value={formData.requiredOption} onChange={handleChange}>
                                    {/* <option value="">Select</option> */}
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


