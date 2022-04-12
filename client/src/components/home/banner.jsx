import React from 'react'
import { makeStyles,Box ,Typography} from '@material-ui/core'
import images from'../../images/banner.jpg' 

const styel = makeStyles({
  container: {
    background: `URL(./images/banner.jpg)`,

    width: "100%",
    height: "70vh",
    backgroundSize: "100% 100%",
    //  backgroundColor:"#000",
    backgroundAttachment: "fixed",
    backgroundPosition: " center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& :first-child": {
      fontSize: 50,
      color: "white",
    },
    "& :last-child": {
      fontSize: 30,
      color: "white",
    },
  },
  content: {
    textAlign: "center",
    backgroundColor: "rgb(0,0,0,0.6)",
    borderRadius: "20px",
    padding: "7px",
  },
});
export default function Banner() {
    let classes=styel();
    return (
        <>
    
            <Box className={classes.container}>
                <Box className={classes.content}>
            <Typography>WELCOME TO OUR</Typography>
            <Typography>BLOG WEBSITE</Typography>
            </Box></Box>
              </>
    )
}
