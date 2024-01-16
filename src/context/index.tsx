import { ReactNode } from "react"
import { AuthProvider } from "./auth-context"
import React from "react"

export const AppProviders = ({children}: {children: ReactNode}) => {
    return <AuthProvider>
        {children} 
    </AuthProvider>
}