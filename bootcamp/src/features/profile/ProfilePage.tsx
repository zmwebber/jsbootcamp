import * as React from 'react';
import Box from '@mui/material/Box';
import Item from '../shared/PaperWrapper'
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import { Button, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import RegistrationForm from '../userManagement/RegistrationForm';
import { useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { User } from '../../models/UserProfileModel';
import { RootState } from '../../app/store';
import dayjs, { Dayjs } from "dayjs";

export function ProfilePage() {
    const store = useStore();
    const state: any = store.getState();
    const userState = useSelector((state: RootState) => state.user);
	const userProfile = userState.profile;
    const [edit, setEdit] = useState(false);
    const handleOpen = () => {
        setEdit(true);
    };
    const handleClose = () => {
        setEdit(false);
    };
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12} id="profile-banner">
                        <Item>
                            <Grid xs={12} md={12} container>
                                <Grid xs={1} md={1}>
                                    <Avatar aria-label="avatar">
                                        { userProfile?.name[0] || "P"}
                                    </Avatar>
                                </Grid>
                                <Grid xs={2} md={2}><Typography>{ userProfile?.name || "First MI. Last"}</Typography></Grid>
                                <Grid xs={4} md={4}><Typography>Title/Role</Typography></Grid>
                            </Grid>
                            <Grid xs={12} md={12} ><Grid xs={2} md={2}><Typography> Links </Typography></Grid></Grid>
                        </Item>
                    </Grid>
                    <Grid xs={12} md={6} id="profile-info">
                        {!edit &&
                            <Item>
                                <Typography variant='h5'>Profile Info</Typography>
                                <Button variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>
                                    Edit
                                </Button>
                                <Grid container>
                                    <Grid xs={4} md={4}><Typography>Full Name:</Typography></Grid>
                                    <Grid xs={8} md={8}><Typography>{ userProfile?.name || "First MI. Last"}</Typography></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid xs={4} md={4}><Typography>Email:</Typography></Grid>
                                    <Grid xs={8} md={8}><Typography>{ userProfile?.email || "Example@email.com"}</Typography></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid xs={4} md={4}><Typography>Date of Birth:</Typography></Grid>
                                    <Grid xs={8} md={8}><Typography>{ dayjs(userProfile?.dateOfBirth).toDate().toDateString() || "MM/DD/YYYY"}</Typography></Grid>
                                </Grid>
                                <Grid container>
                                    <Grid xs={4} md={4}><Typography>Address:</Typography></Grid>
                                    <Grid xs={8} md={8}><Typography>{ userProfile?.address1 || "123 Something Street City, State 12345"}</Typography></Grid>
                                </Grid>
                            </Item>
                        }
                        {edit &&
                            <Item>
                                <Typography variant='h5'>Profile Form</Typography>
                                <Button variant="outlined" startIcon={<EditOffIcon />} onClick={handleClose}>
                                    Cancel
                                </Button>
                                <RegistrationForm buttonText="Update User"/>                               
                            </Item>}
                    </Grid>
                    <Grid xs={12} md={6} id="profile-settings">
                        <Item>
                            <Typography variant='h5'>Profile Page Notification and Settings</Typography></Item>
                    </Grid>
                </Grid>
            </Box></>
    );
}
