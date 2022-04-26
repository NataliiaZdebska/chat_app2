import React from "react";
import { auth } from "../../firebase";
import './Profile.scss'

const Profile = ({closeModal}) => {
    return (
        <section className="profile__container">
            <div className="profile">
                <div className="profile__img">
                    <img src={auth.currentUser.photoURL} alt="profile_img" />
                </div>
                <p className="profile__info">Name: <span>{auth.currentUser.displayName}</span></p>
                <p className="profile__info">E-mail: <span>{auth.currentUser.email}</span></p>
                <div className="profile__btn" onClick={() => closeModal(false)}>
                    <div className="profile__closeBtn"><span></span></div>
                </div>
            </div>
        </section>
    )
}

export default Profile;