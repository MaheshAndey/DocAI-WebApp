import Button from 'react-bootstrap/Button';
import msg_icon from '../icons8-mail-24.png';

import logo from '../undraw_secure_login_pdn4.svg';

import google_logo from "../icons8-google.svg";
import './login.css';
import {Link} from 'react-router-dom';

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa'
import { login, reset } from '../redux/auth-redux';
import Spinner from './loading';

import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import applogo from '../tiktok-app.svg';
import { SignInWithGoogle } from '../firebase/utils';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';



const user1=JSON.parse(localStorage.getItem('user'));

const Login = (props) => {
    const [values, setValues] = useState({
    password: '',
    email: '',
    showPassword: false,
  });

  const [loginn, isLogin] = useState(false)

    // useEffect(() => {
    //   localStorage.setItem('googleauth', JSON.stringify(loginn));
    // }, [isLogin]);

console.log("Islogin : ", JSON.parse(localStorage.getItem('googleauth')))


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    // setlogindata((prevState) => ({
    //   ...prevState,
    //   [event.target.id]: event.target.value,
    // }))
    setlogindata({...values, [prop]: event.target.value})
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const [logindata,setlogindata]=useState({
    email:"",
    password:""}
  )

const{email,password}=logindata
const navigate=useNavigate();
const dispatch=useDispatch();
const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
useEffect(()=>{
    if(isError){
        toast.error(message);
    }
    if (isLoading) {
        <Spinner />
      }
    if(user1 || props.currentGuser){
        navigate('/');
    }
    else{
        <Spinner />
    }
    dispatch(reset())

},[user1, isLoading, isError, isSuccess, message, props.currentGuser ]);

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }


    return (
        <div className="Login">


        <div className='container log'>
        <div className="row" >
            <div className="col-sm" >
                <div className="container login-cont" >
                    <div className="col">
                        <h1 className='wel'>
                            Welcome to Subset
                        </h1>
                        <div className="row">
                          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '100%' }}>
                              <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                              <Input
                                id="standard-adornment-weight"
                                value={values.email}
                                onChange={handleChange('email')}
                                // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                  'aria-label': 'weight',
                                }}
                              />

                            </FormControl>

                        </div>
              <br></br>
                        <div className="row">

                          <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                              id="standard-adornment-password"
                              type={values.showPassword ? 'text' : 'password'}
                              value={values.password}
                              onChange={handleChange('password')}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                            
                        </div>
              <br></br>
                        

                            <div className='row'>
                                <Button variant="light" className="google-but" placeholder=' Login' style={{color:"white", backgroundColor:"#5d3fd3"}} onClick={onSubmit}>
                                    Login
                                </Button>
                                </div>
                        
              <br></br>
              <h4 style={{ textAlign:"center" }}>or</h4>
              <br></br>
                        <div className="row" >


                            <Button onClick={SignInWithGoogle}  variant="light" className="google-but" style={{ color:"white",  backgroundColor:"#5d3fd3"}} >
                                <img width="23px"  src={google_logo} style={{ marginRight: "8px" }} ></img>
                                Continue with Google
                            </Button>
                            
                          
                        </div>
                
                </div>
                    
            </div>  
                
            </div>

            <div className="col-sm im">
                <img width="100%" src={logo} ></img>
            </div>

        </div>

        </div>
        </div>
        
    )
};


export default Login;

