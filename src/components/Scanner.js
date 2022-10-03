import { useState } from 'react'
import QrReader from 'react-qr-scanner'
import Beep from '../assets/Audio/scaned.mp3'
import PrimaryButton from './Buttons/PrimaryButton'

const Scanner = ({setScanned})=>{
    const beepSound = new Audio(Beep)
    const [scan,setScan] = useState(true)
    const handleScan = (data)=>{
        if(data){
            beepSound.play()
            setScan(false)
            setScanned(true)
            //set scan to false after sending data.text to backend
            console.log(data); 
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