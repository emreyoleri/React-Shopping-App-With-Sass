import React, { useEffect, useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  img: {
    marginTop: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  imgCon: {
    height: "100vh",
    textAlign: "center",
  },
});
const NotFound = () => {
  const classes = useStyles();
  const [width, setWidth] = useState();
  const changeSize = (e) => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", changeSize);
  }, []);
  return (
    <div className={classes.imgCon}>
      <img
        className={classes.img}
        width={width / 1.75}
        src="https://www.maxpixel.net/static/photo/1x/Web-404-Page-Problem-Monitor-Error-Found-1350918.png"
        alt=""
      />
      <Typography variant="h5" gutterBottom>
        Opps!!! Page is Not Found &nbsp;
        <Button variant="contained" color="primary" href="/">
          Turn Home Page
        </Button>
      </Typography>
    </div>
  );
};

export default NotFound;
