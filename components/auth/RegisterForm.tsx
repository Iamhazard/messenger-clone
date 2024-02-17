'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from '@/Schemas';

import CardWrapper from './Login-Wrapper';
import { Input } from '../ui/input';

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';


const RegisterForm = () => {

    const [isLoading, setisLoading] = useState(false)

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
    })

    const handlesubmit = (values: z.infer<typeof RegisterSchema>) => {
        setisLoading(true)

    }

    const socialAction = (action: string) => {
        setisLoading(true)
    }

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an a account?"
            blackButtonHref="/auth/login"
        >
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(handlesubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder=""
                                        {...field}

                                    />
                                </FormControl>

                            </FormItem>
                        )}></FormField>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder=""
                                        {...field}

                                    />
                                </FormControl>

                            </FormItem>
                        )}></FormField>

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder=""
                                        {...field}

                                    />
                                </FormControl>

                            </FormItem>
                        )}></FormField>


                </form>
            </Form>
        </CardWrapper>

    )
}

export default RegisterForm  