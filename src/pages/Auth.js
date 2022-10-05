import '../styles/Auth.css'
import {useEffect, useRef, useState} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import WashingMachine from '../components/WashingMachine'

const Auth = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [isDisabled,setIsDisabled] = useState(false)
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setIsDisabled(true)
        const response = await axios.get('https://crescent-laundry-backend.herokuapp.com/accounts/get-session-id/',{email,password})
        console.log(response.data);
        setIsDisabled(false)
    }

    return <div className='AuthPage'>
        <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
        {isDisabled?<><WashingMachine progressCode={2}/><h1>Logging In</h1> </>:<div className='innerDiv'>
            <h1>Login</h1>
            <form className='loginform' onSubmit={handleSubmit}>
                <input name='email' type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <div className='password-container'>
                    <input type={showPassword?'text':'password'} name='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <span onClick={()=>{
                        setShowPassword(!showPassword)
                        }}>{showPassword?<VisibilityIcon style={{color:'rgb(152,152,152)'}} />:<VisibilityOffIcon style={{color:'rgb(152,152,152)'}}/>}</span>
                </div>
                <input disabled={isDisabled} className='PrimaryButton' type='submit' />
            </form>
        </div>}
    </div>
}

export default Auth