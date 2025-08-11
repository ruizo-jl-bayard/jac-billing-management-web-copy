"use client"

import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { LoginForm } from "./login-form";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

interface AuthWrapperProps {
  children: React.ReactNode;
}

function AuthContent({ children }: AuthWrapperProps) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus === 'authenticated') {
    return <>{children}</>;
  }

  return <LoginForm />;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Authenticator.Provider>
      <AuthContent>{children}</AuthContent>
    </Authenticator.Provider>
  );
}
