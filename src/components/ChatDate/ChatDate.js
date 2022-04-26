import React from "react";
import './ChatDate.scss';

const ChatDate = ({date}) => {
    const dateToFullDateString = (date) => {
        const options = {weekday: 'long', day: 'numeric', year: 'numeric', month: 'long'};
        if (date) {
            const dateMonthYear = date.toLocaleDateString([], options);
            return dateMonthYear;
        }
    }
    return (
        <div className="chatDate">
            {dateToFullDateString(date)}
        </div>
    )
} 

export default ChatDate;