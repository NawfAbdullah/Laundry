import { useState,useEffect } from 'react'
import WashingMachine from '../components/WashingMachine'
import '../styles/Student.css'
import Logo from '../assets/images/logo.png'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import SecondaryLink from '../components/Buttons/SecondaryLink'

const Student = ()=>{
    let navigate = useNavigate()
    const [progressCode,setProgressCode] = useState(0)
    const [name,setName] = useState()
    const progressTypes = ['You have not given anything','Your clothes are waiting','We are washing your clothes',"We've washed your clothes"]
    const [cookie,setCookie,removeCookie] = useCookies(['user'])
    useEffect(()=>{
        const updateData = async ()=>{
            const response = await fetch("https://crescent-laundry-backend.herokuapp.com/get-data/user-data?washing_progress&username",{
                method:'POST',
                headers:{
                    'SESSIONID':cookie.SessionId
                }
            })
            const res = await response.json()
            console.log(res.washing_progress);
            setProgressCode(res.washing_progress)
            setName(res.username)
        }
        updateData()
    },[cookie,progressTypes])
    return <div className="studentPage">
        <nav className='studentNav' >
            <img src={Logo} alt='crescent logo'/>
            <SecondaryLink onClick={()=>navigate('/changePassword')}>Change Password</SecondaryLink>
            <SecondaryLink onClick={()=>navigate('/myprofile')}>My Profile</SecondaryLink>
            <PrimaryButton onClick={()=>{ 
                removeCookie('SessionId')
                removeCookie('admin')
                removeCookie('email')
                navigate('/')
             }}>Logout</PrimaryButton>
        </nav>
        <div className='middleContainer'>
            <WashingMachine progressCode={progressCode}/>
            <ul className='progressList'>
                <h3>Hey {name}, {progressTypes[progressCode]}</h3>
                <li style={{color:progressCode>=1?'#00B389':'rgb(172,172,172)'}}>
                    <span style={{
                        border:progressCode>=1?'2px solid #00B389':'2px solid rgb(172,172,172)',
                        backgroundColor:progressCode>=1?'#00B389':'transparent',
                        color:progressCode>=1?'#fff':'rgb(172,172,172)'
                        }}>1</span>
                    <h5>Accepted</h5>
                </li>
                <li style={{color:progressCode>=2?'#00B389':'rgb(172,172,172)'}}>
                    <span style={{
                        border:progressCode>=2?'2px solid #00B389':'2px solid rgb(172,172,172)',
                        backgroundColor:progressCode>=2?'#00B389':'transparent',
                        color:progressCode>=2?'#fff':'rgb(172,172,172)'
                        }}>2</span>
                    <h5>Washing</h5>
                </li>
                <li style={{color:progressCode>=3?'#00B389':'rgb(172,172,172)'}}>
                    <span style={{
                        border:progressCode>=3?'2px solid #00B389':'2px solid rgb(172,172,172)',
                        backgroundColor:progressCode>=3?'#00B389':'transparent',
                        color:progressCode>=3?'#fff':'rgb(172,172,172)'
                        }}>3</span>
                    <h5>Washed</h5>
                </li>
            </ul>
        </div>
    </div>
}

export default Student