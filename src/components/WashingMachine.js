import { useState } from 'react'
import '../styles/WashingMachine.css'
import Clothes from '../assets/images/male-clothes.png'
import Bucket from '../assets/images/bucket.png'

const WashingMachine = ({progressCode})=>{    

    return( 
        <div className="washing-machine">
            <div className="top">
                <span style={{backgroundColor:'#18305E'}}></span>
                <span style={{backgroundColor:'#00B389'}}></span>
                <span style={{backgroundColor:'#F47174'}}></span>
            </div>
            {progressCode===3&&<div className='rim open-rim'>

            </div>}
            <div style={{borderColor:(progressCode===2||progressCode===1||progressCode===0)?'rgb(132, 132, 132)':'#a5e4f2',overflow:progressCode===3?'visible':'hidden'}} className="rim">
                <div style={{overflow:progressCode===3?'visible':'hidden',borderRadius:progressCode===3?30:0}} className="water">
                    {progressCode===2&&<><svg className='running' xmlns="http://www.w3.org/2000/svg" style={{zIndex:3}} viewBox="0 0 1440 320">
                        <path fill="#0099ff" fillOpacity="1" d="M0,256L24,250.7C48,245,96,235,144,234.7C192,235,240,245,288,229.3C336,213,384,171,432,170.7C480,171,528,213,576,240C624,267,672,277,720,272C768,267,816,245,864,208C912,171,960,117,1008,128C1056,139,1104,213,1152,234.7C1200,256,1248,224,1296,197.3C1344,171,1392,149,1416,138.7L1440,128L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
                    </svg>
                    <div className='extra-water'>
                        
                    </div></>}
                    {progressCode===3&&<img className='clothes' src={Clothes} alt='clothes'/>}
                </div>
            </div>
            {progressCode===1&&<img className='bucket' src={Bucket} alt='bucket'/>}
        </div>
    )
}

export default WashingMachine