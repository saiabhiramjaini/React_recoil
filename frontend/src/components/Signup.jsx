import React, {useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {  useRecoilState, useSetRecoilState } from 'recoil';
import { statusAtom, notificationsAtom, notificationsListAtom } from '../atoms';

function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");

    const setStatus = useSetRecoilState(statusAtom);
    const setNotificationCount = useSetRecoilState(notificationsAtom);
    const [notifications, setNotifications] = useRecoilState(notificationsListAtom);

    const addNotification = (newNotification) => {
        setNotifications(prevNotifications => [
          ...prevNotifications,
          newNotification  
        ]);
      }

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5001/signup', {username, email, password, cPassword,})
            alert(response.data.msg);
            if(response.data.msg == "User created Successfully"){
                setNotificationCount(count=>count+1);
                addNotification("You have registered successfully");
                setStatus("registered");
                navigate('/signin')
            }
        }catch(e){
            console.log(e);
        }   
    }

    return(
        <>
        <h1>Signup</h1>
        <label> Username </label>
        <br />
        <input type="text" onChange={(e)=>setUsername(e.target.value)}/>
        <br /> <br />
        <label> Email </label>
        <br />
        <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
        <br /><br />
        <label> Password </label>
        <br />
        <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <br /><br />
        <label> Confirm Password </label>
        <br />
        <input type="password" onChange={(e)=>setCpassword(e.target.value)}/>
        <br /><br />
        <button onClick={handleSubmit}>Signup</button>
        <br />
        <a href="/signin">Already have an account?</a>
        </>
    )
}

export default Signup;