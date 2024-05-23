
import {React, useEffect, useState} from 'react'
import { Container,Navbar,Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import google_logo from "../google-brands.svg";
import 'bootstrap/dist/css/bootstrap.css';
import './form.css';
import heading from "../heading_img.png";
import formsimg from "../form_js.svg";
import logo from '../tiktok-app.svg';
import msg_icon from '../icons8-mail-24.png';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import { toast } from 'react-toastify';
import { useFormik } from 'formik'


//sending data to the api;
const url="http://backend.docscanner.teambros.co.in/api/v1/forms";



const initialValues =  {
      publisherName: '',
      email : '',
      templateName: '',
      templateType: ''
    }



function Form(props) {
  // useEffect(()=>{

  //   if(state==null){
  //     console.log('success')
  //   }
  //   else{
  //     toast.error("Please provide a template name")
  //   }
  // }, [])




  const validate = (values) => {
    const errors = {}

    if(!values.publisherName){
      errors.publisherName = 'required'
    }

    if (!values.email) {
      errors.email = 'required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    if(!values.templateName){
      errors.templateName = "required"
    }
    else if(values.templateName.length<3){
      errors.templateName = "minimum 3 characters"
    }

    if(!values.templateType){
      errors.templateType = "required"
    }
    else if(values.templateType.length<3){
      errors.templateType = "minimum 3 characters"
    }
    return errors
  }

  const formik = useFormik({
    initialValues,
    validate,
  })





  const {state} = useLocation();

  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [formDetails, setFormDetails] = useState([])



  useEffect( ()=>{
        axios.get("http://backend.docscanner.teambros.co.in/api/v1/forms/").then((res)=> setFormDetails(res.data.detail.map((i)=>i.NameofTemplate))).catch((res)=>console.log(res))
  }, [])

  // useEffect(()=>{
  //   try{
  //   if(state.isSubmit===true){
  //     toast.success("Submitted successfully");
  //   }}catch{console.log("error")}
  // }, [state.isSubmit])

const handlesubmit=async (e)=>{
      if(formDetails.includes(formik.values.templateName)) {
        alert(`${formik.values.templateName} is already taken, Please select any other name.`)
        return
    }

    

    else{
      setLoad(true);
      try {
      const res= await axios.post(url,{ NameofPublisher:formik.values.publisherName, PublisherEmail:formik.values.email, NameofTemplate:formik.values.templateName,TypeofTemplate:formik.values.templateType}).then((res)=>{setLoad(false);
        navigate('/cropper',
    {
        state: {
            tempname: formik.values.templateName,
            isEmpty:true
        }
    });
  }
    )
    } catch (error) {
      setLoad(false);
      toast.error("Error")
      // console.log(error.response);
      console.log("form not sent")
    }

    }
}

console.log("form errors : ", formik.errors)

  return (

      <LoadingScreen
          loading={load}
          bgColor='rgba(100, 100, 100, 0.9)'
          spinnerColor='#9ee5f8'
          textColor='#676767'
          text='Loading'
        > 

<div>
      
        <div class="Login">
            <div className='container log'>
        <div className="row" >
        <div className="col-sm">

          <Container>
              <p style={{ fontWeight:"bold", fontSize:"40px" ,marginBottom: "0px" }}>
              Let The Process Start By Creating Template..
            <img width="40px"  src={heading} style={{ marginRight: "8px" }} ></img></p>   

            <div className="container login-cont" >
                
                    <div className="col">
                    <p style={{ fontWeight:"bold", fontSize:"20px" ,color:"black"}} >
                    Please Fill The following Details:
                </p>
                
                
                <div className="row">
                    <TextField
                      name="publisherName"
                      //variant="outlined"
                      required
                      fullWidth
                      id="Publisher"
                      label="Enter Name of the Publisher"
                      onChange={formik.handleChange}
                      onBlur = {formik.handleBlur}
                      value={formik.values.publisherName}
                      error={formik.touched.publisherName && formik.errors.publisherName}
                      helperText = {(formik.touched.publisherName && formik.errors.publisherName)?formik.errors.publisherName:""}
                    />
                </div>

              <br></br>
                <div className="row">
                  <TextField
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="EnterpublisherEmailAddress"
                    onChange={formik.handleChange}
                    onBlur = {formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                    helperText = {(formik.touched.email && formik.errors.email)?formik.errors.email:""}
                  />
                </div>

                <br></br>

                <div className="row">
                    <TextField
                      name="templateName"
                      required
                      fullWidth
                      id="firstName"
                      label="Enter Name of the Template"
                      onChange={formik.handleChange}
                      onBlur = {formik.handleBlur}
                      value={formik.values.templateName}
                      error={formik.touched.templateName && formik.errors.templateName}
                      helperText = {(formik.touched.templateName && formik.errors.templateName)?formik.errors.templateName:""}
                    />
                        </div>
              <br></br>

              <div className="row">
                  <TextField 
                    margin="normal"
                    name="templateType"
                    required
                    fullWidth
                    id="firstName"
                    label="Type of the Template"
                    onChange={formik.handleChange}
                    onBlur = {formik.handleBlur}
                    value={formik.values.templateType}
                    error={formik.touched.templateType && formik.errors.templateType}
                    helperText = {(formik.touched.templateType && formik.errors.templateType)?formik.errors.templateType:""}
                    
                  />
              </div>
              
              <br></br>

                <div className='row'>
                      <Button disabled={!(Object.keys(formik.errors).length===0)} onClick={(e) => { handlesubmit() }} variant="light" className="google-but"  style={{color:"white", backgroundColor:"#5d3fd3"}}>
                          Submit
                      </Button>
                </div>


                </div>
                    
            </div>  
            
            </Container>
            </div>

            <div class="col-sm im">
                <img width="100%" src={formsimg} ></img>
            </div>

        </div>

        </div>
        </div>
        </div>
        
  
    
      </LoadingScreen>
        
    

  );

}





export default Form;

