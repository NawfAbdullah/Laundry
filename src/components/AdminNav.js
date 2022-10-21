import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/images/logo.png'
import PrimaryButton from './Buttons/PrimaryButton'
import SecondaryLink from './Buttons/SecondaryLink'

const AdminNav = ()=>{
    const navigate = useNavigate()
    const [cookie,setCookie,removeCookie] = useCookies(['user'])
    return <nav className='adminNav'>
        <img src={Logo} alt='crescent logo'/>
        <div className='buttons-container'>
            <SecondaryLink onClick={()=>{ 
                    removeCookie('SessionId')
                    removeCookie('admin')
                    removeCookie('email')
                    navigate('/')
                }}>Logout</SecondaryLink>
            <SecondaryLink onClick={()=>{
                navigate('/changePassword')
            }}>Change Password</SecondaryLink>
            <SecondaryLink onClick={()=>{
                navigate('/create-new-student')
            }}>Add New Student</SecondaryLink>
        </div>
    </nav>
}

export default AdminNav