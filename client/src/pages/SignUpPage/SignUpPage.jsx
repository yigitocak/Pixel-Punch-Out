import './SignUpPage.scss'
import {SignUpForm} from "../../Components/SignUpForm/SignUpForm";
import {useNavigate} from "react-router-dom";

export const SignUpPage = ({isLoggedIn, username}) => {
    const navigate = useNavigate()
    if(isLoggedIn) {
        navigate(`/profiles/${username}`)
    }
    else {
        return (
            <section
                className="signup"
            >
                <SignUpForm />
            </section>
        )
    }

}