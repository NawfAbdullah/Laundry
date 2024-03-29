import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import PendingItem from "../components/ListItem"
import Scanner from "../components/Scanner"
import '../styles/Admin.css'

const Admin = ()=>{
    const [students,setStudents] = useState([])
    const [scanned,setScanned] = useState(false)
    const progresses = ['None','Accepted','Washing','Washed']

    const getData = async ()=>{
        const response1 = await fetch('https://crescent-laundry-backend.herokuapp.com/progress/get-all/extra/1?username&washing_progress&room&block&department&student_id',{
            method:'GET',
            headers:{
                'ADMIN-ACCESS-CODE':'b28bd806-158e-485b-a905-f1edae57c153'
            }
        })
        const res1 = await response1.json()
        const response2 = await fetch('https://crescent-laundry-backend.herokuapp.com/progress/get-all/extra/2?username&washing_progress&room&block&department&student_id',{
            method:'GET',
            headers:{
                'ADMIN-ACCESS-CODE':'b28bd806-158e-485b-a905-f1edae57c153'
            }
        })
        const res2 = await response2.json()
        setStudents([...res1.data,...res2.data])
        setStudents(preValue =>{
            return preValue.sort((a,b)=>{
                return new Date(b.extra.at(-1).datetime)-new Date(a.extra.at(-1).datetime)
            })
        })
    }

    useEffect(()=>{
        getData()
    },[scanned])
    
    return <div className="Admin">
        <AdminNav />
        <div className="middleContainer">
            <div className="pendingList">
                <div>
                    {/* <PrimaryButton onClick={async ()=>{
                        const response1 = await fetch('https://crescent-laundry-backend.herokuapp.com/progress/get-all/extra/1?username&washing_progress&room&block&department&student_id',{
                            method:'GET',
                            headers:{
                                'ADMIN-ACCESS-CODE':'b28bd806-158e-485b-a905-f1edae57c153'
                            }
                        })
                        const res1 = await response1.json()
                        setStudents(res1.data)
                    }}>Accepted</PrimaryButton> 
                    <PrimaryButton onClick={async ()=>{
                        const response2 = await fetch('https://crescent-laundry-backend.herokuapp.com/progress/get-all/extra/2?username&washing_progress&room&block&department&student_id',{
                            method:'GET',
                            headers:{
                                'ADMIN-ACCESS-CODE':'b28bd806-158e-485b-a905-f1edae57c153'
                            }
                        })
                        const res2 = await response2.json()
                        setStudents(res2.data)
                    }}>Washing</PrimaryButton> */}
                </div>
                <PendingItem progress={'Accepted'} progressCode={1} studentId={'1234'} block={'Laundry'} room={1} dates={'27-11-2003'}>Laundry Admin</PendingItem>
                {students&&students.map((student,index)=>{
                   return <PendingItem key={index} progressCode={student.washing_progress} progress={progresses[Number(student.washing_progress)]} block={student.block} room={student.room} date={'27/11/2003'} studentId={student.student_id} dates={student.extra}>{student.username}</PendingItem>
                })}
            </div>
            <Scanner setScanned={setScanned} />
        </div>
    </div>
}
export default Admin