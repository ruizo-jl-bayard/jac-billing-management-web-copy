"use client"

import { Amplify } from "aws-amplify"
import {
  Authenticator,
  useAuthenticator,
  View,
  Text,
  Heading,
  Button,
} from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css'
import '../../styles/amplify-theme.css'
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
        <div className="jac-auth-header">
          <h1 className="jac-auth-logo">JAC</h1>
          <p className="jac-auth-subtitle">Loading...</p>
        </div>
      </div>
    </div>
  )
}

const components = {
  Header() {
    return (
      <View textAlign="center" padding="large">
        <div className="jac-auth-header">
          <h1 className="jac-auth-logo">JAC</h1>
          <Text color="var(--amplify-colors-font-secondary)" className="jac-auth-subtitle">
            Billing Management System
          </Text>
        </div>
      </View>
    )
  },

  Footer() {return (<></>)},

  SignIn: {
    Header() {
      return (
        <Heading
          level={4}
          textAlign="center"
          marginTop="large"
          color="var(--amplify-colors-font-primary)"
        >
          Sign in to your account
        </Heading>
      )
    },
    Footer() {
      const { toForgotPassword } = useAuthenticator()
      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toForgotPassword}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
        </View>
      )
    },
  },

  SignUp: {
    Header() {
      return (
        <Heading
          level={3}
          textAlign="center"
          marginBottom="medium"
          color="var(--amplify-colors-font-primary)"
        >
          Create a new account
        </Heading>
      )
    },
    Footer() {
      const { toSignIn } = useAuthenticator()
      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      )
    },
  },

  ForceNewPassword: {
    Header() {
      return (
        <Heading
          level={3}
          textAlign="center"
          marginBottom="medium"
          color="var(--amplify-colors-font-primary)"
        >
          Set New Password
        </Heading>
      )
    },
    Footer() {
      return (
        <Text textAlign="center" fontSize="small" color="var(--amplify-colors-font-secondary)">
          Please create a new password to continue
        </Text>
      )
    }
  },

  ForgotPassword: {
    Header() {
      return (
        <Heading
          level={3}
          textAlign="center"
          marginBottom="medium"
          color="var(--amplify-colors-font-primary)"
        >
          Reset Password
        </Heading>
      )
    },
    Footer() {
      const { toSignIn } = useAuthenticator()
      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      )
    }
  },

  ConfirmResetPassword: {
    Header() {
      return (
        <Heading
          level={3}
          textAlign="center"
          marginBottom="medium"
          color="var(--amplify-colors-font-primary)"
        >
          Enter New Password
        </Heading>
      )
    },
    Footer() {
      return (
        <Text textAlign="center" fontSize="small" color="var(--amplify-colors-font-secondary)">
          Enter the verification code and your new password
        </Text>
      )
    }
  },

  ConfirmSignUp: {
    Header() {
      return (
        <Heading
          level={3}
          textAlign="center"
          marginBottom="medium"
          color="var(--amplify-colors-font-primary)"
        >
          Verify your account
        </Heading>
      )
    },
    Footer() {
      return (
        <Text textAlign="center" fontSize="small" color="var(--amplify-colors-font-secondary)">
          Check your email for the verification code
        </Text>
      )
    }
  },

  SetupTotp: {
    Header() {
      return (
        <Heading
          level={3}
          textAlign="center"
          marginBottom="medium"
          color="var(--amplify-colors-font-primary)"
        >
          Setup Two-Factor Authentication
        </Heading>
      )
    },
    Footer() {
      return (
        <Text textAlign="center" fontSize="small" color="var(--amplify-colors-font-secondary)">
          Scan the QR code with your authenticator app
        </Text>
      )
    }
  },

  ConfirmSignIn: {
    Header() {
      return (
        <Heading
          level={3}
          textAlign="center"
          marginBottom="medium"
          color="var(--amplify-colors-font-primary)"
        >
          Enter Verification Code
        </Heading>
      )
    },
    Footer() {
      return (
        <Text textAlign="center" fontSize="small" color="var(--amplify-colors-font-secondary)">
          Enter the code from your authenticator app
        </Text>
      )
    }
  }
}

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email address',
      label: 'Email',
      isRequired: true,
    },
    password: {
      placeholder: 'Enter your password',
      label: 'Password',
      isRequired: true,
    }
  },
  signUp: {
    email: {
      placeholder: 'Enter your email address',
      label: 'Email',
      isRequired: true,
      order: 1
    },
    password: {
      placeholder: 'Create a password',
      label: 'Password',
      isRequired: true,
      order: 2
    },
    confirm_password: {
      placeholder: 'Confirm your password',
      label: 'Confirm Password',
      isRequired: true,
      order: 3
    }
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your new password',
      label: 'New Password',
      isRequired: true,
    },
    confirm_password: {
      placeholder: 'Confirm your new password',
      label: 'Confirm New Password',
      isRequired: true,
    }
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email address',
      label: 'Email',
      isRequired: true,
    }
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter verification code',
      label: 'Verification Code',
      isRequired: true,
    },
    password: {
      placeholder: 'Enter your new password',
      label: 'New Password',
      isRequired: true,
    },
    confirm_password: {
      placeholder: 'Confirm your new password',
      label: 'Confirm New Password',
      isRequired: true,
    }
  },
  confirmSignUp: {
    confirmation_code: {
      placeholder: 'Enter verification code',
      label: 'Verification Code',
      isRequired: true,
    }
  },
  setupTotp: {
    QR: {
      totpIssuer: 'JAC Billing Management',
      totpUsername: 'JAC User',
    },
    confirmation_code: {
      placeholder: 'Enter code from authenticator app',
      label: 'Verification Code',
      isRequired: true,
    }
  },
  confirmSignIn: {
    confirmation_code: {
      placeholder: 'Enter verification code',
      label: 'Verification Code',
      isRequired: true,
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
        socialProviders={['google']}
        variation="modal"
      >
        <AuthContent>{children}</AuthContent>
      </Authenticator>
    </div>
  )
}
