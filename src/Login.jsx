import { useForm } from 'react-hook-form'
import './Login.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie'

export default function Login() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [isLoading, setLoading] = useState(false)
    const Navigate=useNavigate()

    const onSubmitForm = (data) => {
        setLoading(true)
        setTimeout(async () => {
            const res = await axios.post('https://react-backend-self.vercel.app/login', data)
            const resData = res.data
            setLoading(false)
            if (resData.status) {
                toast.success(resData.message)
                Cookies.set('app-user',data.userName,{expires:7})
                setTimeout(() => {
                    Navigate('/dashboard')
                    
                }, 3500);

            }
            else {
                if ((resData.message) === 'User not found') {
                    setValue('userName', ''),
                    setValue('password', '')
                }
                else if (resData.message === 'Password incorrect') {
                    setValue('password', '')
                }
            }
            
    toast.error(resData.message)

}, 1000);

    }

    useEffect(()=>{
        if(Cookies.get('app-user')){
            Navigate('/dashboard')
        }
    })
return (
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
        {isLoading && <Loader />}
        <div className="login-conatainer">
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <h2>Login</h2>
                <div className="input">
                    <label>Username</label>
                    <input type="email" {...register('userName',
                        {
                            required: 'Username is required', pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid Username'
                            }
                        }
                    )} />
                    {errors.userName && <p>{errors.userName.message}</p>}
                </div>
                <div className="input">
                    <label>Password</label>
                    <input type="password" {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be greater than 6 characters'
                        }
                    })} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <NavLink to={'/forgot-password'} className='end' >Forgot Password?</NavLink>
                <button type='submit'>Login</button>
                <Link to={'/register'} className="center">Register here</Link>
            </form>
        </div>

    </>
)
}