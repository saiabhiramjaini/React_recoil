import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { statusAtom, notificationsAtom, notificationsListAtom } from '../atoms';
import bell from "../assets/bell.png";
import user from "../assets/user.png";

function Navbar() {
    const [isBellClicked, setIsBellClicked] = useState(false);
    const [isUserClicked, setIsUserClicked] = useState(false);

    const statusValue = useRecoilValue(statusAtom);
    const notificationsValue = useRecoilValue(notificationsAtom);
    const [notifications, setNotifications] = useRecoilState(notificationsListAtom);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' , padding: '0 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '20px' }}>
                    <h2>Authentication App</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => setIsBellClicked(!isBellClicked)} style={{ marginRight: '10px' }}>
                        <img src={bell} alt="Notifications" width="20px" />
                        {notificationsValue > 0 && <span style={{ backgroundColor: 'red', borderRadius: '50%', padding: '2px 6px', marginLeft: '5px', color: 'white' }}>{notificationsValue}</span>}
                    </button>
                    <button onClick={() => setIsUserClicked(!isUserClicked)}>
                        <img src={user} alt="User" width="20px" />
                        {statusValue === "signed in" && <span style={{ backgroundColor: 'green', borderRadius: '50%', padding: '2px 6px', marginLeft: '5px', color: 'white' }}>•</span>}
                    </button>
                </div>
            </div>
            {isBellClicked && (
                <div style={{ marginTop: '10px' }}>
                    <p> You have {notificationsValue} unread Notifications</p>
                    <ul>
                        {notifications.map((notification, index) => (
                            <li key={index}>{notification}</li>
                        ))}
                    </ul>
                </div>
            )}
            {isUserClicked && (
                <p>Status: {statusValue}</p>
            )}
        </div>
    );
}

export default Navbar;
