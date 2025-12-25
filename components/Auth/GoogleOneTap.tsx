import React from 'react';
import { useGoogleOneTapLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const GoogleOneTap: React.FC = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    useGoogleOneTapLogin({
        onSuccess: (credentialResponse: CredentialResponse) => {
            console.log('Google One Tap Login Success:', credentialResponse);
            if (credentialResponse.credential) {
                const decoded: any = jwtDecode(credentialResponse.credential);
                console.log('Collected User Email:', decoded.email);
                console.log('User Name:', decoded.name);
                // Here you would send this data to your backend or CRM
                // For example: saveUserToDatabase(decoded.email, decoded.name);
            }
        },
        onError: () => {
            console.log('Google One Tap Login Failed');
        },
        disabled: !clientId, // Disable if no Client ID is provided
        use_fedcm_for_prompt: true, // Use modern FedCM API if available
    });

    return null; // This component renders the One Tap prompt overlaid on the screen
};

export default GoogleOneTap;
