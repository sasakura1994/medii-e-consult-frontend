import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

export type CredentialResponse = {
  clientId: string;
  credential: string;
  select_by: string;
};

const LoginButton = () => {
  const onSuccess = async (credentialResponse: any) => {
    console.log('Credential response:', credentialResponse);

    // ID Tokenの存在確認
    const idToken = credentialResponse?.credential;
    if (!idToken) {
      console.error('ID Token not found:', credentialResponse);
      return;
    }
    
    try {
      console.log(idToken)
      const response = await axios.post('http://localhost:8080/verify-token', {
        id_token: idToken,
      });
      console.log('Server response:', response);

      // Emailの存在確認
      if (!response.data.email) {
        console.error('Email not found in response:', response);
        return;
      }
    } catch (error) {
      console.error('Error verifying ID token:', error);
    }
  };

  const onError = (error: string) => {
    console.log('Login Failed:', error);
    return error;
  };

  return <GoogleLogin onSuccess={onSuccess} />;
};

const GoogleLoginButton = () => {
  const clientId = '917084586867-lhl97gftq2ll5g8g53101qs57am6j5rl.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginButton />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
