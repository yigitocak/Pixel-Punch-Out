import './LoginForm.scss'
import {NavLink} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../utils/utils";

export const LoginForm = ({setIsLoggedIn, renderUsername}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");

        if(!email || !password) {
           return setError("Please fill out the fields!")
        }

        try {
            const response = await axios.post(`${BASE_URL}auth/login`,
                {email, password});
            localStorage.setItem('authToken', response.data.token)
            setIsLoggedIn(true)
            renderUsername(response.data.username)

        } catch (error) {
            console.error("Signup failed: ", error);
            if(error.response.status) setError("Sorry, your email or password was incorrect.")
            else setError("Login failed. Please try again later.");
        }
    }

    return (
        <form
            className="login__form"
            onSubmit={handleSubmit}
        >
            <label
                className="login__label"
            >
                Email
                <input
                    placeholder="Enter your email"
                    type="text"
                    className="login__input"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </label>

            <label
                className="login__label"
            >
                Password
                <input
                    placeholder="Enter your password"
                    type="password"
                    className="login__input"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <label
                className="login__remember-label"
            >
                <input
                    type="checkbox"
                    className="login__checkbox"
                />
                <span
                    className="login__remember"
                >Remember me
                    </span>
            </label>
            <button
                className="login__button"
            >
                Login
            </button>
            {error && <div className="login__error">{error}</div>}
            <NavLink
                className="login__signup"
                to="/signup"
            >
                Sign Up now!
            </NavLink>
        </form>
    )
}