import '../styles/Auth.css'

const Auth = ()=>{
    return <div className='AuthPage' >
        <div className='innerDiv'>
            <h1>Login</h1>
            <form className='loginform'>
                <input name='email' type='text' />
                <input name='password' type='password' />
                <input type='submit' />
            </form>
        </div>
    </div>
}

export default Auth