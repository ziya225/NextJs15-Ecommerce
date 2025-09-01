'use client'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Logo from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import z from 'zod'
import { ButtonLoading } from '@/components/Application/ButtonLoading'
import zSchema from '@/lib/zodSchema'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from 'next/link'
import { WEB_ROUTES } from '@/routes/WebRoutes'

const LoginPage = () => {

    const [loading, setLoading] = useState(false);
    const [isTypePassword, setIsTypePassword] = useState(true);
    const formSchema = zSchema.pick({
        email: true,
    }).extend({
        password: z.string().min(8, "Password must be at least 8 characters long")
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleLoginSubmit = async (value) => {
        console.log(value);
    }

    return (
        <div>
            <Card className='w-[400px]'>
                <CardContent>
                    <div className=''>
                        <Image src={Logo.src} width={Logo.width} height={Logo.height} alt='logo' className='w-36 mx-auto mb-4' />
                    </div>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold mb-2'>Login Into Account</h1>
                        <p className='text-sm text-gray-600'>Login into your account by filling out the form below</p>
                    </div>
                    <div className='mt-6'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-8">
                                <div className='mb-3'>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Enter your email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className='relative'>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type={isTypePassword ? 'password' : 'text'} placeholder="Enter Password" {...field} />
                                                </FormControl>
                                                <button type='button' onClick={() => setIsTypePassword(!isTypePassword)} className='absolute top-1/2 right-3 text-gray-400 cursor-pointer'>
                                                    {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                                </button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <ButtonLoading
                                        type="submit"
                                        text="Login"
                                        className='w-full cursor-pointer'
                                        loading={loading}
                                    />
                                </div>
                                <div className='text-center'>
                                    <div className='flex justify-center gap-2 mt-4'>
                                        <p className='text-sm'>Don't have an account?</p>
                                        <Link href={WEB_ROUTES.REGISTER} className='text-sm text-blue-600 underline'>Register Here</Link>
                                    </div>
                                    <div className='flex justify-center gap-2 mt-2'>
                                        <Link href={WEB_ROUTES.CHANGEPASSWORD} className='text-sm text-blue-600 '>Forgot Password?</Link>
                                    </div>


                                </div>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage
