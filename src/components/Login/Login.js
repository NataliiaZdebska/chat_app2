import React from "react";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { auth, provider } from "../../firebase";

import './Login.scss';

const Login = () => {
const [{ }, dispatch] = useStateValue();

    const signIn = async () => {
        try {
            const result = await auth.signInWithPopup(provider);
            dispatch ({
                type: actionTypes.SET_USER,
                user: result.user
            })
        }
        catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="login__container">
            <div className="login__inner">
                <h1 className="login__heading">Welcome to Chat-APP</h1>
                <button onClick={signIn} className="login__btn">Sign in with Google</button>
            </div>
        </div>
    )
} 
export default Login;