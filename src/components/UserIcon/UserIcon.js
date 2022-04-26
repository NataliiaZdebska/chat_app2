import React, {useState, useEffect} from "react";

import './UserIcon.scss';

const UserIcon = () => {
    const [friends, setFriends] = useState([]);
    const randomUser_API = 'https://randomuser.me/api';

    useEffect(() => {
        fetch(randomUser_API)
        .then((res) => res.json())
        .then((res) => {
            setFriends(res.results);
        })
    }, [setFriends]);

    return (
        <React.Fragment>
            {friends.map(item => (
                <img src={item.picture.thumbnail} alt={item.name.first} key={item.name.first} className="chatItem__img" />
            ))} 
        </React.Fragment>
    )
} 

export default UserIcon;