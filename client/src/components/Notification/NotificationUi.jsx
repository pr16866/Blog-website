
    
      import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";

import { Close } from "@material-ui/icons";
import Typography from "@mui/material/Typography";
import { useGlobalState } from "../GlobalState/Globalstate";

import { useParams } from "react-router-dom";
import ProfileButton from "../Profile/ProfileButton";
import { Box } from "@material-ui/core";
// import EachFollowers from "./EachFollowers";
import { width } from "@mui/system";
import { TextField, unstable_useEnhancedEffect } from "@mui/material";
import { filterFollowers, getAllFollowers, Unseen } from "../../service/api";
import NotificationButton from "./NotificationButton";
import EachNotification from "./EachNotification";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, textAlign: "center", width: 500, maxWidth: "100%" }}
      {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
           
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function NotificationUi({ notification }) {
  const [notificationFlag, setnotificationFlag] =
    useGlobalState("notificationFlag");
  // const [filterFlag, setFilterFlag] = useState(false);
  // const [duplicatefollower, setduplicatefollower] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const params = useParams();
  // console.log(params);
  const handleClose = async () => {
    setOpen(false);
    let response = await Unseen(params.username);
    setnotificationFlag(response.data);
    // console.log(response);
  };
  // let revNotification = notification.reverse();
  // console.log(revNotification);
  // const [allFollowers, setallFollowers] = useState([]);
  // const params = useParams();

  //   useEffect(async () => {
  //   const response = await getAllFollowers(params.username);
  //   if (response.data) {
  //     setallFollowers(response.data);
  //     setduplicatefollower(response.data);
  //   }
  // }, [params, followFlag, filterFlag]);

  // const handleChange = async (e) => {
  //   e.preventDefault();
  //   if (e.target.value) {
  //     let data = duplicatefollower.filter((item, index) => {
  //       let res = item.userid.search(e.target.value);
  //       if (res >= 0) {
  //         return item;
  //       }
  //     });
  //     setallFollowers(data);
  //   } else {
  //     setallFollowers(duplicatefollower);
  //   }
  // };

  return (
    <div>
      <Box onClick={handleClickOpen}>
        <NotificationButton notification={notification} />
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}>
          NOTIFICATION
        </BootstrapDialogTitle>

        <DialogContent
          sx={{
            borderTop: "1px solid #666",
          }}>
          

          {notification.map((item, index) => {
            
            return (
              <Typography gutterBottom key={index}>
                
                <EachNotification item={item} />
              </Typography>
            );
          })}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

