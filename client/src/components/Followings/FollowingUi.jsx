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
import { TextField } from "@mui/material";
import { filterFollowers, getallFollowings, getAllFollowings } from "../../service/api";
import EachFollowers from "../Followers/EachFollowers";

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
// console.log(PropTypes);
//
export default function CustomizedFollowing() {
  const [followFlag, setFollowFlag] = useGlobalState("followerflag");
  const [filterFlag, setFilterFlag] = useState(false);
  const [duplicateFollowings, setduplicateFollowings] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [allFollowings, setallFollowings] = useState([]);
  const params = useParams();

  useEffect(async () => {
    const response = await getAllFollowings(params.username);
    console.log(response);
    if (response.data) {

      setallFollowings(response.data);
      setduplicateFollowings(response.data);

    }
  }, [params, followFlag, filterFlag]);



  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.value) {
      let data = duplicateFollowings.filter((item, index) => {
        let res = item.userid.search(e.target.value);
        // console.log(res);
        if (res >= 0) {
          console.log(res);
          return item;
        }
      });
      setallFollowings(data);
    } else {
      setallFollowings(duplicateFollowings);
    }
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>
        <ProfileButton number={allFollowings.length} name="Followings" />
      </Box>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}>
          FOLLOWINGS
          {/* <span style={{ color: "#666" }}>@{params.username}</span> */}
        </BootstrapDialogTitle>

        <DialogContent sx={{ borderTop: "1px solid #666" }}>
          <TextField
            id="fullWidth"
            placeholder="@username"
            variant="filled"
            sx={{
              width: 500,
              maxWidth: "100%",
              border: "none",
              pt: 1,
              mt: 2,
              outline: "none",
            }}
            onChange={handleChange}
          />
          {allFollowings.map((item, index) => {
            return (
              <Typography gutterBottom key={item._id}>
                <EachFollowers followers={item} />
              </Typography>
            );
          })}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
