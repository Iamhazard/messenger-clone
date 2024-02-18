"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import { Social } from "./Social";


interface CardWrapperProps {
    children: React.ReactNode;
    showSocial?: boolean;

    toggleVariant: () => void;

}
type Variant = 'LOGIN' | 'REGISTER';

const CardWrapper = ({
    children,
    toggleVariant,
    showSocial,
}: CardWrapperProps) => {
    const [variant, setVariant] = useState<Variant>('LOGIN');

    const handleToggleVariant = () => {

        setVariant(prevVariant => prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN');

        toggleVariant();
    };


    return (
        <Card className="w-[400px] max-w[600px] shadow-md sm:px-4 py-5 my-3">

            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>

            )}

            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                <div>{variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}</div>
                <div onClick={handleToggleVariant} className="underline cursor-pointer">
                    {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                </div>
            </div>

        </Card>
    );
};

export default CardWrapper;