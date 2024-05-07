import './NotFoundPage.scss'
import {NavLink} from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <section
            className="not-found"
        >
            <h1>
                404 - Not found
            </h1>
            <NavLink
                to="/"
                className="not-found__link"
            >
                Back to Home
            </NavLink>
            <img
                className="not-found__logo"
                src="../../assets/images/logos/logo.jpg"
                alt="logo"
            />
        </section>
    )
}