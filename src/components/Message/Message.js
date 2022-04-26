import React from "react";
import { useStateValue } from "../../StateProvider";
import './Message.scss';

const Message = ({uid, name, text, timestamp, profilePic, renderRecieverMessageInfo}) => {
    const [{ user }] = useStateValue();

    const dateToHourMinutesString = (date) => {
        if (date) {
            const hoursMinutes = date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h12'
            });
            return hoursMinutes;
        }
    }

    return (
        <div className={`message ${uid === user.uid && 'message__sender'}`}>
            {renderRecieverMessageInfo && 
                <div className="message__senderImg">
                    <img src={profilePic} alt="img" className="message__image"/>
                </div>
            }

            <div className="message__body">
                {renderRecieverMessageInfo &&
                    <div className="message__name">{name}</div>
                }
                <div className="message__text">{text}</div>
                <div className="message__timestamp">{dateToHourMinutesString(timestamp)}</div>
            </div>
            
        </div>
    )
} 

export default Message;