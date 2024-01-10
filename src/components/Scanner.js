import { useState } from 'react'
import QrReader from 'react-qr-scanner'
import Beep from '../assets/Audio/scaned.mp3'
import PrimaryButton from './Buttons/PrimaryButton'

const Scanner = ({setScanned})=>{
    const beepSound = new Audio(Beep)
    const [scan,setScan] = useState(true)
    const handleScan = async (data)=>{
        if(data){
            beepSound.play()
            setScan(false)
            setScanned(true)
            setTimeout(()=>{
                setScan(true)
            },2000)
            const formData = new FormData()
            console.log(data.text);
            formData.append('student_id',String(JSON.parse(data.text).student_id))
            const response = await fetch('https://crescent-laundry-backend.herokuapp.com/progress/update/',{
                method:'POST',
                body:formData,
                headers:{
                    'ADMIN-ACCESS-CODE':'b28bd806-158e-485b-a905-f1edae57c153'
                }
            })
            const res = await response.json()
            setScanned(false)
        }
    }
    const handleError = (err)=>{
        console.error(err)
      }
    return <div style={{
        display:'flex',
        flexDirection:'column',
        alignItem:'center',
        justifyContent:'space-evenly',
        height:'80vh'
    }}>
        <div style={{
            height:240,
            width:320,
            backgroundColor:'rgb(182,182,182)',
            overflow:'hidden'
        }}>
            {scan?<QrReader
            delay={1000}
            style={{
                height: 240,
                width: 320,
            }}
            onError={handleError}
            onScan={handleScan}
            />:
             <div style={{
                height:240,
                width:320,
                backgroundColor:'#00B389',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <h3 style={{color:'#fff'}}>Scanned</h3>
            </div>
            }
        </div>
        <PrimaryButton onClick={()=>setScan(true)}>Next</PrimaryButton>
    </div>
}

export default Scanner