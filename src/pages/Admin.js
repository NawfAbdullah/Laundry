import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import PendingItem from "../components/ListItem"
import Scanner from "../components/Scanner"
import '../styles/Admin.css'

const Admin = ()=>{
    const [students,setStudents] = useState(['Nawf Abdullah','Ali Z Shazin','Afzal Rahman','Cypmus','Chettan','Thoufik'])
    const [scanned,setScanned] = useState(false)
    useEffect(()=>{
        //send request to get the who washed 
        setStudents(['Nawf Abdullah','Ali Z Shazin','Afzal Rahman','Cypmus','Chettan','Thoufik'])
    },[scanned])
    
    return <div className="Admin">
        <AdminNav />
        <div className="middleContainer">
            <div className="pendingList">
                {students.map((name,index)=>{
                   return <PendingItem key={index} progress='washing' block={'PG'} room={'T03'} date={'27/11/2003'}>{name}</PendingItem>
                })}
            </div>
            <Scanner setScanned={setScanned} />
        </div>
    </div>
}
export default Admin