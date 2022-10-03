import Logo from '../assets/images/logo.png'
import PrimaryButton from './Buttons/PrimaryButton'

const AdminNav = ()=>{
    return <nav className='adminNav'>
        <img src={Logo} alt='crescent logo'/>
        <PrimaryButton onClick={()=>{ console.log('clicked') }}>Add New Student</PrimaryButton>
    </nav>
}

export default AdminNav