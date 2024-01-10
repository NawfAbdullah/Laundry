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
    const [studentId,setStudentId] = useState('')
    const progressTypes = ['You have not given anything','Your clothes are waiting','We are washing your clothes',"We've washed your clothes"]
    const [cookie,setCookie,removeCookie] = useCookies(['user'])
    const [dates,setDates] = useState([])
    const [estimatedTime,setEsimatedTime] = useState(new Date())
    const [countDown,setCountDown] = useState('--:--:--')
    useEffect(()=>{
        const updateData = async ()=>{
            const response = await fetch("https://crescent-laundry-backend.herokuapp.com/get-data/user-data?washing_progress&username&student_id",{
                method:'POST',
                headers:{
                    'SESSIONID':cookie.SessionId
                }
            })
            const res = await response.json()
            setProgressCode(res.washing_progress)
            setName(res.username)
            setStudentId(res.student_id)
        }
        updateData()
    },[cookie,progressTypes])

    useEffect(()=>{
        var timer
        const getData = async ()=>{
            if(studentId.length>0){
                const response = await fetch(`https://crescent-laundry-backend.herokuapp.com/progress/get-extra-details?student_id=${studentId}`,{
                    method:'GET',
                    headers:{
                        'ADMIN-ACCESS-CODE':'b28bd806-158e-485b-a905-f1edae57c153'
                    }
                })
                const res = await response.json()
                setDates(res.data.map(date=>{
                    return new Date(date.datetime)
                }));
                if(!dates[2]&&dates[1]){
                    var date = new Date(dates[1].getTime())
                    date.setMinutes(date.getMinutes()+35)
                    setEsimatedTime(date)
                    timer = setInterval(function() {
                        timeBetweenDates(estimatedTime);
                    }, 1000);
                }
            }   
        }

        function timeBetweenDates(toDate) {
            var dateEntered = toDate;
            var now = new Date();
            var difference = dateEntered.getTime() - now.getTime();
          
            if (difference < 0) {
          
              // Timer done
              clearInterval(timer);
            
            } else {
              
              var seconds = Math.floor(difference / 1000);
              var minutes = Math.floor(seconds / 60);
              var hours = Math.floor(minutes / 60);
              var days = Math.floor(hours / 24);
          
              hours %= 24;
              minutes %= 60;
              seconds %= 60;
              setCountDown(`${minutes}:${seconds}`)
            }
          }
    
        getData()
    },[studentId,dates])
    
   
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
                    <h5>Accepted<br/><div className='date'>{dates[0]&&`${dates[0].getDate()}/${dates[0].getMonth()+1}/${dates[0].getFullYear()} at ${dates[0].getHours()}:${dates[0].getMinutes()}`}</div></h5>
                </li>
                <li style={{color:progressCode>=2?'#00B389':'rgb(172,172,172)'}}>
                    <span style={{
                        border:progressCode>=2?'2px solid #00B389':'2px solid rgb(172,172,172)',
                        backgroundColor:progressCode>=2?'#00B389':'transparent',
                        color:progressCode>=2?'#fff':'rgb(172,172,172)'
                        }}>2</span>
                    <h5>Washing<br/><div className='date'>{dates[1]&&`${dates[1].getDate()}/${dates[1].getMonth()+1}/${dates[1].getFullYear()} at ${dates[1].getHours()}:${dates[1].getMinutes()}`}</div></h5>
                </li>
                <li style={{color:progressCode>=3?'#00B389':'rgb(172,172,172)'}}>
                    <span style={{
                        border:progressCode>=3?'2px solid #00B389':'2px solid rgb(172,172,172)',
                        backgroundColor:progressCode>=3?'#00B389':'transparent',
                        color:progressCode>=3?'#fff':'rgb(172,172,172)'
                        }}>3</span>
                    <h5>Washed<br/><div className='date'>{dates[2]?`${dates[2].getDate()}/${dates[2].getMonth()+1}/${dates[2].getFullYear()}`:`Estimated time : ${estimatedTime.getFullYear()}/${estimatedTime.getMonth()+1}/${estimatedTime.getDate()} at ${estimatedTime.getHours()}:${estimatedTime.getMinutes()}`}</div></h5>
                </li>
                <li><h5 style={{ 
                    width:'100%',
                    textAlign:'center',
                    color:'rgb(102,102,102)'
                    }}>Time Remaining : {countDown}</h5></li>
            </ul>
        </div>
    </div>
}

export default Student