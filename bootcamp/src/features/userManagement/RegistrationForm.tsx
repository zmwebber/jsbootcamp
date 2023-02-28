import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import { useStore } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import type {} from "redux-thunk/extend-redux";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { User } from "../../models/UserProfileModel";
import { addUser } from "../../data/UserApi";

function RegistrationForm(props: any) {
	const [success, setSuccess] = useState(false);	
	const store = useStore();
	const [name, setName] = useState("");	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [birthday, setBirthday] = React.useState<Dayjs | null>(
		dayjs("2014-08-18T21:11:54")
	);	
	const profileSubmit = (e: any) => {
		e.preventDefault();
        const user = new User(email, password);
		if (birthday !== null) {
			user.dateOfBirth = new Date(birthday.toString());
		}
		user.name = name;
		console.log(user);
		const action = addUser(user);

		store
			.dispatch(action)
			.unwrap()
			.then(profileComplete)
			.catch((error: any) => {
				console.log(error);
			});
		//e.target.reset();
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
								onChange={(e) => setName(e.target.value)}
							/></Grid>
						<Grid mt={2} item>								
							<TextField
								name="Email"
								type="text"
								id="email"
								placeholder="someone@example.com"
								onChange={(e) => setEmail(e.target.value)}
							/></Grid>
							<Grid mt={2} item>		
							<TextField
								name="Password"
								type="text"
								id="password"
								placeholder="Strong Password"
								onChange={(e) => setPassword(e.target.value)}
							/></Grid>
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
