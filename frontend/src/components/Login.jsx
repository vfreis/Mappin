import { Room, Cancel } from '@material-ui/icons'
import { useState, useRef } from 'react';
import axios from 'axios'
import './login.css'

export default function Login({setShowLogin}) {
    const [error, setError] = useState(false)
    const usernameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit =  async (e) => {
        e.preventDefault()
        const user = {
            username: usernameRef.current.value,

            password: passwordRef.current.value
        }

        try{
            await axios.post('/users/login', user)
            setError(false)
        }catch(err) {
            setError(true)
        }
    }

    return (
        <div className="loginContainer">
            <div className="logo">
                <Room/>
                Mappin
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={usernameRef}/>
                <input type="password" placeholder="password" ref={passwordRef} />
                <button className="loginButton">Login</button>
                {error &&    
                    <span className="failure">Something went wrong. </span>
                }
                
            </form>
            <Cancel className="loginCancel" onClick={() => setShowLogin(false)}
            />
        </div>
    )
}

