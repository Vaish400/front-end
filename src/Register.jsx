import { useForm } from 'react-hook-form'
import './Register.css'
import { useState } from 'react'
import Loader from './Loader'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'


export default function Register(){

    const {register,handleSubmit,formState:{errors},watch} = useForm()
    const password=watch('password')
    const[isLoading,setLoading]=useState(false)

    const onSubmitForm=(data)=>{
        setLoading(true)
        setTimeout(async() => {
            const res=await axios.post('https://react-backend-self.vercel.app/register',data)
            const resData=res.data
            setLoading(false)
            if(resData.status){
                toast.success('Register Successfully')
            }
            else{
                toast.error(resData.message)
            }
            
        }, 1000);
    }

    return(
        <>
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                removeDelay: 1000,
                style: {
                background: '#363636',
                color: '#fff',
                },

                // Default options for specific types
                success: {
                duration: 3000,
                iconTheme: {
                    primary: 'green',
                    secondary: 'black',
                },
                },
            }}
        />
        {isLoading && <Loader/>}

        <div className="register-container">
            <form onSubmit={handleSubmit(onSubmitForm)} >
                <h2>Register</h2>
                <div className="input-field">
                    <label>Fullname</label>
                    <input type="text" {...register('fullName',{required:'Fullname is required'})} />
                    {errors.fullName &&<p>{errors.fullName.message}</p>}
                </div>
                <div className="input-field">
                    <label>Email Address</label>
                    <input type="email" {...register('userName',{required:'UserName is required',
                    pattern:{
                        value:/^\S+@\S+$/i,
                        message:'Invalid Username'
                    }})}/>
                  { errors.userName &&<p>{errors.userNAme.message}</p>}
                </div>
                <div className="input-field">
                    <label>Age</label>
                    <input type="number" {...register('age',{required:'Age is requied',
                    min:{
                        value:18,
                        message:'age must be greater than 18'
                    }})}/>
                 { errors.age && <p>{errors.age.message}</p>}
                </div>
                <div className="input-field">
                    <label>Password</label>
                    <input type="password" {...register('password',
                        {required:'Password is required',
                            minLength:{
                                value:6,
                                message:'Password must be greater than 6 characters'
                            }
                        }
                    )} />
                    {errors.password &&<p>{errors.password.message}</p>}
                </div>
                <div className="input-field">
                    <label >Confirm Password</label>
                    <input type="password" {...register('cnf',{validate:(value)=>
                        value===password || "Password doesn't match"
                    })} />
                  { errors.cnf && <p>{errors.cnf.message}</p>}
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
        
        </>
    )
}