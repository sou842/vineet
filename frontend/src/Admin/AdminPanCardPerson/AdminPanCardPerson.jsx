import { useParams } from 'react-router-dom'
import './AdminPanCardPerson.css'


export const AdminPanCardPerson = () =>{
const { id } = useParams()


return (
    <div>
        AdminPanCardPerson {id}
    </div>
)
}