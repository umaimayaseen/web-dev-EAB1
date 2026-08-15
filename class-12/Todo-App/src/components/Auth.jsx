import React, { useState } from "react";
import { myDatabase } from "../supabase";

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        if (isSignUp) {
            const { error } = await myDatabase.auth.signUp({
                email: email,
                password: password
            });
            if (error) {
                alert("Error signing up: " + error.message);
            } else {
                alert("Sign up successful! Please check your email to confirm your account.");
            }
        } else {
            const { error } = await myDatabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) {
                alert("Error logging in: please create account if you haven’t Signed up before. " + error.message);
            }


        }


    }


    return (
        <div className="auth-card">

            <h2>{isSignUp ? "Create new account" : "Welcome Back"}  </h2>

            <form onSubmit={handleSubmit} className="auth-form">
                <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} value={email} className="task-input" />
                <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} value={password} className="task-input" />
                <button type="submit" className="save-btn auth-submit-btn">
                    {isSignUp ? 'Sign Up' : 'Log In'}
                </button>

            </form>
            <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-auth-btn       ">
                {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>
        </div>
    )
}
export default Auth;