import './LoginPage.scss'
import {NavLink} from "react-router-dom";

export const LoginPage = () => {
    return (
        <section
            className="login"
        >
            <form
                className="login__form"
            >
                <label
                    className="login__label"
                >
                    Email
                    <input
                        placeholder="Enter your email"
                        type="text"
                        className="login__input"
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
                    />
                </label>
                <label
                    className="login__input"
                >
                    <input
                        type="checkbox"
                        className="login__checkbox"
                    />
                    <span
                        className="login__remember"
                    >Remember me?
                    </span>
                </label>
                <button
                    className="login__button"
                >Login</button>
                <NavLink
                    className="login__signup"
                    to="/signup"
                >
                    Sign Up now!
                </NavLink>
            </form>

        </section>
    )
}