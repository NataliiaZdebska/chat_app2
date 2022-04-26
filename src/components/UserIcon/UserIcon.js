import React, {useState, useEffect} from "react";

import './UserIcon.scss';

const UserIcon = () => {

    const [images, setImage] = useState([]);
    const randomUser_API = 'https://randomuser.me/api';

    useEffect(() => {
        fetch(randomUser_API)
        .then((res) => res.json())
        .then((res) => {
            setImage(res.results);
        })
    }, [setImage]);

    return (
        <React.Fragment>
            {images.map((item) => (
                <img src={item.picture.thumbnail} alt={item.name.first} key={item.name.first} className="chatItem__img" />
            ))} 
        </React.Fragment>
    )
} 

export default UserIcon;