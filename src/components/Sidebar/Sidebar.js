import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import db from "../../firebase";
import firebase from "firebase/compat/app";
import ChatItem from "../ChatItem/ChatItem";
import '../../App.scss';
import './Sidebar.scss';
import Profile from "../Profile/Profile";
import { auth } from "../../firebase";


const Sidebar = () => {

    const [chats, setChats] = useState([]);
    const [search, setSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const unsubscribe = db.collection('chats').orderBy('timestamp', 'desc').onSnapshot((snapshot) =>
            setChats(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        );
        return () => {
            unsubscribe();
        }
    }, [])

    const createChat = () => {
        const chatName = prompt('Please type a chatname');
        if (chatName) {
            db.collection('chats').add({
                name: chatName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__profileImg" onClick={() => setOpenModal(true)}>
                    <img src={auth.currentUser.photoURL} alt="profile_img" />
                </div>
                {openModal && <Profile closeModal={setOpenModal} />}
                <div className="sidebar__header_search">
                    <form className="search">
                        <div className="search__icon">
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
                        </div>
                        <input className="search__input" 
                                type="text"
                                placeholder="Search or start new chat"
                                onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    <div className="newMessage__icon">
                        <FontAwesomeIcon icon={faPenToSquare} size="2x" onClick={createChat} />
                    </div>
                </div>
            </div>
            <h2 className="sidebar__title">Chats</h2>
            <div className="sidebar__body">
                {chats.filter(chat => chat.data.name.toLowerCase().includes(search))
                    .map((chat) => (
                        <ChatItem key={chat.id}
                                id={chat.id}
                                name={chat.data.name} />
                    ))
                }
            </div>
        </div>
    )
} 

export default Sidebar;