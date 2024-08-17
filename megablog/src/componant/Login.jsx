import React from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { Input, Logo, Button } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../store/authSlice'
import { useState } from 'react'


function Login() {

    const naviagte = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const login = async (data) => {
        setError("")
        console.log(data);

        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                naviagte("/")
            }
        } catch (error) {
            setError(error.massage)
        }
    }
    return (
        <div className=' flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center  '>
                    <span className=' inline-block w-full max-height[100px]  '>  <Logo width="100%" /> </span>
                </div>
                <h2 className='text-center  font-bold leading-tight text-2xl '> Sign In to your account  </h2>

                <p className=' mt-2 text-center text-base text-black/60 '> Don&apos;t have an account ?&nbsp;  <Link to="/SignUp" className=' font-medium  text-primary transition-all duration-200 hover:underline '  > SignUp</Link> </p>
                {error && <p className=' text-red-500  text-center '> {error} </p>}

                <form onSubmit={handleSubmit(login)} className='mt-8' >
                    <div className="space-y-5">
                        <Input label="email" placeholder="enter your email " type="email" {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",

                            }
                        })} />

                        <Input label="password" placeholder=" Please enter your password" type="password"  {...register("password", {
                            required: true
                        })} />

                        <Button type="submit" className='w-full' > Log In </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login