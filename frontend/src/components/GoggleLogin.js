import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; 

const GoogleLoginComponent = () => {
    const onSuccess = (response) => {
        console.log('Login Success: currentUser:', response.profileObj);
        // Here you can send the token to your backend for further processing
        const token = response.tokenId;
        // Send token to your backend for verification and further processing
    };

    const onFailure = (response) => {
        console.log('Login failed: res:', response);
    };

    return (
        <div>
            <h1>Login with Google</h1>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                scope="profile email"
                state="robotics"
            />
        </div>
    );
};

export default GoogleLoginComponent;
