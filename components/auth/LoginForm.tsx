"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import CardWrapper from "./Login-Wrapper";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const LoginForm = () => {
    const session = useSession();
    const [isLoading, setisLoading] = useState(false);
    const [variant, setVariant] = useState<Variant>("LOGIN");

    const router = useRouter()


    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users');
        }

    }, [router, session?.status])


    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);

        if (variant === "REGISTER") {
            axios
                .post("api/register", data)
                .then(() => { signIn('credentials', data) })
                .catch(() => toast.error("something went wrong"))
                .finally(() => setisLoading(false));
        }

        if (variant === "LOGIN") {
            // login with data

            signIn("credentials", {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error("Invalid Credentials");
                    }
                    if (callback?.ok) {
                        toast.success("Logged In");
                        router.push('/users');
                    }
                })
                .finally(() => setisLoading(false));
        }
    };
    // const socialAction = (action: string) => {
    //     setisLoading(true)
    // }

    return (
        <CardWrapper toggleVariant={toggleVariant} showSocial>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {variant === "REGISTER" && (
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        id="name"
                        label="Name"
                    />
                )}
                <Input
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    id="email"
                    label="Email address"
                    type="email"
                />
                <Input
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    id="password"
                    label="Password"
                    type="password"
                />
                <div>
                    <Button disabled={isLoading} fullWidth type="submit">
                        {variant === "LOGIN" ? "Sign in" : "Register"}
                    </Button>
                </div>
            </form>
            <div className="mt-6">
                <div className="relative">
                    <div
                        className="
                absolute 
                inset-0 
                flex 
                items-center
              ">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
};

export default LoginForm;
