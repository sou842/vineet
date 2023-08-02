import { useParams } from 'react-router-dom';
import './AminPerson';
import { useEffect, useState } from 'react';
import axios from 'axios';


export const AminPerson = () =>{
  const portalData = JSON.parse(localStorage.getItem("digitalPortal")) || null;
  const [users, setUsers] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    // axios.get("http://localhost:8080/api", {
    //     headers: { "Authorization": portalData.token }
    // })
    //     .then((res) => {
    //         console.log(res.data)
    //         setUsers(res.data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
}, [])

return (
    <div>
        AminPerson {id}
    </div>
)
}