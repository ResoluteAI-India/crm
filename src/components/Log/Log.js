import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import logo from "../../images/resolutelogo.png"
import Accountbutton from '../MiniComponents/Accountbutton';
// import Breadcrumbs from '../MiniComponents/Breadcrumbs';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import Logtable from './Logtable';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const handleColor = () =>{
  let btn = document.getElementById("clickedbtn")
  btn.style.backgroundColor="#F2F2F2"
}

export default function Log() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex'}} >
      <CssBaseline />
      <AppBar position="fixed" open={open}  style={{backgroundColor:"#EEEEEE",height:"50px"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon style={{color:"#987D9A",backgroundColor:"#F2F2F2"}} />
          </IconButton>
          <Accountbutton />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}  PaperProps={{
    sx: {
      backgroundColor: "#EEEEEE"
    }
  }} >
        <DrawerHeader style={{backgroundColor:"#EEEEEE"}} >
        <img src={logo} alt=""  className='mylogo' style={{height:"50px",width:"180px"}}/>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon  />}
          </IconButton>
        </DrawerHeader>
        <List style={{color:"#987D9A"}} >
          {['Dashboard', 'Log'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block'}} >
              <ListItemButton href={`/${text.toLowerCase()}`} 
              id='clickedbtn'
              onClick={handleColor}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon style={{color:"#987D9A"}}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <DashboardIcon /> : <ArticleIcon />  }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List style={{color:"#987D9A",marginTop:"-20px"}} >
          {['Clients', 'Projects'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} >
              <ListItemButton href={`/${text.toLowerCase()}`} 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon style={{color:"#987D9A"}}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <PersonIcon /> : <ListAltIcon />  }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{backgroundColor:"#f2f2f2",height:"100vh",width:"100vw"}}>
        {/* <Breadcrumbs/> */}
        <Logtable/>
      </Box>
    </Box>
    
  );
}
