import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import "bootstrap/dist/css/bootstrap.min.css";

const Welcome = ({ setAuthed }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = (response) => {
        setIsAuthenticated(true);
        setAuthed(true);
        navigate('/board');
    };
    const googleClientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
        style={
            {
                "backgroundColor": "#FDF6E3"
            }
        }
        >
            <div className="card shadow p-3 rounded w-75">
                <div className="card-header text-center">
                    <h1 className="card-title display-3"
                    style={{"color": "#CB4B16"}}>
                        Welcome to the unbeatable
                        <br></br> 
                        Tic Tac Toe game
                    </h1>
                </div>
                <div className="card-footer text-center">
                    <div className="d-flex justify-content-center align-items-center">
                        {isAuthenticated ? (
                            <div>
                            </div>
                        ) : (
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                clientId={googleClientId}
                                onFailure={(response) => console.log('Google login response:', response)}
                                buttonText="Login with Google"
                                className="btn btn-danger"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
