import "./ProfilePage.scss"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../utils/utils";
import {ProfileForm} from "../../Components/ProfileForm/ProfileForm";

export const ProfilePage = ({isLoggedIn, username}) => {
    const {profileId} = useParams()
    const token = localStorage.getItem("authToken")
    const [user, setUser] = useState("")
    const navigate = useNavigate()

    const getUser = async () => {
        try{
            const response = await axios.get(`${BASE_URL}profiles/${profileId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setUser(response.data.profile)
            console.log(user)
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getUser()
    },[profileId])

    useEffect(() => {
        if(!isLoggedIn) {
            return navigate("/login")
        }
    },[isLoggedIn, navigate])

    return (
        <section
            className="profile"
        >
            <div
                className="profile__container"
            >
                <span
                    className="profile__username"
                >
                    {user.username}
                </span>
                <span
                    className="profile__info"
                >Wins:{user.wins}
                </span>
                <span
                    className="profile__info"
                >
                    Losses:{user.losses}
                </span>
                <ProfileForm username={username}/>
            </div>
        </section>
    )
}