"use client"

import { Amplify } from "aws-amplify"
import { Authenticator, useAuthenticator, View, Image, Text, Heading } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css'
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

const components = {
  Header() {
    return (
      <View textAlign="center" padding="large">
        <Heading level={1} fontSize="2xl" fontWeight="bold" color="var(--amplify-colors-font-primary)">
          JAC
        </Heading>
        <Text color="var(--amplify-colors-font-secondary)" fontSize="small">
          Sign in to your account to continue
        </Text>
      </View>
    )
  },
  
  SignIn: {
    Header() {
      return null
    }
  },

  ForceNewPassword: {
    Header() {
      return (
        <Heading level={2} fontSize="xl" fontWeight="semibold" textAlign="center" marginBottom="medium">
          Change Password
        </Heading>
      )
    }
  },

  ForgotPassword: {
    Header() {
      return (
        <Heading level={2} fontSize="xl" fontWeight="semibold" textAlign="center" marginBottom="medium">
          Reset Password
        </Heading>
      )
    }
  }
}

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
      label: 'Email'
    },
    password: {
      placeholder: 'Enter your password',
      label: 'Password'
    }
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter new password',
      label: 'New Password'
    }
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email',
      label: 'Email'
    }
  }
}

function AuthContent({ children }: AuthWrapperProps) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus])

  if (authStatus === 'configuring') {
    return <LoadingScreen />
  }

  if (authStatus === 'authenticated') {
    return <>{children}</>
  }

  return null
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
      <Authenticator
        components={components}
        formFields={formFields}
        hideSignUp={true}
        loginMechanisms={['email']}
        socialProviders={[]}
      >
        <AuthContent>{children}</AuthContent>
      </Authenticator>
    </div>
  )
}
