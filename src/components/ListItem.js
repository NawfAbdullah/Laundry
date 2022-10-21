import '../styles/PendingItem.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useEffect, useState } from 'react';

const PendingItem = ({children,block,room,progress,progressCode,studentId,dates})=>{
    const [date,setDate] = useState(new Date(dates.at(-1).datetime))
    const [theProgress,setTheProgress] = useState(progress)
    const progresses = ['None','Accepted','Washing','Washed']
    useEffect(()=>{
        setTheProgress(progresses[progressCode])
    },[progresses,progressCode])
    const handleClick = async (operation) =>{
        const fd = new FormData()
        fd.append('student_id',studentId)
        if(operation==='increment'){
            console.log(studentId);
            progressCode++
            
        }else{
           progressCode--
        }
        const response = await fetch(`https://crescent-laundry-backend.herokuapp.com/progress/update/${progressCode}/`,{
                method:'POST',
                headers:{
                    'ADMIN-ACCESS-CODE':'b28bd806-158e-485b-a905-f1edae57c153'
                },
                body:fd
            })
            const res = await response.json()
            console.log(res);
    }
    return <div className='pendingItem'>
        <div className='student-block'>
            <h3>{children}</h3>
            <p>{block}-{room}</p>
            <ArrowDropUpIcon
            onClick = {()=>{
                handleClick('increment')
            }}
            style={{
                cursor:'pointer',
                color:'#18305E'
            }}/>
        </div>
        <div className='progress-date'>
            <p className='progress'>Progress: {theProgress}</p>
            <p className='date'>Date Added: {`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`}</p>
            <ArrowDropDownIcon style={{
                cursor:'pointer',
                color:'#18305E'
            }}
            onClick = {()=>{
                handleClick('increment')
            }}
            />
        </div>
    </div>
}

export default PendingItem