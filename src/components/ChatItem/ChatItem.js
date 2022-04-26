import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";
import db from "../../firebase";
import './ChatItem.scss';
import UserIcon from "../UserIcon/UserIcon";


const ChatItem = ( {id, name} ) => {

    const [messages, setMessage] = useState('');
    const [{ user }] = useStateValue();
    const { chatId } = useParams();

    useEffect(() => {
        db.collection('chats')
          .doc(id)
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .limit(1)
          .onSnapshot((snapshot) => {
              setMessage(snapshot.docs.map((doc) => 
                  doc.data()))
          })
    })

    const dateToDateMonth = (date) => {
        if(date) {
            const dateMonthYear = date.toLocaleDateString();
            return dateMonthYear;
        }
    }

    return (
        <Link to={`/chats/${id}`}>
            <div className={`chatItem ${id === chatId && 'active'}`}>
                <div className="chatItem__avatar">
                    <UserIcon />
                </div>
                <div className="chatItem__info">
                    <h2 className="chatItem__name">{name}</h2>
                    { messages[0] &&
                        <p className="chatItem__message">
                            {`${user.uid === messages[0]?.uid ? 'Me' : messages[0]?.name}: ${messages[0]?.message}`}
                        </p>
                    }
                    
                </div>
                <div className="chatItem__timestamp">{dateToDateMonth((messages[0]?.timestamp?.toDate()))}</div>
            </div>
        </Link>
    )
} 

export default ChatItem;