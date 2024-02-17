"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./Back-button";
import { Social } from "./Social";


import { Header } from "./header";

interface CardWrapperProps {
    children: React.ReactNode;
    showSocial?: boolean;
}

const CardWrapper = ({
    children,

    showSocial,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] max-w[600px] shadow-md sm:px-4 py-5 my-3">

            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}

        </Card>
    );
};

export default CardWrapper;