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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { FormLabel } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import GradingIcon from '@mui/icons-material/Grading';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

 


export function LeftNav() {
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
  
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 280 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key='Home' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Assignments' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon/>
              </ListItemIcon>
              <ListItemText primary='Assignments' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Attendance' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EventRepeatIcon/>
              </ListItemIcon>
              <ListItemText primary='Attendance' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Grades' disablePadding>
            <ListItemButton>
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
            <ListItemButton>
              <ListItemIcon>
              <SettingsIcon/>
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Profile' disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary='Profile' />
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
      </Grid></Grid>
    </Box>
  );
}
