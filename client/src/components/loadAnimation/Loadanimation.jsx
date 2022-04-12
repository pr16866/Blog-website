import React from "react";

import { Box, makeStyles } from "@material-ui/core";

import clsx from "clsx";
const useStyle = makeStyles((theme) => ({
  middle: {
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // position: "absolute",
  },
  bar: {
    width: "10px",
    height: "70px",
    background: "#fff",
    display: "inline-block",
    transformOrigin: "bottom center",
    borderTopRightRadius: "20px",
    borderTopLeftRadius: "20px",
    /*   box-shadow:5px 10px 20px inset rgba(255,23,25.2); */
    animation: "$loader 1.2s linear infinite",
    // animation: `$loder 1.2sms ${theme.transitions.easing.easeInOut } infinite`,
//     '@keyframes loader': {
//         '0%': {
//           transform: 'scaleY(0.1)',
//           background:' ',
//         },
//         '50%': {
//           transform: 'scaleY(1)',
//           background: 'yellowgreen',
//         },
//         '100%': {
//           transform: 'scaleY(0.1)',
//           background: 'transparent',
//         }
//   },
},
  bar1: {
    animationDelay: "0.1s",
  },
  bar2: {
    animationDelay: "0.2s",
  },
  bar3: {
    animationDelay: "0.3s",
  },
  bar4: {
    animationDelay: "0.4s",
  },
  bar5: {
    animationDelay: "0.5s",
  },
  bar6: {
    animationDelay: "0.6s",
  },
  bar7: {
    animationDelay: "0.7s",
  },
  bar8: {
    animationDelay: "0.8s",
  },
  '@keyframes loader': {
    '0%': {
      transform: 'scaleY(0.1)',
      background:' ',
    },
    '50%': {
      transform: 'scaleY(1)',
      background: 'yellowgreen',
    },
    '100%': {
      transform: 'scaleY(0.1)',
      background: 'transparent',
    }
},
}));
export default function Loadanimation() {
  const classes = useStyle();
  const { middle, bar, bar1, bar2, bar3, bar4, bar5, bar6, bar7, bar8 } =
    classes;
  return (
    <>
      <Box className={middle}>
        <Box className={clsx(bar, bar1)}></Box>
        <Box className={clsx(bar, bar2)}></Box>
        <Box className={clsx(bar, bar3)}></Box>
        <Box className={clsx(bar, bar4)}></Box>
        <Box className={clsx(bar, bar5)}></Box>
        <Box className={clsx(bar, bar6)}></Box>
        <Box className={clsx(bar, bar7)}></Box>
        <Box className={clsx(bar, bar8)}></Box>
      </Box>
    </>
  );
}
