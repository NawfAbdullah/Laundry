import {useState} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BackgroundAnimated from '../components/BackgroundAnimated';
import '../styles/Auth.css'
import {useCookies} from 'react-cookie'
import Check from '../assets/images/check.png'

const ChangePassword = ()=>{
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [showOldPassword,setShowOldPassword] = useState(false)
    const [showNewPassword,setShowNewPassword] = useState(false)
    const [isDisabled,setIsDisabled] = useState(false)
    const [error,setError] = useState()
    const [isSuccess,setIsSuccess] = useState(false)
    const [cookies] = useCookies(['user'])
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setIsDisabled(true)
        const fd = new FormData()
        fd.append('old-password',oldPassword)
        fd.append('new-password',newPassword)
        const response = await fetch('https://crescent-laundry-backend.herokuapp.com/accounts/change-password/',{
            method:'POST',
            body:fd,
            headers:{
                'SESSIONID':cookies.SessionId
            }
        })
        const res = await response.json()
        if(res==='Success'){
            setIsDisabled(false)
            setIsSuccess(true)
        }else{
            setError(res[1])
            setIsDisabled(false)
        }
    }
    return <div className='AuthPage'>
    <BackgroundAnimated>
        
    </BackgroundAnimated>
    <div className='innerDiv'>
        <h1>Change Password</h1>
        <form className='loginform' onSubmit={handleSubmit}>
           {!isSuccess?<><div className='password-container'>
                <input type={showOldPassword?'text':'password'} name='password' placeholder='Password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                <span onClick={()=>{
                    setShowOldPassword(!showOldPassword)
                    }}>{showOldPassword?<VisibilityIcon style={{color:'rgb(152,152,152)'}} />:<VisibilityOffIcon style={{color:'rgb(152,152,152)'}}/>}</span>
            </div>
            <div className='password-container'>
                <input type={showNewPassword?'text':'password'} name='password' placeholder='Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                <span onClick={()=>{
                    setShowNewPassword(!showNewPassword)
                    }}>{showNewPassword?<VisibilityIcon style={{color:'rgb(152,152,152)'}} />:<VisibilityOffIcon style={{color:'rgb(152,152,152)'}}/>}</span>
            </div>
            <input disabled={isDisabled} className='PrimaryButton' type='submit' />
            {error&&<p className='error'>{error}</p>}
            </>:<>
                    <img className='successPage' src={Check} alt=''/>
            </>}
        </form>
    
    </div>
</div>
}

export default ChangePassword