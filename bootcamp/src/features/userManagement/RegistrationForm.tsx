import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useStore } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import type {} from "redux-thunk/extend-redux";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Profile, User } from "../../models/UserProfileModel";
import { addUser, updateUser } from "../../data/UserApi";
import { RootState } from "../../app/store";
import { AsyncThunkAction } from "@reduxjs/toolkit";

function RegistrationForm(props: any) {
	const [success, setSuccess] = useState(false);	
	const store = useStore();

	const state: any = store.getState();
    const userState = useSelector((state: RootState) => state.user);
	const userProfile = userState.profile;

	const [name, setName] = useState<string>( userProfile?.name ?? "");	
	const [email, setEmail] = useState<string>(userProfile?.email ?? "");
	const [password, setPassword] = useState("");
	const [birthday, setBirthday] = useState<Dayjs | null>(
				dayjs(userProfile?.dateOfBirth)
	);	
	const profileSubmit = (e: any) => {
		e.preventDefault();
		var action; 
		if(userProfile )
		{
			console.log('profile exists')

			//create a copy of the state profile
			var user : User = {...userProfile};					
			// see what has changed from the user profile
			if( user.name !== name)
			{
				console.log('name changed')
				console.log('profile.name: ' + user.name)
				console.log('form Name: ' + name)
				user.name = name;
			}
			else if( user.email !== email)
			{
				console.log('email changed')
				console.log('profile.email: ' + user.email)
				console.log('form email: ' + email)
				user.email = email;
			}
			else if( ! dayjs(user.dateOfBirth).isSame(birthday) && birthday)
			{
				console.log('dateOfBirth changed')
				console.log('profile.dateOfBirth: ' + dayjs(user.dateOfBirth).toDate())
				console.log('form dateOfBirth: ' + birthday?.toDate())
				user.dateOfBirth = birthday?.toDate();
			}
			else{
				//no changes?
				console.log('no changes')
				return;
			}

			action = updateUser(user);
		}
		//no profile, new user
		else{

			console.log('new profile')
			const user = new User(email, password);
			if (birthday !== null && birthday !== undefined) {
				user.dateOfBirth = new Date(birthday.date());
			}
			user.name = name;
			console.log(user);
			action = addUser(user);
		}       

		store
			.dispatch(action)
			.unwrap()
			.then(profileComplete)
			.catch((error: any) => {
				console.log(error);
			});		
	};
	const profileComplete = () => {
		setSuccess(true);
	};
	const handleChange = (newValue: Dayjs | null) => {
		setBirthday(newValue);
	};

	return (
		<div className="registration-form" style={{ backgroundColor: "white" }}>
			<form onSubmit={profileSubmit}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Grid container direction="column" className="container">
						<Grid mt={2} item>
							<TextField
								name="Name"
								type="text"
								id="name"
								placeholder="FirstName LastName"
								defaultValue={userProfile?.name || ""}
								onChange={(e) => setName(e.target.value)}
							/></Grid>
						<Grid mt={2} item>								
							<TextField
								name="Email"
								type="text"
								id="email"
								placeholder="someone@example.com"
								defaultValue={userProfile?.email || ""}
								onChange={(e) => setEmail(e.target.value)}
							/></Grid>
							{!userProfile &&
							<Grid mt={2} item>							
								<TextField
								name="Password"
								type="text"
								id="password"
								placeholder="Strong Password"								
								onChange={(e) => setPassword(e.target.value)}
							/></Grid>
							}
							<Grid item mt={2}>	<DesktopDatePicker
								label="Date of Birth"
								inputFormat="MM/DD/YYYY"
								value={birthday}
								onChange={handleChange}								
								renderInput={(params: any) => <TextField {...params} />}
							/>
							{/* TODO: Put Code for Autocomplete Here */}
						</Grid>
						<Grid item mt={2}>	
						<Button variant="contained" type="submit">{props.buttonText || "Register User"}</Button></Grid>
					</Grid>
				</LocalizationProvider>
			</form>
			{	success && 
				<div className="registration-success">
					<h3>Profile Submitted to DB!</h3>					
				</div>  
			}
		</div>
		
	);
}

export default RegistrationForm;
