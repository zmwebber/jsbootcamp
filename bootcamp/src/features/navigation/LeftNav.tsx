import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import GradingIcon from '@mui/icons-material/Grading';
import { useNavigate } from "react-router-dom";
import {push} from "./navigationSlice";
import {logout} from '../userManagement/userSlice'
import { useStore } from 'react-redux';
import FormLabel from '@mui/material/FormLabel';
import MenuIcon from '@mui/icons-material/Menu';
import { increment } from '../counter/counterSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export function LeftNav() {
  const store = useStore();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  type Anchor = 'Menu';
  const [state, setState] = React.useState({
    Menu: false    
  });
  const toggleDrawer =
  (anchor: Anchor, open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleClick = (menuItem: string) => {
    console.log("menu item clicked: " + menuItem);    
    switch (menuItem) {
      case 'Home':
        console.log("Redirecting to: " + '/'); 
        dispatch(push("/"));   
        navigate("/")
        break;
      case 'Assignments':
        break;
      case 'Attendance':
        break;
      case 'Grades':
        break;
      case 'Settings':
        break;
      case 'Profile':
        break;
      case 'Login':
        console.log("Redirecting to: " + '/login'); 
        dispatch(push("/login"));   
        navigate("/login");
        break;
      case 'Logout':
        console.log("Logging Out: ");
        localStorage.removeItem('user');
        dispatch(logout());			
        console.log("Redirecting to: " + '/login'); 
        dispatch(push("/login"));   
        navigate("/login");
        break;
      case 'Register': 
        console.log("Redirecting to: " + '/register');
        dispatch(push("/register"));       
        navigate("/register")
        break;
      default:
        console.log('Register the new route: ' + menuItem);
  };
}
  
  const list = (anchor: Anchor) => (

    <Box
      sx={{ width: 280 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key='Home' disablePadding>
            <ListItemButton onClick={() => handleClick('Home')} >
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Assignments' disablePadding>
            <ListItemButton onClick={() => handleClick('Assignments')} >
              <ListItemIcon>
                <AssignmentIcon/>
              </ListItemIcon>
              <ListItemText primary='Assignments' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Attendance' disablePadding >
            <ListItemButton onClick={() => handleClick('Attendance')} >
              <ListItemIcon>
                <EventRepeatIcon/>
              </ListItemIcon>
              <ListItemText primary='Attendance' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Grades' disablePadding>
            <ListItemButton onClick={() => handleClick('Grades')} >
              <ListItemIcon>
                <GradingIcon/>
              </ListItemIcon>
              <ListItemText primary='Grades' />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key='Settings' disablePadding>
            <ListItemButton onClick={() => handleClick('Settings')} >
              <ListItemIcon>
              <SettingsIcon/>
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Profile' disablePadding>
            <ListItemButton onClick={() => handleClick('Profile')} >
              <ListItemIcon>
              <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Login' disablePadding>
            <ListItemButton onClick={() => handleClick('Login')} >
              <ListItemIcon>
              <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary='Login' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Logout' disablePadding>
            <ListItemButton onClick={() => handleClick('Logout')} >
              <ListItemIcon>
              <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Register' disablePadding>
            <ListItemButton onClick={() => handleClick('Register')} >
              <ListItemIcon>
              <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary='Register' />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
            {(['Menu'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <FormLabel>{anchor}</FormLabel> <br/>
              <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
              <Drawer
                anchor='left'
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
