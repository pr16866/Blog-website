import { Chat } from '@material-ui/icons';
import React from 'react'
import NotificationUi from './NotificationUi';

export default function NotificationWrapper({ notification }) {
  return (
    <div>
      {/* <div className="hamburger-menu">
        <div className="notiNo">
          <Chat style={{ fontSize: "2.5rem" }} />
        </div>
        <div className="noNotification">
          <p
            style={{
              fontSize: "2.5rem",
              marginBottom: "55px",
              fontWeight: "bolder",
            }}>
            
          </p>
        </div>
      </div> */}
      <NotificationUi notification={notification} />
    </div>
  );
}
