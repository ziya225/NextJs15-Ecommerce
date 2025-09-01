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

const RegisterPage = () => {

    const [loading, setLoading] = useState(false);
    const [isTypePassword, setIsTypePassword] = useState(true);
    const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(true);
    const formSchema = zSchema.pick({
        email: true,
        name: true,
        password: true,
    }).extend({
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
        },
    })

    const handleRegisterSubmit = async (value) => {
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
                        <h1 className='text-3xl font-bold mb-2'>Create New Account</h1>
                        <p className='text-sm text-gray-600'>Create new account by filling out the form below</p>
                    </div>
                    <div className='mt-6'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleRegisterSubmit)} className="space-y-8">
                                <div className='mb-3'>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Enter your name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                                <div className='mb-3'>
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem className='relative'>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input type={isTypeConfirmPassword ? 'password' : 'text'} placeholder="Confirm Password" {...field} />
                                                </FormControl>
                                                <button type='button' onClick={() => setIsTypeConfirmPassword(!isTypeConfirmPassword)} className='absolute top-1/2 right-3 text-gray-400 cursor-pointer'>
                                                    {isTypeConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                                </button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <ButtonLoading
                                        type="submit"
                                        text="Register"
                                        className='w-full cursor-pointer'
                                        loading={loading}
                                    />
                                </div>
                                <div className='text-center'>
                                    <div className='flex justify-center gap-2 mt-4'>
                                        <p className='text-sm'>Already have an account?</p>
                                        <Link href={WEB_ROUTES.LOGIN} className='text-sm text-blue-600 underline'>Login Here</Link>
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

export default RegisterPage
