import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from './index'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'





function Signup() {

    const naviagte = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        console.log(data);

        try {

            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                naviagte("/")
            }
        } catch (error) {
            setError(error.massage)
        }
    }
    return (
        <>
            <div className=' flex items-center justify-center w-full'>
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <div className='mb-2 flex justify-center  '>
                        <span className=' inline-block w-full max-height[100px]  '>  <Logo width="100%" /> </span>
                    </div>
                    <h2 className='text-center  font-bold leading-tight text-2xl '> Sign up to  create an account  </h2>

                    <p className=' mt-2 text-center text-base text-black/60 '> Already have  an account ?&nbsp;  <Link to="/Login" className=' font-medium  text-primary transition-all duration-200 hover:underline '  > Sign In</Link> </p>
                    {error && <p className=' text-red-500  text-center '>{error} </p>}

                    <form onSubmit={handleSubmit(create)} className='mt-8' >
                        <div className="space-y-5">
                            <Input label="Name :" placeholder="Enter your name  " type="text" {...register("name", {
                                required: true,

                            })} />

                            <Input label="email" placeholder="enter your email here " type="email" {...register("email", {
                                required: true, validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",

                                }
                            })} />

                            <Input label="password" placeholder=" Please enter your password" type="password"  {...register("password", {
                                required: true
                            })} />

                            <Button type="submit" className='w-full' >  Create Account  </Button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Signup