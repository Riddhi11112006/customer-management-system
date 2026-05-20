import * as React from 'react';
import './drawer.css';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SelectActionCard from '../card/card';
import AddUser from '../../pages/AddUser/addUser';
import Addlottery from '../../pages/AddLottery/addLottery';
import Dialog from '@mui/material/Dialog';
import Allcust from '../../pages/AllCust/allcust';
import Lottery from '../../pages/Lottery/lottery';
import Pending from '../../pages/Pending/pending';
import Completed from '../../pages/Completed/completed';
import Underprocess from '../../pages/Underprocess/underprocess';
import Websites from '../../components/Websites/websites';
import AadharCard from '../../pages/AadharCard/aadharcard';
import PanCard from '../../pages/PanCard/pancard';
import EDistrict from '../../pages/EDistrict/edistrict';
import Education from '../../pages/Education/education';
import Mcd from '../../pages/Mcd/mcd';
import ShopWork from '../../pages/ShopWork/shopwork';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("Home");
const [showAddUser, setShowAddUser] = React.useState(false);
const [showAddLottery, setShowAddLottery] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Riddhi Online Work Zone
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <Typography variant="h6" noWrap component="div">    
                Welcome, Abhijeet!
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: 'auto' }}>
              Menu
            </div>
          <IconButton onClick={handleDrawerClose}>
            
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Rejected Work', 'Completed Work','Underprocess Work', 'All Customers','Lottery'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setCurrentPage(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Aadhar Card', 'PAN Card', 'E-district', 'MCD', 'Education', 'Shop Work'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setCurrentPage(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
  <DrawerHeader />

  {currentPage === "Home" && (
  <>
    <SelectActionCard
      onActionClick={(type) => {
       if (type === "addUser") {
      setShowAddUser(true);}
      if (type === "addLottery") {setShowAddLottery(true);}
        }
      }
    />
    <Websites />
  </>
)}


  {currentPage === "All Customers" && (
    <Allcust />
  )}
{currentPage === "Lottery" &&(
<Lottery />
)
}
  {currentPage === "Pending Work" && (
    <Pending />
  )}

  {currentPage === "Completed Work" && (
    <Completed />
  )}

  {currentPage === "Underprocess Work" && (
    <Underprocess />
  )}
  {currentPage === "Aadhar Card" && (
    <AadharCard />
  )}
  {currentPage === "PAN Card" && (
    <PanCard />
  )}
  {currentPage === "E-district" && (
    <EDistrict />
  )}
  {currentPage === "Education" && (
    <Education />
  )}
  {currentPage === "MCD" && (
    <Mcd />
  )}
  {currentPage === "Shop Work" && (
    <ShopWork />
  )}
  {showAddUser && (
    <Dialog
      open={showAddUser}
      onClose={() => setShowAddUser(false)}
    >
      <AddUser
        onSubmit={() => {}}
        onClose={() => setShowAddUser(false)}
      />
    </Dialog>
  )}
  {showAddLottery && (
  <Dialog
    open={showAddLottery}
    onClose={() => setShowAddLottery(false)}
  >
    <Addlottery
      onSubmit={() => {}}
      onClose={() => setShowAddLottery(false)}
    />
  </Dialog>
)}

</Main>
    </Box>
  );
}
