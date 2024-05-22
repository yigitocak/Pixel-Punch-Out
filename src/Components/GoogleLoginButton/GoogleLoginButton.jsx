import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

const GoogleLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  const handleLogin = async (response) => {
    const { credential } = response;
    try {
      const res = await axios.post(`${BASE_URL}oauth/google/callback`, {
        token: credential,
      });
      onLoginSuccess(res.data);
    } catch (error) {
      onLoginFailure(error);
    }
  };

  return <GoogleLogin onSuccess={handleLogin} onError={onLoginFailure} />;
};

export default GoogleLoginButton;
