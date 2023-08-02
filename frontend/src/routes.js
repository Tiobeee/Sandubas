import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from "./services/auth";

const LoginPage = () => <h1>Login</h1>;
const SignUpPage = () => <h1>SingUp</h1>;
const AppPage = () => {
    if (!isAuthenticated()){
        return <Navigate to="/" replace/>
    }

    return <h1>App</h1>;
}