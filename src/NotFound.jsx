import { useNavigate } from 'react-router-dom'
import './NotFound.css'


export default function NotFound(){
    const navigate=useNavigate()

    const onButtonClick=()=>{
        navigate('/')
    }

    return(
        <>
        <div className="notfound-container">
            <div className="box">
                <h2>404 Page Not Found.</h2>
                <p>Click here to Login.</p>
                <button onClick={onButtonClick}>Login</button>
            </div>
        </div>
        </>
    )
}