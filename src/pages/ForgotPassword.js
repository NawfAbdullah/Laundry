import { useState } from "react"
import { useParams } from "react-router-dom"
import BackgroundAnimated from "../components/BackgroundAnimated"
import PrimaryButton from "../components/Buttons/PrimaryButton"
import '../styles/ForgotPassword.css'

const ForgotPassword = ()=>{
    const {email} = useParams()
    const [forgetEmail,setForgetEmail] = useState(email)
    const [isDisabled,setIsDisabled] = useState(false)
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setIsDisabled(true)
        const formData = new FormData()
        formData.append('email',forgetEmail)
        const response = await fetch("https://crescent-laundry-backend.herokuapp.com/accounts/forgot-password/",{
            body:formData,
            method:'POST'
        })
        const res = await response.json()
        console.log(res);
        setIsDisabled(false)
    }
    return <div className="AuthPage">
        <BackgroundAnimated />
        <div className='innerDiv'>
            <h1>Forgot Password</h1>
            <form className='loginform' onSubmit={handleSubmit}>
                <input name='email' type='text' placeholder='Email' value={forgetEmail} onChange={(e)=>setForgetEmail(e.target.value)} />
                <input disabled={isDisabled} className='PrimaryButton' type='submit' />
            </form>
        </div>
    </div>
}

export default ForgotPassword