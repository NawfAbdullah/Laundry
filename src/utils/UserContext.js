import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

const UserContext = createContext({
    email:'',
    is_admin:'',
    sessionId:''
})


function UserProvider({children}) {
    const [cookie] = useCookies(['user'])
    const [user,setUser] = useState({
        email:cookie.user,
        is_admin:cookie.admin,
        sessionId:cookie.SessionId
    })
    const value = {user,setUser}
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserContext
export {UserProvider}