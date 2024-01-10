import '../styles/Auth.css'
import {useState,useContext, useEffect} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useCookies} from 'react-cookie'
import UserContext from '../utils/UserContext';
import { useNavigate } from 'react-router-dom';
import BackgroundAnimated from '../components/BackgroundAnimated';

const Auth = ()=>{
    let navigation = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [isDisabled,setIsDisabled] = useState(false)
    const [error,setError] = useState(null)
    const [cookie,setCookie] = useCookies()
    const {setUser} = useContext(UserContext)
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setIsDisabled(true)
        var bodyFormData = new FormData();
        bodyFormData.append('emailorstudentid',email)
        bodyFormData.append('password',password)
        const response = await fetch('https://crescent-laundry-backend.herokuapp.com/accounts/get-session-id/',{
            method: 'POST',
            body:bodyFormData
        })
        const data = await response.json();
        if(!response.ok){
            setError(data[1])
        }else{
            setCookie('SessionId',data.sessionid)
            setCookie('admin',data.is_admin)
            setCookie('user',email)
            setUser({
                email:cookie.user,
                is_admin:cookie.admin,
                sessionId:cookie.SessionId
            })
            navigation('/home')
        }
        setIsDisabled(false)
    }

    useEffect(()=>{
        if(cookie.SessionId){navigation('/home')}
    },[])

    return <div className='AuthPage'>
        <BackgroundAnimated>
            
        </BackgroundAnimated>
        <div className='innerDiv'>
            <h1>Login</h1>
            <form className='loginform' onSubmit={handleSubmit}>
                <input name='email' type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <div className='password-container'>
                    <input type={showPassword?'text':'password'} name='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <span onClick={()=>{
                        setShowPassword(!showPassword)
                        }}>{showPassword?<VisibilityIcon style={{color:'rgb(152,152,152)',cursor:'pointer'}} />:<VisibilityOffIcon style={{color:'rgb(152,152,152)',cursor:'pointer'}}/>}</span>
                </div>
                <input disabled={isDisabled} className='PrimaryButton' type='submit' />
                {error&&<p className='error'>{error}</p>}
                <p
                className='forgot'
                onClick={()=>{
                    if(email.length>0) navigation(`/forgot-password/${email}`)
                    else navigation(`/forgot-password/email`)
                }}>Forgot Password</p>
            </form>
        </div>
    </div>
}

export default Auth