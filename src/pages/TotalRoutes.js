import {Routes,Route} from 'react-router-dom'
import Auth from './Auth'
import Admin from './Admin'
import AddNewStudent from './NewStudent'
import { useContext } from 'react'
import UserContext from '../utils/UserContext'
import Student from './Students'
import { useCookies } from 'react-cookie'
import ForgotPassword from './ForgotPassword'
import ChangePassword from './ChangePassword'
import MyProfile from './MyProfile'

const AnimatedRoutes = ()=>{
    const [cookie] = useCookies(['user'])
    return(
        <Routes>
            <Route path='/' element={<Auth/>}/>
            <Route path='/forgot-password/:email' element={<ForgotPassword />}/>
            {cookie.SessionId&& <><Route path='/home' element={cookie.admin==='true'?<Admin />:<Student />} />
            <Route path='/create-new-student' element={<AddNewStudent/>}/>
            <Route path='/changePassword' element={<ChangePassword />}/>
            <Route path='/myprofile' element={<MyProfile />} />
            <Route path='/student-profile' element={<MyProfile isAdmin={true}/>} />
            </>}
        </Routes>
    )
}

export default AnimatedRoutes