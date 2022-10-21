import { useRef, useState } from "react"
import '../styles/NewStudent.css'
import PlaceHolder from '../assets/images/user.png'
import MyProfile from "./MyProfile"

const AddNewStudent = ()=>{
    const fileRef = useRef(null)
    const [file,setFile] = useState(null)
    const [studentCreated,setStudentCreated]= useState(false)
    const [disabled,setDisabled] = useState(false)
    const [formData,setFormData] = useState({
        email:'',
        username:'',
        account_type:"0",
        contact_no:'',
        block:'',
        room:'',
        department:0,
        profile_pic:null,
        password:'123456789',
        student_id:''
    })
    const [studentDetails,setStudentDetails] = useState({})
    const [error,setError] = useState(null)

    const handleChange = (e)=>{
        setFormData(prevValue=>{
            return {
                ...prevValue,[e.target.name]:e.target.type==='file'?URL.createObjectURL(e.target.files[0]) : e.target.value
            }
        })
        if(e.target.type==='file'){
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setDisabled(true)
        if(file){
            formData.profile_pic = file
            console.log(file);
        }
        formData.password = `${formData.student_id}${formData.block}${formData.room}`
        console.log(formData.password);
        const fd = new FormData()
        Object.entries(formData).forEach((entry) => {
            const [key, value] = entry;
            fd.append(key,value)
        });
        const response = await fetch("https://crescent-laundry-backend.herokuapp.com/accounts/create-student/",{
            method:'POST',
            body:fd,
            mode:'cors',
            headers:{
                'ADMIN-ACCESS-CODE':'b28bd806-158e-485b-a905-f1edae57c153'
            }
        })

        try{
        if(response.ok){
            const res = await response.json()
            console.log(res); 
             if(res==='Success'){ 
                setStudentCreated(true);
            }
            setDisabled(false) 
        }else{
            const res = await response.json()
            setError(res[1]);
            setDisabled(false)
        }  
        }catch(err){
            console.log(err);
        }
    }

    return <div className="add-new-student">
        <h1>Add a new student</h1>
        <form onSubmit={handleSubmit}>
           {studentCreated?<>
                <MyProfile isAdmin={true} studentId={formData.email}/>
                <h2>Student Created</h2>
           </> :<>
            <div className="img-container">
                <div className="img-holder" onClick={()=>fileRef.current.click()}>
                   {formData.profile_pic?<img src={formData.profile_pic} alt=""/>:<img src={PlaceHolder}  alt=""/>}
                </div>
                <input ref={fileRef} hidden={true} name="profile_pic" type="file" onChange={handleChange}/>
            </div>
            {error&&<p className="error">{error}</p>}
            <div>
                <div>
                    <input type='email' name='email' placeholder="email" value={formData.email} onChange={handleChange}/>
                    <input type='text' name='username' placeholder="name" value={formData.username} onChange={handleChange}/>
                    <input type='text' name='contact_no' placeholder="phone" value={formData.contact_no} onChange={handleChange}/>    
                </div>
                <div>
                    <input type='text' name='block' placeholder="block" value={formData.block} onChange={handleChange}/>
                    <input type='text' name='room' placeholder="room" value={formData.room} onChange={handleChange}/>
                    <div>
                    <label htmlFor="department">Department</label>
                    <select id="department" name="department" onChange={handleChange}>
                        <option value="0">None</option>
                        <option value="1">B. Tech.</option>
                        <option value="2">B. Arch.</option>
                        <option value="3">B. Des.</option>
                        <option value="4">B. Pharm.</option> 
                        <option value="5">BBA LLB.</option>
                        <option value="6">BA LLB.</option>
                        <option value="7">BSc</option> 
                        <option value="8">BCA</option>
                        <option value="9">B. Com.</option>
                        <option value="10">BBA</option>
                        <option value="11">BA</option>
                        <option value="12">M. Tech.</option>
                        <option value="13">M. Arch.</option>
                        <option value="14">MBA</option>
                        <option value="15">MCA</option>
                        <option value="16">M. Pham.</option>
                        <option value="17">LLM</option>
                        <option value="18">MSc</option>
                        <option value="19">M. Com.</option>
                        <option value="20">MA</option>
                        <option value="21">Ph. D</option>
                    </select>
                    </div>
                </div>
                <input type='text' name='student_id' placeholder="Application Number" value={formData.student_id} onChange={handleChange}/>
            </div>
        <button disabled={disabled} type="submit">{!disabled?"Submit":"Submitting"}</button>
        </>}
    </form>
    </div>
}

export default AddNewStudent