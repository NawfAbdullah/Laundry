import { useState } from "react"

 const AddNewStudent = ()=>{
    const [file,setFile] = useState(null)
    const [formData,setFormData] = useState({
        email:'',
        username:'',
        account_type:0,
        contact_no:'',
        block:'',
        room:'',
        department:0,
        profile_pic:null,
        password:'1234'
    })

    const handleChange = (e)=>{
        console.log(e.target.name,e.target.value);
        setFormData(prevValue=>{
            return {
                ...prevValue,[e.target.name]:e.target.type==='file'?URL.createObjectURL(e.target.files[0]) : e.target.value
            }
        })
        if(e.target.type==='file'){
            setFile(e.target.files[0])
        }
    }

    const  getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };

    const handleSubmit = async (e)=>{
        e.preventDefault()
        formData.profile_pic = await getBase64(file)
        formData.password = `${formData.username}${formData.block}`
        console.table(formData)
        //sendformData to backend
    }
    const departments = []

    return <div className="add-new-student">
        <form onSubmit={handleSubmit}>
            <div>
                <div className="img-holder">
                   {formData.profile_pic&&<img src={formData.profile_pic} alt=""/>}
                </div>
                <input name="profile_pic" type="file" onChange={handleChange}/>
            </div>
            <div>
                <div>
                    <input type='email' name='email' value={formData.email} onChange={handleChange}/>
                    <input type='text' name='username' value={formData.username} onChange={handleChange}/>
                    <input type='text' name='contact_no' value={formData.contact_no} onChange={handleChange}/>    
                </div>
                <div>
                    <input type='text' name='block' value={formData.block} onChange={handleChange}/>
                    <input type='text' name='room' value={formData.room} onChange={handleChange}/>
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
        <input type='text' name='room' value={formData.room} onChange={handleChange}/>
        <button type="submit">Submit</button>
    </form>
    </div>
}

export default AddNewStudent