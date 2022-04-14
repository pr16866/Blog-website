import { Typography } from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import React from 'react'

export default function NotificationButton({ notification }) {
  let count=0;
  let unreadNoti = notification.map((item, index) => {
    return item.seen ? "" : count++;
    ;
  })
  // console.log(count);
  return (
    <div>
      <div className="hamburger-menu">
        <div className="notiNo">
          <Chat style={{ fontSize: "30px",marginTop:"10px" }} />
        </div>
        <div className="noNotification">
          <Typography
            style={{
              fontSize: "2.5rem",
              marginBottom: "42px",
              fontWeight: "bolder",
            }}>
            {count}
          </Typography>
        </div>
      </div>
    </div>
  );
}
