"use client"

import { Amplify } from "aws-amplify"
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react"
import { LoginForm } from "./login-form"
import outputs from "../../../amplify_outputs.json"

Amplify.configure(outputs)

interface AuthWrapperProps {
  children: React.ReactNode
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">JAC</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

function AuthContent({ children }: AuthWrapperProps) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus])

  if (authStatus === 'configuring') {
    return <LoadingScreen />
  }

  if (authStatus === 'authenticated') {
    return <>{children}</>
  }

  return <LoginForm />
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Authenticator.Provider>
      <AuthContent>{children}</AuthContent>
    </Authenticator.Provider>
  )
}
