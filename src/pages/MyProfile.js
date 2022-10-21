import { useState,useEffect } from "react"
import { useCookies } from "react-cookie"
import BackgroundAnimated from "../components/BackgroundAnimated"
import '../styles/MyProfile.css'
import UserContext from "../utils/UserContext"

const MyProfile = ({isAdmin,studentId})=>{
    const [data,setData] = useState({})
    const [cookie] = useCookies(['user'])
    const [qrImage,setQRImage] = useState('')
    useEffect(()=>{
        const getData = async() =>{
            if(!isAdmin){
                const response = await fetch("https://crescent-laundry-backend.herokuapp.com/get-data/user-data?username&email&student_id&contact_no&block&room&department&profile_pic",{
                method:'POST',
                headers:{
                    'SESSIONID':cookie.SessionId
                }
                })
                const res = await response.json()
                setData(res)
                const qrResponse = await fetch("https://crescent-laundry-backend.herokuapp.com/accounts/get-laundry-qrcode/",{
                    headers:{
                        'SESSIONID':cookie.SessionId
                    }
                })
                const qrCode = await qrResponse.json()
                setQRImage(qrCode.base64_string)
                console.log(res);
            }else{
                const response = await fetch(`https://crescent-laundry-backend.herokuapp.com/get-data/user-data/admin/${studentId}?username&email&student_id&contact_no&block&room&department&profile_pic&`,{
                    method:'GET',
                    headers:{
                        'ADMIN-ACCESS-CODE':'b28bd806-158e-485b-a905-f1edae57c153'
                    }    
                })
                const res = await response.json()
                const qrResponse = await fetch("https://crescent-laundry-backend.herokuapp.com/accounts/get-laundry-qrcode/",{
                    headers:{
                        'ADMIN-ACCESS-CODE':'b28bd806-158e-485b-a905-f1edae57c153'
                    }
                })
                const qrCode = await qrResponse.json()
                setQRImage(qrCode.base64_string)
                
                setData(res)
            }
        }
        getData()
    },[])
    return <div className="profile-outer">
       <BackgroundAnimated>
       </BackgroundAnimated>
       <div className="profile">
            <h1>My Profile</h1>
            <img className="profile-img" src={data.profile_pic?data.profile_pic:'https://crescent-laundry.s3.ap-south-1.amazonaws.com/default.jpg'} alt=''/>
            <div className="middleContainer">
                <div>
                    <p className="detail">Name : <span>{data.username&&data.username}</span></p>
                    <p className="detail">Department : <span>{data.department&&data.department}</span></p>
                    <p className="detail">Block : <span>{data.block&&data.block}</span></p>
                    <p className="detail">RoomNo : <span>{data.room&&data.room}</span></p>
                    <p className="showqr">Show QR code </p>
                    {qrImage&&<img className="code" src={`data:image/png;base64,${qrImage}`}/>}
                </div>
            </div>
       </div>
    </div>
}


export default MyProfile
