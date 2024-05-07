import './SignUpForm.scss'
import {NavLink} from "react-router-dom";

export const SignUpForm = () => {
    return (
        <form
            className="signup__form"
        >
            <label
                className="signup__label"
            >
                Email
                <input
                    placeholder="Enter your email"
                    type="text"
                    className="signup__input"
                />
            </label>

            <label
                className="signup__label"
            >
                Username
                <input
                    placeholder="Enter your username"
                    type="text"
                    className="signup__input"
                />
            </label>

            <label
                className="signup__label"
            >
                Password
                <input
                    placeholder="Enter your password"
                    type="password"
                    className="signup__input"
                />
            </label>

            <label
                className="signup__label"
            >
                Confirm Password
                <input
                    placeholder="Re-enter your password"
                    type="password"
                    className="signup__input"
                />
            </label>

            <label
                className="signup__remember-label"
            >
                <input
                    type="checkbox"
                    className="signup__checkbox"
                />
                <span
                    className="signup__remember"
                >
                    I agree to the
                    <NavLink
                        to="/policies"
                        className="signup__link"
                    >
                        Privacy Policy
                    </NavLink>
                </span>
            </label>

            <label
                className="signup__remember-label"
            >
                <input
                    type="checkbox"
                    className="signup__checkbox"
                />
                <span
                    className="signup__remember"
                >
                    I agree to the
                    <NavLink
                        to="/policies"
                        className="signup__link"
                    >
                        Terms of use
                    </NavLink>
                </span>
            </label>

            <button
                className="signup__button"
            >Sign Up
            </button>
            <NavLink
                className="signup__back"
                to="/login"
            >
                Back to Login
            </NavLink>
        </form>
    )
}