import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { FormControlLabel, Switch } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions } from "../Redux/Actions";
import alertify from "alertifyjs";
import db from "../firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState("Male");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const users = useSelector((state) => state.dataReducer.users);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setGender(checked ? "Female" : "Male");
  };
  const dispatch = useDispatch();

  const { selectUser } = bindActionCreators(dataActions, dispatch);
  const createUser = async (e) => {
    e.preventDefault();

    if (name !== " " && surname !== " " && email !== " " && password !== " ") {
      let check = true;
      users.map((user) => {
        if (user.password === password) {
          check = false;
        }
      });
      if (check) {
        let newUser = {
          name,
          surname,
          email,
          password,
          gender,
          id: uuidv4(),
        };

        await db.collection("users").add(newUser);
        alertify.success(`User created. Welcome ${name}`, 1);
        await selectUser(newUser);
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setGender("Male");
        history.push("/cart");
      } else {
        alertify.error("This email has already been saved in the system.", 1);
      }
    } else {
      alertify.error("Please fill in all fields.", 1);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={createUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>Male</Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={checked}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Female"
                    />
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
