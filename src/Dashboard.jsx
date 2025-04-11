import { useNavigate } from 'react-router-dom'
import './style.css'
import Cookies from 'js-cookie'
import { startTransition, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Loader from './Loader'
import { useForm } from 'react-hook-form'

export default function Dashboard() {
    const naviget = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    const [updateObj, setUpdateObj] = useState({})
    const [action, setAction] = useState(true)

    const getUpadateInfo = (currentObj) => {
        setAction(false)
        setUpdateObj(currentObj)
        setValue('productName', currentObj.productName)
        setValue('productPrice', currentObj.productPrice)
        setValue('productUnit', currentObj.productUnit)
        setValue('productDescription', currentObj.productDescription)
    }

    const onLogoutClick = () => {
        Cookies.remove('app-user')
        naviget('/')
    }

    const onFormSubmit = (data) => {
        if (action) {
            setLoading(true)
            setTimeout(async () => {
                const res = await axios.post(`https://react-backend-self.vercel.app/Product/add`, data)
                const resData = res.data
                setLoading(false)
                if (resData.status) {
                    toast.success('product addede successfully')
                    setValue("productName", '')
                    setValue("productPrice", '')
                    setValue("productUnit", '')
                    setValue("productDescription", '')
                    getProduct()
                    setAction(true)

                } else {
                    toast.error(resData.message)
                }
            }, 1000)
        }  
        else{
            setLoading(true)
            setTimeout(async () => {
                const res = await axios.put(`https://react-backend-self.vercel.app/Product/update/${updateObj._id}`, data)
                const resData = res.data
                setLoading(false)
                if (resData.status) {
                    toast.success('product addede successfully')
                    setValue("productName", '')
                    setValue("productPrice", '')
                    setValue("productUnit", '')
                    setValue("productDescription", '')
                    getProduct()
                    setAction(true)

                } else {
                    toast.error(resData.message)
                }
            }, 1000)  
        } 
    }



    const getProduct = async () => {
        const res = await axios.get(`https://react-backend-self.vercel.app/Product/get`)
        const resData = res.data

        if (resData.status) {
            setProduct(resData.message)
        }
    }

    const deleteProduct=async(id)=>{
        const res=await axios.delete(`https://react-backend-self.vercel.app/Product/delete/${id}`)
        const resData=res.data
        if(resData.status){
            toast.status(resData.message)
            getProduct()
        }
    }
    useEffect(() => {
        if (!Cookies.get('app-user')) {
            naviget('/')
        }
        getProduct()
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
            <div className="header">
                <h2>Welcome FullName</h2>

                <button onClick={onLogoutClick}>LogOut</button>
            </div>


            <div className="container">
                <div className="add-product">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="title">
                            <h2>{action ? 'Add Product' : 'Update Product'}</h2>
                        </div>
                        <div className="input-field">
                            <label >ProductName</label>
                            <input type="text" {...register('productName', { required: 'Product Name is required' })} />
                            {errors.productName && <p>{errors.productName.message}</p>}
                        </div>
                        <div className="input-field">
                            <label >ProductPrice</label>
                            <input type="number" {...register('productPrice', { required: 'productPrice is required' })} />
                            {errors.productPrice && <p>{errors.productPrice.message}</p>}

                        </div>
                        <div className="input-field">
                            <label >ProductUnit</label>
                            <select {...register('productUnit', { required: 'productUnit is required' })}>
                                <option value="selected">select</option>
                                <option value="KG">KG</option>
                                <option value="Liter">Liter</option>
                                <option value="Dozzens">Dozzens</option>
                                <option value="Tone">Tone</option>
                            </select>

                            {errors.productUnit && <p>{errors.productUnit.message}</p>}
                        </div>
                        <div className="input-field">
                            <label >Product Description</label>
                            <input type="text" {...register('productDescription', { required: 'productDescription is required' })} />
                            {errors.productDescription && <p>{errors.productDescription.message}</p>}

                        </div>

                        <button type='submit'>{action ? 'Add Product' : 'Update Product'}</button>
                    </form>



                </div>
                <div className="view-product">
                    <table>
                        <thead>
                            <tr>
                                <th>ProductName</th>
                                <th>ProductPrice</th>
                                <th>ProductUnit</th>
                                <th>ProductDescription</th>
                                <th> </th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.length === 0 ? (
                                    <tr>
                                        <td colSpan="6">No product avaliable</td>
                                    </tr>
                                ) : (
                                    product.map((ele, index) => {
                                        return (
                                            <tr>
                                                <td>{ele.productName}</td>
                                                <td>{Number(ele.productPrice).toFixed(2)}</td>
                                                <td>{ele.productUnit}</td>

                                                <td>{ele.productDescription}</td>
                                                <td><i title='Update product' onClick={()=>getUpadateInfo(ele)} className="fa-solid fa-user-pen"></i></td>
                                                <td><i title='Delete product' onClick={()=>deleteProduct(ele._id)} className="fa-solid fa-trash"></i></td>
                                            </tr>
                                        )
                                    })
                                )
                            }



                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}