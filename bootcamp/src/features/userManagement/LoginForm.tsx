import React, { useState } from "react";
import { useStore } from "react-redux";
import { Alert, AlertTitle, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, SvgIcon, TextField, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { styled } from "@mui/system";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import { StaticDatePicker } from "@mui/x-date-pickers";
import { selectOptions } from "@testing-library/user-event/dist/types/setup/directApi";
import { User } from "../../models/UserProfileModel";
import { login } from "../../data/UserApi";
import { useAppDispatch } from "../../app/hooks";
import { push } from "../navigation/navigationSlice";

function Login(props: any) {
	const navigate = useNavigate();
	const store = useStore();
	const state: any = store.getState();
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginAttempted, setloginAttempted] = useState(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();

		const user = new User(email, password)
		const action = login(user);

		store
			.dispatch(action)
			.unwrap()
			.then(handleRedirect)
			.catch((error: any) => {
				handleBadLogin(error);
			});

		e.target.reset();

		if (props.className == "modal") {
			props.handleClose();
		}
	};

	function handleRedirect() {
		const currentState: any = store.getState();

		if (currentState.user.profile.token !== null && currentState.user.loginSuccess == true) { // Change eventually from toxen exists -> token is valid and isn't expired
			console.log("Login Success, redirected to Home");
			dispatch(push("/"));  
			navigate("/");
		}
	}

	function handleBadLogin(error: any) {
		setloginAttempted(true)

		if (error.response.status == 400) {
			console.log(error);
		}
	}

	return (
		<div id="login-div" className={styles.login}>			
				<Grid>
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<div className={styles.icon}>
							<SvgIcon component={LoginIcon} style={{ fontSize: 40 }} />
						</div>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>

						{state.user.loginSuccess === false && loginAttempted === true &&
							<Alert severity="error">
								{state.user.message}
							</Alert>
						}

						<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
                                className={styles.button}
							/>
                            <div className={styles.button}>
							<Button
								type="submit"								
								variant="contained"								
								id="login-button"                                
							>
								Sign In
							</Button></div>
							<Grid>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href="/register" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>

		</div>

	);
}

export default Login;