import { 
  signIn, 
  signUp, 
  confirmSignIn, 
  confirmSignUp, 
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  SignInInput,
  SignUpInput,
  ConfirmSignInInput,
  ConfirmSignUpInput,
  ResendSignUpCodeInput,
  ResetPasswordInput,
  ConfirmResetPasswordInput
} from "aws-amplify/auth"

// Custom service overrides for the Authenticator
export const customServices = {
  // Override sign in to add custom validation or processing
  async handleSignIn(input: SignInInput) {
    const { username, password, options } = input
    
    // Custom preprocessing - lowercase email
    const customUsername = username.toLowerCase().trim()
    
    try {
      const result = await signIn({
        username: customUsername,
        password,
        options
      })
      
      // Custom post-processing logic here
      console.log('Sign in successful:', result)
      
      return result
    } catch (error) {
      // Custom error handling
      console.error('Sign in error:', error)
      throw error
    }
  },

  // Override sign up to add custom validation
  async handleSignUp(input: SignUpInput) {
    const { username, password, options } = input
    
    // Custom preprocessing
    const customUsername = username.toLowerCase().trim()
    const customEmail = options?.userAttributes?.email?.toLowerCase().trim()
    
    // Custom validation
    if (password && password.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }
    
    try {
      const result = await signUp({
        username: customUsername,
        password,
        options: {
          ...options,
          userAttributes: {
            ...options?.userAttributes,
            email: customEmail,
          },
        },
      })
      
      console.log('Sign up successful:', result)
      return result
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  },

  // Override confirm sign in for MFA flows
  async handleConfirmSignIn(input: ConfirmSignInInput) {
    const { challengeResponse, options } = input
    
    try {
      const result = await confirmSignIn({
        challengeResponse,
        options
      })
      
      console.log('Confirm sign in successful:', result)
      return result
    } catch (error) {
      console.error('Confirm sign in error:', error)
      throw error
    }
  },

  // Override confirm sign up
  async handleConfirmSignUp(input: ConfirmSignUpInput) {
    const { username, confirmationCode, options } = input
    
    try {
      const result = await confirmSignUp({
        username: username.toLowerCase().trim(),
        confirmationCode,
        options
      })
      
      console.log('Confirm sign up successful:', result)
      return result
    } catch (error) {
      console.error('Confirm sign up error:', error)
      throw error
    }
  },

  // Override resend sign up code
  async handleResendSignUpCode(input: ResendSignUpCodeInput) {
    const { username, options } = input
    
    try {
      const result = await resendSignUpCode({
        username: username.toLowerCase().trim(),
        options
      })
      
      console.log('Resend sign up code successful:', result)
      return result
    } catch (error) {
      console.error('Resend sign up code error:', error)
      throw error
    }
  },

  // Override forgot password
  async handleForgotPassword(input: ResetPasswordInput) {
    const { username, options } = input
    
    try {
      const result = await resetPassword({
        username: username.toLowerCase().trim(),
        options
      })
      
      console.log('Reset password successful:', result)
      return result
    } catch (error) {
      console.error('Reset password error:', error)
      throw error
    }
  },

  // Override forgot password submit
  async handleForgotPasswordSubmit(input: ConfirmResetPasswordInput) {
    const { username, newPassword, confirmationCode, options } = input
    
    // Custom password validation
    if (newPassword && newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long')
    }
    
    try {
      const result = await confirmResetPassword({
        username: username.toLowerCase().trim(),
        newPassword,
        confirmationCode,
        options
      })
      
      console.log('Confirm reset password successful:', result)
      return result
    } catch (error) {
      console.error('Confirm reset password error:', error)
      throw error
    }
  },

  // Custom validation service for sign up
  async validateCustomSignUp(formData: Record<string, any>) {
    const errors: Record<string, string> = {}
    
    // Custom validation logic
    if (formData.email && !formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (formData.password && formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long'
    }
    
    if (formData.password && formData.confirm_password && formData.password !== formData.confirm_password) {
      errors.confirm_password = 'Passwords do not match'
    }
    
    // Return errors if any
    if (Object.keys(errors).length > 0) {
      return errors
    }
  }
}

// Usage example - you can pass these services to the Authenticator:
// <Authenticator services={customServices}>
//   {({ signOut }) => <button onClick={signOut}>Sign out</button>}
// </Authenticator>
