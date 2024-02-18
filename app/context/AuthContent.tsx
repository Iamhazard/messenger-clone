"use client"

import { SessionProvider } from "next-auth/react"
import React from "react"

interface AuthContentProps {
    children: React.ReactNode;
}

export default function AuthContent({ children }: AuthContentProps) {
    return <SessionProvider>{children}</SessionProvider>
}