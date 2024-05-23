import {React ,useState} from 'react';
import './Intro.css'
import Button from 'react-bootstrap/Button';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../tiktok-app.svg';
import login_icon from '../login-circle-svgrepo-com.svg';
import msg_icon from '../icons8-mail-24.png';
import sign_in from '../user-application-identity-authentication-login-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import {auth} from '../firebase/utils'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';



const NavBar = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  

  const logoutt = () =>{
    
    if(props.currentGuser){
      auth.signOut();
      localStorage.setItem('googleauth', JSON.stringify(false));
    }
    else{
      localStorage.removeItem('user');
    }

  }



    return (
            
        <Navbar  bg="none" expand="lg">
        <Container>
            <Nav>
                <Nav.Item className="edge-de">
                    <div className="edge-design">
            </div>
            <div className="edge-des"></div>
                </Nav.Item>
            </Nav>

            <Navbar.Brand href="/" className="app-name" style={{margin:"10px"}}>
            <img width="50vw"
                    className="img-fluid align-top d-inline-block tiktok"
                    height="50vh" src={logo}  alt="logo"></img>
            Subset
            </Navbar.Brand>




    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" >




            {(props.currentUser || props.currentGuser) 
            ?
            <Nav className="me-auto justify-content-end flex-grow-1 pe-3 nav-comp">
                            <Nav.Link href="#" className='butt'>
            <Button variant="light" className="contact-but" style={{ color:"white", backgroundColor:"#5d3fd3", borderRadius:"15px", }}>
                <img width="27"
                className="align-top d-inline-block nav-comp"
                height="22" src={msg_icon}  alt="logo" ></img>
            Contact Us</Button>
            </Nav.Link>
                <Nav.Link href="#"  >

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 4 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* props.currentGuser.photoURL ?  */}
            <Avatar sx={{ width: 35, height: 35 , backgroundColor: "none"}}> <img width={35} height={35} src={props.currentGuser?props.currentGuser.photoURL:null}></img></Avatar>
          </IconButton>
        </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <MenuItem>
          <Avatar /> My Uploads
        </MenuItem>
        <Divider /> */}
        {/* <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        {/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <Link to ="/">
                    <MenuItem onClick={logoutt} >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        </Link>
      </Menu>
            </Nav.Link>
        </Nav>
                : 
                <Nav className="me-auto justify-content-end flex-grow-1 pe-3 nav-comp">
            <Nav.Link href="#" >
                <Link to ="/login">
                    <Button variant="light" style={{ backgroundColor:"#ccccff", borderRadius:"15px"}}><img width="24"
                    className="align-top d-inline-block nav-comp"
                    height="24" src={login_icon}  alt="logo"></img>
                Login</Button>
                </Link>
            </Nav.Link>

            <Nav.Link href="#">
                <Link to ="/signup">
                <Button variant="light" style={{ backgroundColor:"#ccccff",  borderRadius:"15px"}}><img width="24"
                    className="align-top d-inline-block nav-comp"
                    height="24" src={sign_in}  alt="logo"></img>
                Sign Up</Button>
                </Link>
            </Nav.Link>

            <Nav.Link href="#" className='butt'>
            <Button variant="light" className="contact-but" style={{ color:"white", backgroundColor:"#5d3fd3", borderRadius:"15px", }}>
                <img width="27"
                className="align-top d-inline-block nav-comp"
                height="22" src={msg_icon}  alt="logo" ></img>
            Contact Us</Button>
            </Nav.Link>
            </Nav>
        }

    </Navbar.Collapse>
</Container>
</Navbar>

    )
} 


export default NavBar;


