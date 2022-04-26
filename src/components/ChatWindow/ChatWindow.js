import React, { useState, useRef, useEffect } from "react";
import Message from "../Message/Message";
import ChatDate from "../ChatDate/ChatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import './ChatWindow.scss';
import db from "../../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import UserIcon from "../UserIcon/UserIcon";



const ChatWindow = () => {

    const [chatName, setChatName] = useState('');
    const [messages, setMessage] = useState([]);
    const { chatId } = useParams();
    const [{ user }] = useStateValue();
    const inputRef = useRef(null);
    const messageEndRef = useRef(null);
    const [randomMessage, setRandomMessage] = useState('');
    const [isMessageSend, setMessageSend] = useState(false);
    const messageAPI = 'https://api.chucknorris.io/jokes/random';

    useEffect(() => {
        fetch(messageAPI)
        .then((res) => res.json())
        .then((res) => {
            setRandomMessage(res.value);
        })
    }, [isMessageSend]);

    useEffect(() => {
        setTimeout(() => {

        }, 10000)
    }, [randomMessage])


    useEffect(() => {
        const cleanUp1 = db.collection('chats')
            .doc(chatId)
            .onSnapshot((snapshot) => {
                if (snapshot.data()) {
                    setChatName(snapshot.data().name);
                }
            });

        const cleanUp2 = db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                if (snapshot) {
                    setMessage(snapshot.docs.map(doc => doc.data()));
                }
            });

            return () => {
                cleanUp1();
                cleanUp2()
            }


    }, [chatId])

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behaviour: 'auto' })
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('chats').doc(chatId).collection('messages').add({
            message: inputRef.current.value,
            name: user.displayName,
            uid: user.uid,
            profilePic: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        db.collection('chats').doc(chatId).update({
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        inputRef.current.value = '';
        setMessageSend(true);
    };

    const renderMessage = (message, prevMessage) => {
        return (
            <Message
            renderRecieverMessageInfo={(!prevMessage || message.uid !== prevMessage.uid) && message.uid !== user.uid }
            name={chatName}
            text={randomMessage}
            profilePic={message.profilePic}
            timestamp={message.timestamp?.toDate()}
            uid={message.uid}
        />
        )
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chatItem__avatar">
                    <UserIcon />
                </div>
                <h2 className="chat__header_userName">{chatName}</h2>
            </div>

            <div className="chat__body">
                {messages.map((message, index) => {
                    const prevMessage = messages[index-1];
                    const showDate = (prevMessage?.timestamp?.toDate().getDate() !== message.timestamp?.toDate().getDate()) ||
                                     (prevMessage?.timestamp?.toDate().getMonth() !== message.timestamp?.toDate().getMonth()) ||
                                     (prevMessage?.timestamp?.toDate().getYear() !== message.timestamp?.toDate().getYear());

                    return (
                        <React.Fragment key={message.timestamp + message.id}>
                            { showDate && <ChatDate date={message.timestamp?.toDate()} />}
                            {renderMessage(message, prevMessage)}
                        </React.Fragment>
                    )
                })}
                <div ref={messageEndRef}></div>

            </div>

            <div className="chat__footer">
                <div className="chat__footer_container">
                    <form className="chat__messageForm">
                        <input type="text" ref={inputRef} className="chat__input" placeholder="Enter some message..." />
                        <button className="chat__sendButton" onClick={sendMessage}>
                            <FontAwesomeIcon icon={faPaperPlane} size="2x" className="chat__sendIcon" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
} 

export default ChatWindow;