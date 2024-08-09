import React, { useContext, useEffect, useRef } from 'react'

import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
export default function Message({message}) {
  const {currentUser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);
  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({
      behaviour:"smooth"
    });
  },[message]);
console.log(message);

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  
  // Get day of the week
  
  
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  // Determine AM or PM suffix
  const amPm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert to 12-hour format
  hours = hours % 12 || 12; // The hour '0' should be '12'
  
  // Format hours and minutes
  const formattedHours = hours.toString().padStart(2, '0');
  
  return ` ${formattedHours}:${minutes} ${amPm}`;
};
const day=(timestamp)=>{
  // Get day of the week
  const date = new Date(timestamp);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = daysOfWeek[date.getDay()];
  return `${dayName}`;
}


  
console.log(message.date);
  return (
    <div  ref ={ref}className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      
      <div className="messageinfo">
      <img src={message.senderId === currentUser.uid? currentUser.photoURL:data.user.photoURL} alt="" />
     <span>{day(message.date.toDate())}</span>
      <span>{formatTimestamp(message.date.toDate())}</span>
</div>
        <div className="messagecontent">
        <p>{message.text}</p>
        {message.img &&
        <img src={message.img} alt="" />
} 

        </div>
        
      
    </div>
  )
}
