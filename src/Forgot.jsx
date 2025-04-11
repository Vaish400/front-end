import { useForm } from 'react-hook-form'
import './Forgot.css'


export default function Forgot(){

     const {register,handleSubmit,formState:{errors}} = useForm()
       
        const onSubmitForm=(data)=>{
            console.log(data)
    
        }
    
    return(
        <>
         <div className="forgot-conatainer">
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <h2>Forgot Password</h2>
                <div className="input1">
                    <label>Email</label>
                    <input type="email" {...register('emailAddress',{required:'Email Address is required',
                    pattern:{
                        value:/^\S+@\S+$/i,
                        message:'Invalid Email Address'
                    }})}/>
                  { errors.emailAddress &&<p>{errors.emailAddress.message}</p>}
                    
                </div>
                <button type='submit'>forgot password</button>
               
            </form>
        </div>
        
        </>
    )
}